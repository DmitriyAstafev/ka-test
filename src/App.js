import React from "react";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Account from "./components/Account";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <Router>
      <Navbar />
      {!isAuth ? (
        <Routes>
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<Account />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
