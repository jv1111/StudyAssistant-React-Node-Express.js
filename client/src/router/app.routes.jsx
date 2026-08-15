import Page from "../pages";

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
          element: <Page.HomePage />,
        },
        {
          path: "/profile",
          element: <Page.ProfilePage />,
        },
        {
          path: "/quiz",
          children: [
            {
              path: "create",
              element: <Page.CreateQuizPage />,
            },
            {
              path: "update/:quizId",
              element: <Page.UpdateQuizPage />,
            },
            {
              path: "records",
              element: <Page.RecordsPage />,
            },
            {
              path: "records/:recordId",
              element: <Page.RecordPage />,
            },
            {
              path: ":subject",
              element: <Page.QuizzesPage />,
            },
            {
              path: ":subject/:quizId",
              element: <Page.QuizPage />,
            },
            {
              path: ":subject/enum/:quizId",
              element: <Page.EnumQuizPage />,
            },
          ],
        },
      ],
    },
  ],
};
