import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login/Login";

const Auth = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
};

export default Auth;
