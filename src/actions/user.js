import axios from "axios";

export const registration = async (name, email, password) => {
  try {
    const response = await axios.post("https://job.kitactive.ru/api/register", {
      name,
      email,
      password,
    });
    alert("Поздравляем, вы успешно зарегистрированы");
    console.log(response);
  } catch (e) {
    alert(e.message);
  }
};
