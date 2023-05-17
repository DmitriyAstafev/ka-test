import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions/user";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginHandler = async (loginData) => {
    const { email, password } = loginData;
    try {
      const response = await axios.post("https://job.kitactive.ru/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      dispatch(setAuth(true));
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
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
