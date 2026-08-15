import Page from "../pages";

import ProtectedRoute from "./guards/ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";

export const authRoutes = {
  element: <ProtectedRoute requireAuth={false} />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/auth",
          element: <Page.AuthPage />,
        },
        {
          path: "/auth/forgotPass",
          element: <Page.ForgotPassPage />,
        },
        {
          path: "/verification/resetPassword/:userId/:token",
          element: <Page.ResetPassPage />,
        },
      ],
    },
  ],
};
