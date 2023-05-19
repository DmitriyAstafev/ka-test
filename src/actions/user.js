import axios from "axios";

export const registration = async (name, email, password) => {
  const response = await axios.post("https://job.kitactive.ru/api/register", {
    name,
    email,
    password,
  });

  return response;
};

export const login = async (email, password) => {
  const response = await axios.post("https://job.kitactive.ru/api/login", {
    email,
    password,
  });

  return response;
};

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
