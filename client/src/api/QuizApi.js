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

export {
    getSubjects,
    getQuizzes
}