import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Page.HomePage />} />
          <Route path="/auth" element={<Page.AuthPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
