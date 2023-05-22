import React, { useEffect } from "react";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Account from "./components/Account";
import {
  setAuth,
  setModalActive,
  setModalMessage,
} from "./store/reducers/userSlice";
import { getFiles } from "./actions/files";
import { setFiles } from "./store/reducers/fileSlice";
import ModalWindow from "./components/ModalWindow";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const token = localStorage.getItem("token");

  // Получаем массив файлов с бэка и isAuth из localStorage и записывем в store redux
  useEffect(() => {
    if (token) {
      getFiles(token)
        .then((res) => {
          dispatch(setFiles(res.data.files));
        })
        .catch((e) => {
          dispatch(setModalActive(true));
          dispatch(setModalMessage(e.message));
        });
    }
    dispatch(setAuth(JSON.parse(localStorage.getItem("isAuth"))));
  }, []);

  return (
    <Router>
      <Navbar />
      <ModalWindow />
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
