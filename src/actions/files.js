import axios from "axios";

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

export const getFiles = async (token) => {
  const response = await axios.get("https://job.kitactive.ru/api/media", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

export const getOneFile = async (url, token) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

export const deleteFile = async (url, token) => {
  const response = await axios.delete(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};
