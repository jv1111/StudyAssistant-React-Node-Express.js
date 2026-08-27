import HomePage from "../pages/Home/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import CreateQuizPage from "../pages/CreateQuizPage/CreateQuizPage.jsx";
import QuizPreviewPage from "../pages/QuizPreviewPage/QuizPreviewPage";
import UpdateQuizPage from "../pages/UpdateQuizPage/UpdateQuizPage";
import RecordsPage from "../pages/RecordsPage/RecordsPage";
import RecordPage from "../pages/RecordPage/RecordPage";
import QuizzesPage from "../pages/QuizzesPage/QuizzesPage";
import QuizPage from "../pages/QuizPage/QuizPage";
import EnumQuizPage from "../pages/EnumQuizPage/EnumQuizPage";
import VerifyEmailPage from "../pages/VerifyEmailPage/VerifyEmailPage";

import ProtectedRoute from "./guards/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

export const appRoutes = {
  element: <ProtectedRoute />,
  children: [
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/quiz",
          children: [
            {
              path: "create",
              element: <CreateQuizPage />,
            },
            {
              path: "create/preview",
              element: <QuizPreviewPage />,
            },
            {
              path: "update/:quizId",
              element: <UpdateQuizPage />,
            },
            {
              path: "records",
              element: <RecordsPage />,
            },
            {
              path: "records/:recordId",
              element: <RecordPage />,
            },
            {
              path: ":subjectId",
              element: <QuizzesPage />,
            },
            {
              path: ":subjectId/:quizId",
              element: <QuizPage />,
            },
            {
              path: ":subject/enum/:quizId",
              element: <EnumQuizPage />,
            },
          ],
        },
        {
          path: "/verify-email",
          element: <VerifyEmailPage />,
        },
      ],
    },
  ],
};
