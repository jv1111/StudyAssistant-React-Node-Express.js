import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;//set base url for every request

const createQuiz = async (subject, quizName, items) => {
    try {
        const response = await axios.put("/quiz/create",
            {
                subject: subject,
                quizName: quizName,
                items: items
            });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
}

const getSubjects = async (searchVal, skipCount) => {
    try {
        const response = await axios.get("/quiz/subjectsList", {
            params: {
                searchQuery: searchVal,
                skipCount: skipCount
            }
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const getQuizzes = async (subject, searchVal) => {
    try {
        const response = await axios.get("/quiz/quizList", {
            params: {
                subject: subject,
                searchQuery: searchVal
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

const saveQuizRecord = async (quizId) => {
    try {
        const response = await axios.put("/quiz/saveRecord",
            {
                quizId: quizId,
            }
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const getRecords = async (userId, searchVal) => {
    try {
        const response = await axios.get("/quiz/records", {
            params: {
                userId: userId,
                searchQuery: searchVal
            }
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const getRecord = async (recordId) => {
    try {
        const response = await axios.get("/quiz/record", {
            params: {
                recordId: recordId
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const saveData = async (key, data) => {
    try {
        const response = await axios.put("/quiz/saveData", {
            key: key,
            data: data
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const getSavedData = async (key) => {
    try {
        const saveData = await axios.get("/quiz/savedData", {
            params: { key: key }
        });
        console.log(saveData.data);
        return saveData.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const deleteSavedData = async (key) => {
    try {
        const response = await axios.delete("/quiz/savedData", {
            params: { key: key }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export {
    getSubjects,
    getQuizzes,
    getQuestion,
    submitAnswer,
    saveQuizRecord,
    getRecords,
    getRecord,
    createQuiz,
    saveData,
    getSavedData,
    deleteSavedData
}