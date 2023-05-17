import axios from "axios";

export const registration = async (name, email, password) => {
  try {
    const response = await axios.post("https://job.kitactive.ru/api/register", {
      name,
      email,
      password,
    });
    alert("Поздравляем, вы успешно зарегистрированы");
  } catch (e) {
    alert(e.message);
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post("https://job.kitactive.ru/api/login", {
      email,
      password,
    });
    localStorage.setItem('token', response.data.token)
  } catch (e) {
    alert(e.message);
  }
};
