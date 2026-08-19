import { useState } from "react";

import Card from "../../components/common/Card";
import LoginForm from "../../components/auth/LoginForm";
import SignUpForm from "../../components/auth/SignUpForm";
import Modal from "../../components/common/Modal";
import Eyebrow from "../../components/common/Eyebrow";

const AuthPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <section aria-labelledby="app-title">
          <div className="max-w-2xl">
            <Eyebrow>QUIZ CREATION MADE SIMPLE</Eyebrow>

            <h1
              id="app-title"
              className="mt-3 text-6xl font-extrabold tracking-[-0.05em] sm:text-7xl"
            >
              Quiz<span className="text-primary">Builder</span>
            </h1>

            <p className="text-muted mt-6 max-w-xl text-base leading-relaxed">
              Create and practice multiple-choice quizzes, review your
              knowledge, track your learning progress, and generate quizzes as
              PDF documents.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <div className="flex gap-4">
                <span className="text-accent text-lg">✦</span>

                <div>
                  <strong className="text-foreground block font-semibold">
                    Create and practice quizzes
                  </strong>

                  <p className="text-muted mt-1 text-sm leading-relaxed">
                    Build multiple-choice quizzes and use them for review and
                    practice.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-accent text-lg">✓</span>

                <div>
                  <strong className="text-foreground block font-semibold">
                    Track your progress
                  </strong>

                  <p className="text-muted mt-1 text-sm leading-relaxed">
                    Review your quiz results and monitor your learning progress
                    over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Login">
          <Card className="max-w-md">
            <LoginForm onSignUp={() => setIsSignUpOpen(true)} />
          </Card>
        </section>
      </div>

      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <Card className="max-w-md">
          <SignUpForm />
        </Card>
      </Modal>
    </>
  );
};

export default AuthPage;
