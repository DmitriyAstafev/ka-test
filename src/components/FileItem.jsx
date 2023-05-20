import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import React, { useState } from "react";
import { deleteFile, getOneFile } from "../actions/files";
import { useDispatch, useSelector } from "react-redux";
import { setFiles } from "../store/reducers/fileSlice";

const FileItem = ({ fileName, url, mimeType }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files);
  const [imgUrl, setImgUrl] = useState("");

  // Отправляет запрос на удаление, после удаляет элемент из массива files, для обновления отображения
  const deleteHandler = () => {
    deleteFile(url, token)
      .then((res) => {
        const newFileList = files.filter((item) => item.url !== url);
        dispatch(setFiles(newFileList));
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  // Получает файл с бэка, создает объект Blob и ссылку для реализации скачивания на компьютер пользователя
  const loadFileHandler = () => {
    getOneFile(url, token)
      .then((response) => {
        const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  // Получает изображение с бэка, создает объект Blob, читает его как dataURL и сетит ссылку,
  // которая используется для превью изображения
  const getImageUrl = () => {
    getOneFile(url, token)
      .then((response) => {
        const file = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setImgUrl(reader.result);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  if (mimeType.includes("image")) {
    getImageUrl();
  }

  return (
    <ListItem>
      <ListItemButton onClick={loadFileHandler}>
        {mimeType.includes("image") ? (
          <ListItemAvatar>
            <Avatar src={imgUrl} />
          </ListItemAvatar>
        ) : (
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
        )}
        <ListItemText primary={fileName} />
      </ListItemButton>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default FileItem;
