import { List } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import FileItem from "./FileItem";

const FileList = () => {
  const files = useSelector((state) => state.file.files);
  return (
    <List>
      {files.map((item) => {
        return (
          <FileItem
            key={item.id}
            fileName={item.fileName}
            url={item.url}
            mimeType={item.mimeType}
          />
        );
      })}
    </List>
  );
};

export default FileList;
