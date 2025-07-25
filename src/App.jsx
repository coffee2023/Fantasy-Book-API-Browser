import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import BookDetail from "./components/BookDetail";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/book/:key/:title" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;