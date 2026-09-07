import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  CheckCircleFill,
  Robot,
  GraphUpArrow,
  FileEarmarkPdfFill,
} from "react-bootstrap-icons";

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
      <div className="mx-auto w-full max-w-7xl flex flex-col items-center gap-10 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <section aria-labelledby="app-title" className="contents lg:block">
          <div className="order-1 max-w-2xl text-center lg:mx-0 lg:text-left">
            <Eyebrow>QUIZ CREATION MADE SIMPLE</Eyebrow>

            <h1
              id="app-title"
              className="title-3d mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Study<span className="text-primary">Assistant</span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base lg:mx-0 mx-auto">
              Create and practice multiple-choice quizzes with automated choice
              generation, review your knowledge, track your learning progress,
              and generate quizzes as PDF documents.
            </p>
          </div>

          <div className="order-3 mx-auto grid max-w-145 grid-cols-1 gap-3 sm:grid-cols-2 lg:mx-0 lg:mt-10">
            <div className="group flex items-start text-left gap-3 rounded-xl border border-border/60 bg-surface/70 p-3.5 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary transition-transform duration-300 group-hover:scale-105">
                <CheckCircleFill size={16} />
              </div>
              <div>
                <h2 className="text-xs font-bold text-foreground">
                  Create &amp; Practice
                </h2>
                <p className="mt-0.5 text-xs leading-snug text-muted">
                  Build multiple-choice quizzes &amp; practice anytime.
                </p>
              </div>
            </div>

            <div className="group flex items-start text-left gap-3 rounded-xl border border-ai/20 bg-ai-light/65 p-3.5 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-ai/40 hover:shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ai text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Robot size={17} />
              </div>
              <div>
                <h2 className="text-xs font-bold text-foreground">
                  AI-Powered Choices
                </h2>
                <p className="mt-0.5 text-xs leading-snug text-muted">
                  Generate relevant choices that fit your questions.
                </p>
              </div>
            </div>

            <div className="group flex items-start text-left gap-3 rounded-xl border border-info/20 bg-info-light/65 p-3.5 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-info/40 hover:shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-info text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                <GraphUpArrow size={16} />
              </div>
              <div>
                <h2 className="text-xs font-bold text-foreground">
                  Track Progress
                </h2>
                <p className="mt-0.5 text-xs leading-snug text-muted">
                  Review results and monitor performance over time.
                </p>
              </div>
            </div>

            <div className="group flex items-start text-left gap-3 rounded-xl border border-success/20 bg-success-light/65 p-3.5 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-success/40 hover:shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                <FileEarmarkPdfFill size={16} />
              </div>
              <div>
                <h2 className="text-xs font-bold text-foreground">
                  Download PDF
                </h2>
                <p className="mt-0.5 text-xs leading-snug text-muted">
                  Export quizzes to printable PDFs for offline study.
                </p>
              </div>
            </div>

            <div className="flex items-start text-left gap-2.5 rounded-xl border border-ai/15 bg-ai-light/40 px-3.5 py-2.5 backdrop-blur-xs sm:col-span-2">
              <Robot size={15} className="mt-0.5 shrink-0 text-ai" />

              <p className="text-xs leading-relaxed text-muted">
                <span className="font-semibold text-foreground">
                  Smarter quiz creation:
                </span>{" "}
                AI generates plausible answer choices while keeping you in
                control.
              </p>
            </div>
          </div>
        </section>

        <section aria-label="Login" className="order-2 w-full">
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
