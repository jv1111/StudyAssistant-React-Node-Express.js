import { RouterProvider } from "react-router-dom";

import Loading from "./components/common/Loading";
import router from "./router";
import useSessionChecker from "./hooks/auth/useSessionChecker";

function App() {
  const { isLoading } = useSessionChecker();

  if (isLoading) {
    return (
      <div className="App">
        <Loading />
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
