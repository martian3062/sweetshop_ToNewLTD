import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashboardPage";
import SweetPage from "./pages/SweetPage";
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layouts/Navbar";

export default function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/sweets"
          element={
            <PrivateRoute>
              <SweetPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
