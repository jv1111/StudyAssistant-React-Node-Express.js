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
            <span className="auth-eyebrow">QUIZ CREATION MADE SIMPLE</span>

            <h1 id="app-title" className="auth-title">
              Quiz<span>Builder</span>
            </h1>

            <p className="auth-description">
              Create and practice multiple-choice quizzes, review your
              knowledge, track your learning progress, and generate quizzes as
              PDF documents.
            </p>

            <div className="auth-features">
              <div className="auth-feature">
                <span className="auth-feature-icon">✦</span>
                <div>
                  <strong>Create and practice quizzes</strong>
                  <p>
                    Build multiple-choice quizzes and use them for review and
                    practice.
                  </p>
                </div>
              </div>

              <div className="auth-feature">
                <span className="auth-feature-icon">✓</span>
                <div>
                  <strong>Track your progress</strong>
                  <p>
                    Review your quiz results and monitor your learning progress
                    over time.
                  </p>
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
