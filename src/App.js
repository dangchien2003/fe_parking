// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./page/login";
import Size from "./page/size";
import Dashboard from "./page/dashboard";
import Register from "./page/register";
import ForgetPassword from "./page/forget-password";
import AcceptForget from "./page/accept-forget";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget/:token" element={<AcceptForget />} />
        <Route path="/size/device" element={<Size />} />
      </Routes>
    </div>
  );
}

export default App;
