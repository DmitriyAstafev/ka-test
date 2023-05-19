import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import React from "react";
import { deleteFile, getOneFile } from "../actions/files";
import { useDispatch, useSelector } from "react-redux";
import { setFiles } from "../store/reducers/fileSlice";

const FileItem = ({ fileName, url }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files);

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

  const loadFileHandler = () => {
    getOneFile(url, token)
    .then((response) => {
      const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
      .catch((e) => {
        alert(e.message)
      })
  }

  return (
    <ListItem>
      <ListItemButton onClick={loadFileHandler}>
        {/* {mimeType.includes("image") ? (
          <ListItemAvatar>
            <Avatar src={file} />
          </ListItemAvatar>
        ) : (
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
        )} */}

        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
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
