import { Button, Container, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { getFiles, uploadFiles } from "../actions/files";
import FileList from "./FileList";
import { setFiles } from "../store/reducers/fileSlice";
import { useDispatch, useSelector } from "react-redux";

const Account = () => {
  const filePicker = useRef(null);
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files)
  const [selectedFiles, setSelectedFiles] = useState(null);
  const token = localStorage.getItem("token");

  const pickFileHandler = () => {
    filePicker.current.click();
  };

  const chooseFileHandler = (e) => {
    setSelectedFiles(Object.values(e.target.files));
  };

  const uploadFileHandler = (e) => {
    e.preventDefault();
    if (!selectedFiles) {
      alert("Выберите файлы для загрузки");
      return;
    }
    const formData = new FormData(e.target);
    uploadFiles(formData, token)
      .then((res) => {
        setSelectedFiles(null);
        getFiles(token)
          .then((res) => {
            dispatch(setFiles(res.data.files));
            alert("Файлы успешно загружены");
          })
          .catch((e) => {
            alert(e.message);
          });
      })
      .catch((e) => {
        alert(e.message);
      });
  };

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
      <Typography align="center">Всего загружено файлов: {files.length} из 20</Typography>
      <FileList />
    </Container>
  );
};

export default Account;
