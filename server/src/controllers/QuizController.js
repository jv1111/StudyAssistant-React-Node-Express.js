const service = require("../services/QuizService.js");

const createQuiz = async (req, res) => {
    try {
        console.log(req.session.passport.user);
        const userId = req.session.passport.user;
        const { subject, quizName, items } = req.body;
        const quiz = await service.createQuiz(userId, subject, quizName, items);
        res.status(201).json(quiz);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getSubjects = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const subjects = await service.getSubjects(userId);
        res.status(200).json(subjects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getQuizzes = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const subject = req.query.subject;
        const quizzes = await service.getQuizzes(userId, subject);
        res.status(200).json(quizzes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const startQuiz = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const quizId = req.query.quizId;
        const quizItem = await service.startQuiz(userId, quizId);
        res.status(200).json(quizItem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const submitAnswer = async (req, res) => {
    try {
        const { questionId, answer } = req.body;
        const response = await service.submitAnswer(questionId, answer);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const saveQuizRecord = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const { subject, quizName, score, numberOfItems } = req.body;
        const record = await service.saveRecordQuizResult(userId, subject, quizName, score, numberOfItems);
        res.status(201).json(record);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getQuizRecords = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const records = await service.getRecords(userId);
        res.status(200).json(records);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createQuiz,
    getSubjects,
    getQuizzes,
    startQuiz,
    submitAnswer,
    saveQuizRecord,
    getQuizRecords
}