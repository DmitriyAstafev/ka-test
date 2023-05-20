import axios from "axios";

// Функции запросов к API, относящиеся к пользователю

// Регистрация нового пользователя
export const registration = async (name, email, password) => {
  const response = await axios.post("https://job.kitactive.ru/api/register", {
    name,
    email,
    password,
  });

  return response;
};

// Вход в аккаунт
export const login = async (email, password) => {
  const response = await axios.post("https://job.kitactive.ru/api/login", {
    email,
    password,
  });

  return response;
};

// Выход из аккаунта
export const logout = async (token) => {
  const response = await axios.post(
    "https://job.kitactive.ru/api/logout",
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response;
};
