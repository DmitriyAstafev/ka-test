import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

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
            <Button color="inherit">Выход</Button>
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
