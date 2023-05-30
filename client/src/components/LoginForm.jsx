import React, { useState } from "react";
import FormTextField from "./FormTextField";
import { loginAPI } from "../api/AuthApi";
import { login } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import GoogleSignIn from "../assets/img/google-signin.png";

const LoginForm = ({ setSignUpTrigger }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameOrEmail, setusernameOrEmail] = useState("");
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // todo navigation bar
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await loginAPI(usernameOrEmail, password);
        if (response.error) {
            setErrorMessage(response.error);
            // remove error massage after 5 seconds
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        } else if (response.success) {
            dispatch(login(response.user));//set loggedIn state to true and set the user
        }
    }

    return (
        <form
            className="authForm"
            onSubmit={submitHandler}
        >
            <h2 className="formTitle">Login</h2>
            <FormTextField
                type="text"
                name="usernameOrEmail"
                label="Username or Email"
                onChange={e => setusernameOrEmail(e.target.value)}
                value={usernameOrEmail}
            />
            <FormTextField
                type="password"
                name="password"
                label="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            <button
                className="btn-primary"
                type="submit"
            >
                Login
            </button>
            <button
                className="btn-secondary"
                type="button"
                onClick={() => setSignUpTrigger(true)}//Display signup using popup component
            >
                Sign up
            </button>
            <a href={`${process.env.REACT_APP_URL}/auth/forgotPass`}>Forgot password?</a>
            <a href={`${process.env.REACT_APP_API_URL}/auth/google`} className="mt-1">
                <img src={GoogleSignIn} alt="Google Sign in" />
            </a>
            <label className="errorMessage">{errorMessage}</label>
        </form>
    )
}

export default LoginForm;