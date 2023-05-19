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
