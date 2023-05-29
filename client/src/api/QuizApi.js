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

const getSubjects = async (queryParams) => {
    const { searchVal, skipCount } = queryParams;
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

const getQuizzes = async (queryParams) => {
    const { subject, searchVal, skipCount } = queryParams;
    try {
        const response = await axios.get("/quiz/quizList", {
            params: {
                subject: subject,
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

const getRecords = async (queryParams) => {
    const searchVal = queryParams.searchVal;
    try {
        const response = await axios.get("/quiz/records", {
            params: {
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

const saveData = async (key, data, quizId) => {
    try {
        const response = await axios.put("/quiz/saveData", {
            key: key,
            data: data,
            quizId: quizId
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const getSavedData = async (key, quizId) => {
    try {
        const saveData = await axios.get("/quiz/savedData", {
            params: { key: key, quizId: quizId }
        });
        console.log(saveData.data);
        return saveData.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const deleteSavedData = async (key, quizId) => {
    try {
        const response = await axios.delete("/quiz/savedData", {
            params: { key: key, quizId: quizId }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

// todo create a new method in server to make this work
const getItemsApi = async (quizId) => {
    try {
        const response = await axios.get("/quiz/getItems", {
            params: { quizId: quizId }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const updateQuiz = async (quizId, subject, quizName, items) => {
    try {
        const response = await axios.put("/quiz/updateQuiz", {
            subject: subject,
            quizName: quizName,
            items: items,
            quizId: quizId
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const setPDFOnServer = async (quizId) => {
    try {
        const response = await axios.put("/quiz/createPdf", {
            quizId: quizId
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


const getPdf = async (pdfId) => {
    try {
        const response = await axios.get("/quiz/getPdf", {
            params: { pdfId: pdfId },
            responseType: "blob"
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const deleteFile = async (filePath) => {
    try {
        const response = await axios.delete("/quiz/deleteFile", {
            params: { filePath: filePath }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export {
    deleteFile,
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
    deleteSavedData,
    getItemsApi,
    updateQuiz,
    setPDFOnServer,
    getPdf
}