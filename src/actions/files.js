import axios from "axios";

// Функции запросов к API, относящиеся к работе с файлами

// Загрузка массива файлов на бэк
export const uploadFiles = async (data, token) => {
  const response = await axios.post(
    "https://job.kitactive.ru/api/media/upload",
    data,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

// Получение массива файлов
export const getFiles = async (token) => {
  const response = await axios.get("https://job.kitactive.ru/api/media", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

// Получение одного файла
export const getOneFile = async (url, token) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};
// Удаление файла
export const deleteFile = async (url, token) => {
  const response = await axios.delete(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};
