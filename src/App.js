// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./page/login";
import Dashboard from "./page/dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
