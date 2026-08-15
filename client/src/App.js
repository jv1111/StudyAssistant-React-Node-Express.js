import "./App.css";
import { RouterProvider } from "react-router-dom";

import Page from "./pages";
import router from "./router";
import useSessionChecker from "./hooks/useSessionChecker";

function App() {
  const { isLoading } = useSessionChecker();

  if (isLoading) {
    return (
      <div className="App">
        <Page.LoadingPage />
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
