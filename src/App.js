// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./page/login";
import Size from "./page/size";
import Dashboard from "./page/dashboard";
import Register from "./page/register";
import ForgetPassword from "./page/forget-password";
import AcceptForget from "./page/accept-forget";
import MyInfo from "./page/my-info";
import Shop from "./page/shop";
import AcceptAccount from "./page/accept-account";
import AcceptChangeEmail from "./page/accept-change-email";
import AddCash from "./page/add-cash";
import HelloWorld from "./page/helloworld";
import InfoQr from "./page/info-qr";
import Controller from "./page/controller";
import RefreshToken from "./components/token/refresh";

function App() {
  RefreshToken();
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accept-account/:token" element={<AcceptAccount />} />
        <Route path="/change-email/:token" element={<AcceptChangeEmail />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget/:token" element={<AcceptForget />} />
        <Route path="/me" element={<MyInfo />} />
        <Route path="/size/device" element={<Size />} />
        <Route path="/shop/qr" element={<Shop />} />
        <Route path="/cash/add" element={<AddCash />} />
        <Route path="/qr/info/:qrid" element={<InfoQr />} />

        <Route path="/helloworld" element={<HelloWorld />} />
        <Route path="/controller" element={<Controller />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
