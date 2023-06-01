const mongoose = require("mongoose");
const QuizModel = require("../models/QuizModel");
const QuizSessionModel = require("../models/QuizSessionModel");
const RecordsModel = require("../models/RecordsModel");
const AutoSaveModel = require("../models/AutoSaveModel");
const dateFormatter = require("../utils/dateFormatter");
const { savePDF } = require("../utils/pdfHandler");

const createQuiz = async (userId, subject, quizName, items) => {
    const Quiz = new QuizModel({
        userId: userId,
        subject: subject,
        quizName: quizName,
        items: items,
        numberOfItems: items.length
    });
    await Quiz.save();
    return Quiz;
}

const getSubjects = async (userId, searchQuery, skipCount) => {
    let filter = { userId: new mongoose.Types.ObjectId(userId) }//return all subjects with userId:userId

    // generate new filter if there is a search query
    if (searchQuery) filter.subject = { $regex: new RegExp(searchQuery, "i") }

    if (!skipCount) skipCount = 0;

    const subjects = await QuizModel.aggregate()
        .match(filter)
        .group({ _id: "$subject" })
        .sort({ _id: 1 })//sort accending
        .skip(parseInt(skipCount))// number of items to skip starting from index 0
        .limit(10)//number of data to get
    // todo add scroll
    return subjects;
}

const getQuizzes = async (userId, subject, searchQuery, skipCount) => {
    let filter = {
        userId: new mongoose.Types.ObjectId(userId),
        subject: subject
    }

    if (!skipCount) skipCount = 0;

    if (searchQuery) filter.quizName = { $regex: new RegExp(searchQuery, "i") }

    // const quiz = await QuizModel.find(filter).select("subject quizName numberOfItems");//select only subject and quizName
    const quiz = await QuizModel.aggregate()
        .match(filter)
        .project({ subject: 1, quizName: 1, numberOfItems: 1 })//get only specific field
        .sort({ _id: 1 })//sort accending
        .skip(parseInt(skipCount))// number of items to skip starting from index 0
        .limit(10)//number of data to get

    //todo create a test for quizzes then proceed

    return quiz;
}

const startQuiz = async (userId, quizId) => {
    // get quizSession
    let session = await QuizSessionModel.find({
        userId: userId,
        quizId: quizId
    });
    if (session.length === 0) session = await createQuizSession(userId, quizId);

    // get all unanswered items
    const unansweredItems = session.filter((item) => {
        return item.answered === false;
    });

    const randomItem = getRandomItem(unansweredItems);// get random items from anunswered items
    const score = getScore(session);// count the score from the session
    const choices = generateRandomChoices(randomItem.answer, session);// return an array that has 3 random choices 1 of it is the correct answer from the randomItem
    const questionNumber = (session.length - unansweredItems.length) + 1;

    return {
        _id: randomItem._id,
        subject: randomItem.subject,
        quizName: randomItem.quizName,
        question: randomItem.question,
        score: score,
        choices: choices,
        questionNumber: questionNumber,
        numberOfItems: session.length
    }
}

const createQuizSession = async (userId, quizId) => {
    const quiz = await QuizModel.findById(quizId);
    const quizItems = quiz.items;
    // push all data into array
    const sessionData = []
    quizItems.forEach((quizItem) => {
        sessionData.push({
            userId: userId,
            quizId: quizId,
            subject: quiz.subject,
            quizName: quiz.quizName,
            question: quizItem.question,
            answer: quizItem.answer,
        });
    });
    const newQuizSession = await QuizSessionModel.insertMany(sessionData);
    return newQuizSession;
}

const getRandomItem = (unansweredItems) => {
    const randomIndex = Math.floor(Math.random() * unansweredItems.length);
    const randomItem = unansweredItems[randomIndex];
    return randomItem;
}

const getScore = (session) => {
    let score = 0;
    session.forEach(item => {
        if (item.correct) {
            score++;
        }
    });
    return score;
}

const generateRandomChoices = (correctAnswer, allItems) => {
    let choices = [];
    let correctAnsIndex = Math.floor(Math.random() * 3);
    let pushCount = 0;
    // todo - generate a max loop handler
    const maxLoopPerChoice = 500;
    let loopCountPerChoice = 0;//loop count per choice
    while (pushCount < 3) {
        // push the correct answer base on the random index(correctAnsIndex)
        if (pushCount === correctAnsIndex) {
            choices.push(correctAnswer);
            pushCount++;
            continue;
        }
        const randomIndexOfAllItems = Math.floor(Math.random() * allItems.length);
        const incorrectAnsToAdd = allItems[randomIndexOfAllItems].answer;
        // push incorrect answers and prevent duplicate
        if (incorrectAnsToAdd !== correctAnswer && !choices.includes(incorrectAnsToAdd)) {
            choices.push(incorrectAnsToAdd);
            pushCount++;
        } else if (maxLoopPerChoice === loopCountPerChoice) {
            choices.push(null);
            pushCount++;
            loopCountPerChoice = 0;
        }
        loopCountPerChoice++;
    }
    return choices;
}

