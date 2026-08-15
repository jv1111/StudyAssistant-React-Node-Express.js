import { useState } from "react";

import AuthCard from "../../components/auth/AuthCard";
import LoginForm from "../../components/auth/LoginForm";
import SignUpForm from "../../components/auth/SignUpForm";
import Modal from "../../components/common/Modal";

const AuthPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="page authPage container">
      <section className="titleDiv" aria-labelledby="app-title">
        <h1 id="app-title" className="title">
          RevBot
        </h1>

        <div className="line" />

        <div className="descriptionDiv">
          <p>
            An automatic quiz maker app automatically converts user-inputted
            questions and answers into multiple-choice quizzes and can grade
            them automatically. It is a time-saving tool for educators,
            trainers, and anyone who needs to create quizzes quickly and
            efficiently.
          </p>
        </div>
      </section>

      <div className="loginDiv">
        <AuthCard>
          <LoginForm onSignUp={() => setIsSignUpOpen(true)} />
        </AuthCard>
      </div>

      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <AuthCard>
          <SignUpForm />
        </AuthCard>
      </Modal>
    </div>
  );
};

export default AuthPage;
