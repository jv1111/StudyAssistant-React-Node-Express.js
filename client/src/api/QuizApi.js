import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;//set base url for every request

const getSubjects = async () => {
    try {
        const response = await axios.get("/quiz/subjectsList");
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const getQuizzes = async (subject) => {
    try {
        const response = await axios.get("/quiz/quizList", {
            params: {
                subject: subject
            }
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const getQuestion = async (quizId) => {
    try {
        const response = await axios.get("/quiz/startQuiz", {
            params: {
                quizId: quizId
            }
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const submitAnswer = async (questionId, answer) => {
    try {
        const response = await axios.put("/quiz/submitAnswer",
            {
                questionId: questionId,
                answer: answer
            }
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const saveQuizRecord = async (quizId, subject, quizName, score, numberOfItems) => {
    try {
        const response = await axios.put("/quiz/saveRecord",
            {
                quizId: quizId,
                subject: subject,
                quizName: quizName,
                score: score,
                numberOfItems: numberOfItems
            }
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const getRecords = async (userId) => {
    try {
        const response = await axios.get("/quiz/records", {
            params: {
                userId: userId
            }
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

export {
    getSubjects,
    getQuizzes,
    getQuestion,
    submitAnswer,
    saveQuizRecord,
    getRecords
}