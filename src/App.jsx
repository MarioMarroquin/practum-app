import { CssBaseline } from "@mui/material";
import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main";
import { useSession } from "./providers/session";
import Auth from "./views/auth";
import Dashboard from "./views/dashboard/Dashboard";
import Users from "./views/users/Users";

const App = () => {
  const { isLogged } = useSession();

  if (!isLogged) {
    return <Auth />;
  }

  //if (!token) return <h1>Loading</h1>;

  return (
    <MainLayout>
      <CssBaseline />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
