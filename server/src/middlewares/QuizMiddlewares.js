const QuizSessionModel = require("../models/QuizSessionModel");
const { saveRecordQuizResult, getScore } = require("../services/QuizService");

const finishedQuizChecker = async (req, res, next) => {
    const userId = req.session.passport.user;
    const quizId = req.query.quizId;
    try {
        const quizSession = await QuizSessionModel.find({
            userId: userId,
            quizId: quizId
        });
        const unansweredItem = quizSession.filter(item => {
            return item.answered === false;
        });
        if (quizSession.length !== 0 && unansweredItem.length === 0) {
            const score = getScore(quizSession);
            return res.status(200).json({
                subject: quizSession[0].subject,
                quizName: quizSession[0].quizName,
                score: score,
                numberOfItems: quizSession.length,
                quizEnded: true
            });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = {
    finishedQuizChecker
}