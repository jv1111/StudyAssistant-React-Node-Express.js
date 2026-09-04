import { RouterProvider } from "react-router-dom";

import LoadingPage from "./pages/common/LoadingPage";
import router from "./router";
import useSessionChecker from "./hooks/auth/useSessionChecker";

function App() {
  const { isLoading } = useSessionChecker();

  if (isLoading) {
    return (
      <div className="App">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
