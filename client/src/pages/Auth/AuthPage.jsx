import { useState } from "react";
import { useDispatch } from "react-redux";

import Card from "../../components/common/Card";
import LoginForm from "../../components/auth/LoginForm";
import SignUpForm from "../../components/auth/SignUpForm";
import Modal from "../../components/common/Modal";
import Eyebrow from "../../components/common/Eyebrow";

import { loginAPI, signUpAPI } from "../../api/auth/auth.api";
import { login } from "../../redux/slice/authSlice";

const AuthPage = () => {
  const dispatch = useDispatch();

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus("");

      const response = await loginAPI(values.usernameOrEmail, values.password);

      dispatch(login(response.user));
    } catch (error) {
      setStatus(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (userData, { setSubmitting, setStatus }) => {
    try {
      setStatus("");

      const response = await signUpAPI(userData);

      dispatch(login(response.user));
    } catch (error) {
      setStatus(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <section aria-labelledby="app-title">
          <div className="max-w-2xl">
            <Eyebrow>QUIZ CREATION MADE SIMPLE</Eyebrow>

            <h1
              id="app-title"
              className="mt-4 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Quiz<span className="text-primary">Builder</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Create and practice multiple-choice quizzes, review your
              knowledge, track your learning progress, and generate quizzes as
              PDF documents.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div className="flex gap-4 rounded-xl border border-border/60 bg-surface/60 p-4 shadow-sm backdrop-blur-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light font-bold text-primary">
                  ✦
                </div>

                <div>
                  <strong className="block font-semibold text-foreground">
                    Create and practice quizzes
                  </strong>

                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Build multiple-choice quizzes easily and use them for quick
                    self-assessment and exam prep.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-border/60 bg-surface/60 p-4 shadow-sm backdrop-blur-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light font-bold text-primary">
                  ✓
                </div>

                <div>
                  <strong className="block font-semibold text-foreground">
                    Track your learning progress
                  </strong>

                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Review detailed quiz results, identify weak spots, and
                    monitor growth over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Login">
          <Card className="mx-auto w-full max-w-md">
            <LoginForm
              onSubmit={handleLogin}
              onSignUp={() => setIsSignUpOpen(true)}
            />
          </Card>
        </section>
      </div>

      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <Card className="w-full max-w-md">
          <SignUpForm onSubmit={handleSignUp} />
        </Card>
      </Modal>
    </>
  );
};

export default AuthPage;
