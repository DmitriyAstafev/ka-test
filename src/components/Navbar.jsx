import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setAuth } from "../store/reducers/userSlice";
import { logout } from "../actions/user";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  console.log(token);

  // Отправляем запрос на выход, после удаляем токен из localstorage
  // сохраняем состояние авторизации
  const logoutHandler = () => {
    logout(token)
      .then((res) => {
        localStorage.removeItem("token");
        dispatch(setAuth(false));
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Сервис хранения файлов
          </Typography>
          {isAuth ? (
            <Button color="inherit" onClick={logoutHandler}>
              Выход
            </Button>
          ) : (
            <>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to="/login"
              >
                <Button color="inherit">Вход</Button>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none", color: "inherit" }}
                to="/registration"
              >
                <Button color="inherit">Регистрация</Button>
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
