const QuizSessionModel = require("../models/QuizSessionModel");

const finishedQuizChecker = async (req, res, next) => {
    const userId = req.session.passport.user;
    const quizId = req.query.quizId;

    const quizSession = await QuizSessionModel.find({
        userId: userId,
        quizId: quizId
    });
    const unansweredItem = quizSession.filter(item => {
        return item.answered === false;
    });
    if (quizSession.length !== 0 && unansweredItem.length === 0) return res.status(200).json({ quizEnded: true });

    next();
}

module.exports = {
    finishedQuizChecker
}