import { RouterProvider } from "react-router-dom";

import LoadingPage from "./pages/Loading/LoadingPage";
import router from "./router";
import useSessionChecker from "./hooks/useSessionChecker";

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
    <div className="App h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
