import { Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";

const Account = () => {
  const filePicker = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const token = localStorage.getItem("token");

  const pickFileHandler = () => {
    filePicker.current.click();
  };

  const chooseFileHandler = (e) => {
    setSelectedFiles(Object.values(e.target.files));
  };

  const uploadFileHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      await axios.post("https://job.kitactive.ru/api/media/upload", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      setSelectedFiles(null);
      alert("Файлы успешно загружены");
    } catch (e) {
      alert(e.message);
    }
  };

  console.log(selectedFiles);

  return (
    <Container>
      <form onSubmit={uploadFileHandler}>
        <Button fullWidth onClick={pickFileHandler}>
          Выбрать файлы для загрузки
        </Button>
        <input
          onChange={chooseFileHandler}
          className="hidden"
          type="file"
          name="files[]"
          multiple
          ref={filePicker}
        />
        {selectedFiles &&
          selectedFiles.map((item) => {
            return (
              <Typography key={item.name} align="center">
                {item.name}
              </Typography>
            );
          })}
        <Button fullWidth type="submit">
          Загрузить файлы
        </Button>
      </form>
    </Container>
  );
};

export default Account;
