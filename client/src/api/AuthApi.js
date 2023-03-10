import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;//set base url for every request
axios.defaults.withCredentials = true;// Enable passing credentials on cookies with every request. This is required for our server to save cookies on the client's browser.

const loginAPI = async (usernameOrEmail, password) => {
    try {
        const response = await axios.post('/auth/login', {
            usernameOrEmail: usernameOrEmail,
            password: password
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

const signUpAPI = async (userData) => {
    try {
        const response = await axios.post('/auth/register',
            userData
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
}

export {
    loginAPI,
    signUpAPI
}
