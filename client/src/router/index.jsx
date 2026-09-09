// router.jsx
import { createBrowserRouter } from "react-router-dom";

import { appRoutes } from "./app.routes";
import { authRoutes } from "./auth.routes";
import NotFoundPage from "../pages/common/NotFoundPage";

const router = createBrowserRouter([
  appRoutes,
  authRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
