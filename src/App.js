// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./page/login";
import Size from "./page/size";
import Dashboard from "./page/dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/size/device" element={<Size />} />
      </Routes>
    </div>
  );
}

export default App;
