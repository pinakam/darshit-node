import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import Home from "../Component/Home";
import About from "../Component/About";
import Layout from "../Component/Navbar";
import LoginForm from "../Component/Login";
import Career from "../Component/career";
import Call from "../Component/Call";
import DetailHome from "../Component/DetailHome";
import DetailCareer from "../Component/DetailCareer";
import AdminPanel from "./AdminPanel";
import ManagerPanel from "./ManagerPanel";

const UserRoute = () => {
  const location = useLocation();
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const isAuthenticated = email && password;
  return (
    <div>
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
                  isAuthenticated ? (
                    <Career />
                  ) : (
                    <Navigate to="/login" replace />
                  )
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
              <Route
                path="/adminpanel"
                element={
                  isAuthenticated ? (
                    <AdminPanel />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/managerpanel"
                element={
                  isAuthenticated ? (
                    <ManagerPanel />
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
    </div>
  );
};

export default UserRoute;
