import React from "react";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import Layout from "./Component/Navbar";
import LoginForm from "./Component/Login";
import Career from "./Component/career";
import Call from "./Component/Call";
import DetailHome from "./Component/DetailHome";
import DetailCareer from "./Component/DetailCareer";

const App = () => {
  const location = useLocation();
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  const isAuthenticated = email && password;

  return (
    <div>
      <div className="d-flex">
        <div>
          {location.pathname !== "/login" && isAuthenticated && <Layout />}
        </div>
        <div>
          <Routes>
            <Route
              path="/home"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/about"
              element={
                isAuthenticated ? <About /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/career"
              element={
                isAuthenticated ? <Career /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/call"
              element={
                isAuthenticated ? <Call /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/home/detail"
              element={
                isAuthenticated ? (
                  <DetailHome />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/career/detail"
              element={
                isAuthenticated ? (
                  <DetailCareer />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;
