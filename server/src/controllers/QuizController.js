const service = require("../services/QuizService.js");
const path = require("path");
const { fileDelete } = require("../utils/pdfHandler.js");

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
        const searchQuery = req.query.searchQuery;
        const skipCount = req.query.skipCount;
        const subjects = await service.getSubjects(userId, searchQuery, skipCount);
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
        const searchQuery = req.query.searchQuery;
        const skipCount = req.query.skipCount;
        const quizzes = await service.getQuizzes(userId, subject, searchQuery, skipCount);
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
        const quizId = req.body.quizId;
        const record = await service.saveRecordQuizResult(quizId, userId);
        res.status(201).json(record);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getQuizRecords = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const searchQuery = req.query.searchQuery;
        const records = await service.getRecords(userId, searchQuery);
        res.status(200).json(records);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getQuizRecord = async (req, res) => {
    try {
        const recordId = req.query.recordId;
        const record = await service.getRecord(recordId);
        res.status(200).json(record);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const saveData = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const { key, data, quizId } = req.body;
        const response = await service.saveData(userId, key, data, quizId);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const getSavedData = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const { key, quizId } = req.query;
        const savedData = await service.getSavedData(userId, key, quizId);
        res.status(200).json(savedData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const deleteSavedData = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const { key, quizId } = req.query;
        const response = await service.deleteSavedData(userId, key);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const getItems = async (req, res) => {
    try {
        const quizId = req.query.quizId;
        console.log(req.query);
        console.log(quizId);
        const response = await service.getItems(quizId);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const updateQuiz = async (req, res) => {
    try {
        const { quizId, subject, quizName, items } = req.body;
        console.log(req.body);
        const response = await service.updateQuiz(quizId, subject, quizName, items);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const createPdf = async (req, res) => {
    try {
        const quizId = req.body.quizId;
        const response = await service.createPdf(quizId);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        });
    }
}

const getPdf = async (req, res) => {
    try {
        const pdfId = req.query.pdfId;
        const projectRoot = path.resolve(__dirname, '../..');
        const pdfDirectory = `${projectRoot}/public/pdf`;
        const filePath = path.join(pdfDirectory, pdfId);
        res.sendFile(filePath);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const deleteFile = async (req, res) => {
    try {
        const filePath = req.query.filePath;
        const response = fileDelete(filePath);
        console.log(response);
        res.status(200).json({ message: "deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    deleteFile,
    getPdf,
    createPdf,
    createQuiz,
    getSubjects,
    getQuizzes,
    startQuiz,
    submitAnswer,
    saveQuizRecord,
    getQuizRecords,
    getQuizRecord,
    saveData,
    getSavedData,
    deleteSavedData,
    getItems,
    updateQuiz
}