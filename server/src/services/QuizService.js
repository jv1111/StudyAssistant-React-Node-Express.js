const QuizModel = require("../models/QuizModel");

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

module.exports = {
    createQuiz,
    getSubjects,
    getQuizzes
}