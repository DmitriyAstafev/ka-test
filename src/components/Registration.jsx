import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { registration } from "../actions/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModalActive, setModalMessage } from "../store/reducers/userSlice";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Используем билиотеку react-hook-form для работы с формой и валидации полей
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Отправляет данные для регистрации, сообщаем об успешной регистрации
  // делаем редирект на страницу входа
  const registrationHandler = (regData) => {
    const { name, email, password } = regData;
    registration(name, email, password)
      .then((res) => {
        dispatch(setModalActive(true));
        dispatch(
          setModalMessage(
            "Поздравляем, вы успешно зарегистрированы. Войдите в аккаунт, чтобы начать работу."
          )
        );
        navigate("/login");
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
      <form onSubmit={handleSubmit(registrationHandler)}>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Имя"
            variant="outlined"
            {...register("name", { required: "Введите свое имя" })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
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
          <Button type="submit">Зарегистрироваться</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Registration;
