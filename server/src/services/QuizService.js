const QuizModel = require("../models/QuizModel");
const QuizSessionModel = require("../models/QuizSessionModel");
const RecordsModel = require("../models/RecordsModel");
const dateFormatter = require("../utils/dateFormatter");

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

const getSubjects = async (userId) => {
    const subjects = await QuizModel.find({
        userId: userId
    }).distinct("subject");//
    return subjects;
}

const getQuizzes = async (userId, subject) => {
    const quiz = await QuizModel.find({
        userId: userId,
        subject: subject
    }).select("subject quizName numberOfItems");//select only subject and quizName
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
    while (pushCount < 3) {
        // push the correct answer base on the random index(correctAnsIndex)
        if (pushCount === correctAnsIndex) {
            choices.push(correctAnswer);
            pushCount++;
        }
        const randomIndexOfAllItems = Math.floor(Math.random() * allItems.length);
        const incorrectAnsToAdd = allItems[randomIndexOfAllItems].answer;
        // push incorrect answers and prevent duplicate
        if (incorrectAnsToAdd !== correctAnswer && !choices.includes(incorrectAnsToAdd)) {
            choices.push(allItems[randomIndexOfAllItems].answer);
            pushCount++;
        }
    }
    return choices;
}

const submitAnswer = async (questionId, answer) => {
    let isCorrect;
    const itemSession = await QuizSessionModel.findById(questionId);
    // check if the answer matches in the database QuizSessionModel
    if (itemSession.answer !== answer) {
        isCorrect = false;
    } else {
        isCorrect = true;
    }
    const update = await QuizSessionModel.findByIdAndUpdate(questionId, {
        answered: true,
        correct: isCorrect
    });
    console.log(update);
    return {
        correct: isCorrect
    }
}

const saveRecordQuizResult = async (userId, subject, quizName, score, numberOfItems) => {
    const newRecord = new RecordsModel({
        userId: userId,
        subject: subject,
        quizName: quizName,
        score: score,
        numberOfItems: numberOfItems
    });
    await newRecord.save();
    return newRecord;
}

// get all the records of the user
const getRecords = async (userId) => {
    const records = [];
    const response = await RecordsModel.find({
        userId: userId
    });

    response.forEach(record => {
        records.push({
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
    const record = await RecordsModel.findById(recordId);
    return record;
}

module.exports = {
    createQuiz,
    getSubjects,
    getQuizzes,
    startQuiz,
    submitAnswer,
    getScore,
    saveRecordQuizResult,
    getRecords,
    getRecord
}