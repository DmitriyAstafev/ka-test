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

const FileItem = ({ fileName, mimeType, file }) => {
  return (
    <ListItem>
      <ListItemButton>
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
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default FileItem;
