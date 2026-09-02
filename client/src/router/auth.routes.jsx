import AuthPage from "../pages/auth/AuthPage";
import ForgotPassPage from "../pages/auth/ForgotPassPage";
import ResetPassPage from "../pages/auth/ResetPassPage";

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
          element: <AuthPage />,
        },
        {
          path: "/auth/forgotPass",
          element: <ForgotPassPage />,
        },
        {
          path: "/reset-password",
          element: <ResetPassPage />,
        },
      ],
    },
  ],
};
