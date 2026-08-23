import { createBrowserRouter } from "react-router-dom";

import { appRoutes } from "./app.routes";
import { authRoutes } from "./auth.routes";

const router = createBrowserRouter([appRoutes, authRoutes]);

export default router;
