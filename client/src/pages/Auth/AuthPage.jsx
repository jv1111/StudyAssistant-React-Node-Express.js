import { useState } from "react";

import AuthCard from "../../components/auth/AuthCard";
import LoginForm from "../../components/auth/LoginForm";
import SignUpForm from "../../components/auth/SignUpForm";
import Modal from "../../components/common/Modal";

const AuthPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
      <div className="row align-items-center justify-content-center g-5 min-vh-75">
        <section className="col-12 col-lg-7" aria-labelledby="app-title">
          <div className="auth-intro">
            <span className="auth-eyebrow">QUIZ MAKING MADE SIMPLE</span>

            <h1 id="app-title" className="auth-title">
              Rev<span>Bot</span>
            </h1>

            <p className="auth-description">
              Create multiple-choice quizzes from your own questions and
              answers. RevBot automatically generates and grades quizzes, making
              it easier to prepare assessments quickly.
            </p>

            <div className="auth-features">
              <div className="auth-feature">
                <span className="auth-feature-icon">✦</span>
                <div>
                  <strong>Generate quizzes</strong>
                  <p>Turn your questions into ready-to-use quizzes.</p>
                </div>
              </div>

              <div className="auth-feature">
                <span className="auth-feature-icon">✓</span>
                <div>
                  <strong>Automatic grading</strong>
                  <p>Get your results without checking every answer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="col-12 col-md-8 col-lg-5" aria-label="Login">
          <AuthCard>
            <LoginForm onSignUp={() => setIsSignUpOpen(true)} />
          </AuthCard>
        </section>
      </div>

      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <AuthCard>
          <SignUpForm />
        </AuthCard>
      </Modal>
    </>
  );
};

export default AuthPage;
