import { createBrowserRouter } from "react-router-dom";

import Page from "../pages";

import { appRoutes } from "./app.routes";
import { authRoutes } from "./auth.routes";

const router = createBrowserRouter([
  appRoutes,
  authRoutes,
  {
    path: "/verification/verifyEmail/:userId/:token",
    element: <Page.VerifyEmailPage />,
  },
]);

export default router;
