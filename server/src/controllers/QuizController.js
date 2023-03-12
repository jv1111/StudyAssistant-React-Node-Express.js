const service = require("../services/QuizService.js");

const createQuiz = async (req, res) => {
    try {
        console.log(req.session.passport.user);
        const userId = req.session.passport.user;
        const { subject, quizName, items } = req.body;
        const quiz = await service.createQuiz(userId, subject, quizName, items);//todo create the service function
        res.status(201).json(quiz);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createQuiz
}