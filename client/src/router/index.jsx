import { createBrowserRouter } from "react-router-dom";

import VerifyEmailPage from "../pages/VerifyEmailPage/VerifyEmailPage";

import { appRoutes } from "./app.routes";
import { authRoutes } from "./auth.routes";

const router = createBrowserRouter([
  appRoutes,
  authRoutes,
  {
    path: "/verification/verifyEmail/:userId/:token",
    element: <VerifyEmailPage />,
  },
]);

export default router;
