import AuthPage from "../pages/Auth/AuthPage";
import ForgotPassPage from "../pages/ForgotPassPage/ForgotPassPage.jsx";
import ResetPassPage from "../pages/ResetPassPage/ResetPassPage.jsx";

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
