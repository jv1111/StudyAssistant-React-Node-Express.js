import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;//set base url for every request
axios.defaults.withCredentials = true;// Enable passing credentials on cookies with every request. This is required for our server to save cookies on the client's browser.

const changePass = async (newPasswordData) => {
    try {
        const response = await axios.post(
            "user/changePass",
            newPasswordData
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const changeProfile = async (formData) => {
    try {
        const response = await axios.post(
            "user/changeProfileImg", formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const fetchProfileImgAPI = async () => {
    try {
        const response = await axios.post(
            "user/getProfileImg"
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const addOrUpdateEmail = async (newEmail) => {
    try {
        const response = await axios.put(
            "user/addOrUpdateEmail",
            {
                newEmail: newEmail,
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const verifyEmailApi = async (userId, token) => {
    try {
        const response = await axios.put(
            "user/verifyEmail",
            {
                userId: userId,
                token: token
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const resetPassRequestApi = async (email) => {
    try {
        const response = await axios.put(
            "user/sendResetPassRequest",
            {
                email: email
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

export {
    changePass,
    changeProfile,
    fetchProfileImgAPI,
    addOrUpdateEmail,
    verifyEmailApi,
    resetPassRequestApi
}