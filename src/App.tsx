import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Users from "./components/users";
import Create from "./components/create";
import Update from "./components/update";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Users/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
