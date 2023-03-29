const express = require("express");
const route = express.Router();
const QuizModel = require("../src/models/QuizModel");

route.post(
    "/createMany",
    async (req, res) => {
        const num = req.body.num;
        let n = 1;
        let subject = `sub${n}`;
        let quizName = `qn${n}`;
        for (let i = 0; i < 100; i++) {
            console.log(i);
            const quiz = new QuizModel({
                userId: "641f9dd5184ce92580806eaa",
                subject: subject,
                quizName: quizName,
                items: [{}, {}, {}],
                numberOfItems: 3,
            });
            n++;
            subject = `sub${n}`;
            quizName = `qn${n}`;
            await quiz.save();
        }
        res.send("created 100 data");
    }
);

module.exports = route;