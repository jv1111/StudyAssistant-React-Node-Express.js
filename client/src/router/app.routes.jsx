import ProfilePage from "../pages/profile/ProfilePage";
import CreateQuizPage from "../pages/quiz/CreateQuizPage";
import QuizPreviewPage from "../pages/quiz/QuizPreviewPage";
import UpdateQuizPage from "../pages/quiz/UpdateQuizPage";
import ManageQuizzesPage from "../pages/quiz/ManageQuizzesPage";
import RecordsPage from "../pages/records/RecordsPage";
import RecordPage from "../pages/records/RecordPage";
import QuizzesPage from "../pages/quiz/QuizzesPage";
import QuizPage from "../pages/quiz/QuizPage";
import EnumerationQuizPage from "../pages/quiz/EnumerationQuizPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

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
          element: <QuizzesPage />,
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
              path: "manage",
              element: <ManageQuizzesPage />,
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
              path: "session/multiple_choice/:sessionId",
              element: <QuizPage />,
            },
            {
              path: "session/enumeration/:sessionId",
              element: <EnumerationQuizPage />,
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
