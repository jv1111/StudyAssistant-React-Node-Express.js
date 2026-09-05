import { useState } from "react";
import { useDispatch } from "react-redux";
import { CheckCircleFill, Robot, GraphUpArrow } from "react-bootstrap-icons";

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
              className="title-3d mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Study<span className="text-primary">Assistant</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Create and practice multiple-choice quizzes with automated choice
              generation, review your knowledge, track your learning progress,
              and generate quizzes as PDF documents.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="group rounded-2xl border border-border/60 bg-surface/70 p-5 shadow-sm backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-(--shadow-gold-glow)">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-110">
                  <CheckCircleFill size={19} />
                </div>

                <h2 className="mt-4 text-sm font-bold text-foreground">
                  Create &amp; Practice
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Build multiple-choice quizzes and practice them whenever you
                  need to prepare.
                </p>
              </div>

              <div className="group rounded-2xl border border-ai/20 bg-ai-light/65 p-5 shadow-sm backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-ai/40 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ai text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Robot size={20} />
                </div>

                <h2 className="mt-4 text-sm font-bold text-foreground">
                  AI-Powered Choices
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Let AI generate smarter, more relevant answer choices that fit
                  naturally with your question and the correct answer.
                </p>
              </div>

              <div className="group rounded-2xl border border-info/20 bg-info-light/65 p-5 shadow-sm backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-info/40 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-info text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <GraphUpArrow size={19} />
                </div>

                <h2 className="mt-4 text-sm font-bold text-foreground">
                  Track Progress
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Review results, identify weak areas, and monitor your learning
                  progress over time.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-ai/15 bg-ai-light/40 px-4 py-3 backdrop-blur-xs">
              <Robot size={16} className="mt-0.5 shrink-0 text-ai" />

              <p className="text-xs leading-relaxed text-muted">
                <span className="font-semibold text-foreground">
                  Smarter quiz creation:
                </span>{" "}
                AI can generate more relevant and plausible answer choices based
                on your questions, helping you create better-balanced quizzes
                while keeping you in control of the final choices.
              </p>
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
