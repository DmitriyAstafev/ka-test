import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions/user";
import { useDispatch } from "react-redux";
import {
  setAuth,
  setModalActive,
  setModalMessage,
} from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Используем билиотеку react-hook-form для работы с формой и валидации полей
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Отправляет данные для входа, получаем и сохраняем token в localStorage,
  // сохраняем состояние авторизации, делаем редирект на страницу аккаунта
  const loginHandler = (loginData) => {
    const { email, password } = loginData;
    login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(setAuth(true));
        navigate("/");
      })
      .catch((e) => {
        dispatch(setModalActive(true));
        dispatch(setModalMessage(e.message));
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <form onSubmit={handleSubmit(loginHandler)}>
        <Stack spacing={2}>
          <TextField
            name="email"
            label="Электронная почта"
            variant="outlined"
            {...register("email", {
              required: "Введите адрес электронной почты",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Введите корректный адрес электронной почты",
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            name="password"
            label="Пароль"
            variant="outlined"
            {...register("password", {
              required: "Введите пароль",
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Button type="submit">Войти в аккаунт</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
