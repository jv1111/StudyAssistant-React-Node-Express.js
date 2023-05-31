import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from "./pages";
import Navbar from "./components/Navbar";
import useSessionChecker from "./hooks/useSessionChecker";
import { useEffect } from "react";

function App() {

  const { isLoading, auth } = useSessionChecker();

  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
    console.log(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener(`resize`, documentHeight);
    documentHeight()
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <Page.LoadingPage />
      </div>
    )
  }

  return (
    <div className="App">
      <Router>
        {auth.loggedIn ? <Navbar /> : ""}
        <Routes>
          {/* Logged in */}
          <Route element={
            <Page.ProtectedRoute
              isAllowed={auth.loggedIn}
              redirectPath={"/auth"}
            />
          } >
            <Route path="/" element={<Page.HomePage />} />
            <Route path="/profile" element={<Page.ProfilePage />} />

            <Route path="/quiz">
              <Route path="create" element={<Page.CreateQuizPage />} />
              <Route path="update/:quizId" element={<Page.UpdateQuizPage />} />
              <Route path="records" element={<Page.RecordsPage />} />
              <Route path="records/:recordId" element={<Page.RecordPage />} />
              <Route path=":subject" element={<Page.QuizzesPage />} />
              <Route path=":subject/:quizId" element={<Page.QuizPage />} />
              <Route path=":subject/enum/:quizId" element={<Page.EnumQuizPage />} />
            </Route>

          </Route>

          <Route path="/verification">
            <Route path="verifyEmail/:userId/:token" element={<Page.VerifyEmailPage />} />
          </Route>

          {/* Unauthorize */}
          <Route element={
            <Page.ProtectedRoute
              isAllowed={!auth.loggedIn}
              redirectPath={'/'}
            />
          } >

            <Route path="/auth" element={<Page.AuthPage />} />
            <Route path="/auth/forgotPass" element={<Page.ForgotPassPage />} />
            <Route path="verification/resetPassword/:userId/:token" element={<Page.ResetPassPage />} />

          </Route>

        </Routes>
      </Router>
    </div >
  );
}

export default App;
