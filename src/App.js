import React, { useEffect } from "react";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Account from "./components/Account";
import { setAuth } from "./store/reducers/userSlice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  
  // Получаем isAuth из localStorage и записывем в store redux
  useEffect(() => {
    dispatch(setAuth(JSON.parse(localStorage.getItem("isAuth"))))
  }, [])

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
