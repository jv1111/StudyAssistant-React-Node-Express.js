import { useState } from "react";
import { useDispatch } from "react-redux";

import FormTextField from "../forms/FormTextField";
import GoogleSignIn from "../../assets/img/google-signin.png";
import { loginAPI } from "../../api/auth.api";
import { login } from "../../redux/slice/authSlice";

const LoginForm = ({ onSignUp }) => {
  const dispatch = useDispatch();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    const response = await loginAPI(usernameOrEmail, password);

    if (response.error) {
      setErrorMessage(response.error);
      setIsSubmitting(false);
      return;
    }

    if (response.success) {
      dispatch(login(response.user));
    }

    setIsSubmitting(false);
  };

  return (
    <form className="authForm" onSubmit={handleSubmit}>
      <h2 className="formTitle">Login</h2>

      <FormTextField
        type="text"
        name="usernameOrEmail"
        label="Username or Email"
        value={usernameOrEmail}
        onChange={(event) => setUsernameOrEmail(event.target.value)}
      />

      <FormTextField
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button className="btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <button
        className="btn-secondary"
        type="button"
        disabled={isSubmitting}
        onClick={onSignUp}
      >
        Sign up
      </button>

      <a href={`${process.env.REACT_APP_URL}/auth/forgotPass`}>
        Forgot password?
      </a>

      <a href={`${process.env.REACT_APP_API_URL}/auth/google`} className="mt-1">
        <img src={GoogleSignIn} alt="Google Sign in" />
      </a>

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