const submitAnswer = async (questionId, answer) => {
    let isCorrect;
    const itemSession = await QuizSessionModel.findById(questionId);

    // convert both strings to lowercase before comparison
    const correctAns = itemSession.answer.toLowerCase();
    const userAns = answer.toLowerCase();

    // check the answer
    if (correctAns !== userAns) {
        isCorrect = false;
    } else {
        isCorrect = true;
    }

    // update the QuizSessionModel item
    await QuizSessionModel.findByIdAndUpdate(questionId, {
        userAnswer: answer,
        answered: true,
        correct: isCorrect
    });

    return {
        correctAns: itemSession.answer,
        correct: isCorrect
    }
}

const saveRecordQuizResult = async (quizId, userId) => {

    const quizSession = await QuizSessionModel.find({
        quizId,
        userId
    });

    const score = getScore(quizSession);

    const newRecord = new RecordsModel({
        userId: userId,
        subject: quizSession[0].subject,
        quizName: quizSession[0].quizName,
        score: score,
        numberOfItems: quizSession.length,
        items: quizSession
    });
    await newRecord.save();
    await QuizSessionModel.deleteMany({
        quizId: quizId
    });
    return newRecord;
}

// get all the records of the user
const getRecords = async (userId, searchQuery) => {
    const records = [];
    const filter = { userId: userId }
    if (searchQuery) filter.quizName = { $regex: new RegExp(searchQuery, "i") };
    const response = await RecordsModel.find(filter);

    response.forEach(record => {
        records.push({
            _id: record._id,
            subject: record.subject,
            quizName: record.quizName,
            score: record.score,
            numberOfItems: record.numberOfItems,
            date: dateFormatter(record.createdAt)
        });
    });

    return records;
}

const getRecord = async (recordId) => {
    const response = await RecordsModel.findById(recordId);
    const {
        items,
        numberOfItems,
        quizName,
        score,
        subject,
        createdAt,
    } = response;

    const record = {
        items: items,
        numberOfItems: numberOfItems,
        quizName: quizName,
        score: score,
        subject: subject,
        date: dateFormatter(createdAt)
    }

    return record;
}

const saveData = async (userId, key, data, quizId) => {
    const savedData = await getSavedData(userId, key, quizId);

    if (savedData) {
        // update the data if there is an existing data
        await AutoSaveModel.findOneAndUpdate({ userId: userId, key: key, quizId: quizId }, { data: data });
    } else {
        // create new data
        const saveData = new AutoSaveModel({
            userId: userId,
            key: key,
            data: data,
            quizId: quizId
        });

        await saveData.save();
    }

    return {
        success: true,
        message: "data saved"
    }
}

const getSavedData = async (userId, key, quizId) => {
    const savedData = await AutoSaveModel.findOne({
        userId, userId,
        key: key,
        quizId: quizId,
    });
    return savedData;
}

const deleteSavedData = async (userId, key, quizId) => {

    await AutoSaveModel.findOneAndDelete({
        userId, userId,
        key: key,
        quizId: quizId
    });

    return {
        success: true,
        message: "Saved data is successfully deleted"
    };
}

const getItems = async (quizId) => {
    const quizItems = await QuizModel.findById(quizId);
    if (!quizItems) return null;
    return quizItems;
}

const updateQuiz = async (quizId, subject, quizName, items) => {
    const updatedQuiz = await QuizModel.findByIdAndUpdate(quizId, {
        subject: subject,
        quizName: quizName,
        items: items
    });
    return updatedQuiz;
}

const createPdf = async (quizId, subject, quizName, items) => {
    const quiz = await QuizModel.findById(quizId);
    const quizItems = quiz.items;
    let questions = [];
    let data = {
        _id: quizId,
        subject: quiz.subject,
        quizName: quiz.quizName,
    };
    for (let i = 0; i < quizItems.length; i++) {
        const correctAns = quizItems[i].answer;
        const question = quizItems[i].question;
        const choices = generateRandomChoices(correctAns, quizItems);
        const item = { question: question, choices: choices, correctAns: correctAns }
        questions.push(item);
    }
    data.questions = questions;
    const pdf = savePDF(data);
    return pdf;
}

module.exports = {
    createPdf,
    createQuiz,
    getSubjects,
    getQuizzes,
    startQuiz,
    submitAnswer,
    getScore,
    saveRecordQuizResult,
    getRecords,
    getRecord,
    saveData,
    getSavedData,
    deleteSavedData,
    getItems,
    updateQuiz
}