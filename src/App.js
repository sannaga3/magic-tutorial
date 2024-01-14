import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./About";
import Login from "./Login";

function App() {
  return (
    <div className="min-h-screen bg-indigo-300">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
