const QuizModel = require("../models/QuizModel");

const createQuiz = async (userId, subject, quizName, items) => {
    const Quiz = new QuizModel({
        userId: userId,
        subject: subject,
        quizName: quizName,
        items: items
    });
    await Quiz.save();
    return Quiz;
}

module.exports = {
    createQuiz
}