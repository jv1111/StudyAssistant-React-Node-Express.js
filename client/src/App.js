import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from "./pages";
import Navbar from "./components/Navbar";
import useSessionChecker from "./hooks/useSessionChecker";

function App() {

  const { isLoading, auth } = useSessionChecker();

  if (isLoading) {
    return <Page.LoadingPage />
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
              <Route path="records" element={<Page.RecordsPage />} />
              <Route path="records/:recordId" element={<Page.RecordPage />} />
              <Route path=":subject" element={<Page.QuizzesPage />} />
              <Route path=":subject/:quizId" element={<Page.QuizPage />} />
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
            <Route path="/auth/forgotPass" element={<Page.ForgotPassPage/>}/>
          </Route>

        </Routes>
      </Router>
    </div >
  );
}

export default App;
