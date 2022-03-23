import React, { useState, useEffect } from "react";
import { Paper, Grid, TextField } from "@mui/material";
// import * as React from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Axios from "axios";

const MessageListing = ({
  profId,
  videoId,
  setStudentId,
  setCurrentChat,
  setStudentName,
}) => {
  const [newMessages, setNewMessages] = useState();
  const [searchStudent, setSearchStudent] = useState();
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/get/users?profId=${profId}&videoId=${videoId}`).then(
      (res) => {
        setNewMessages(
          res.data.filter((stu) => stu.studentName === searchStudent)
        );
      }
    );
  }, []);

  const handleClick = (mes) => {
    setStudentId(mes.id);
    setStudentName(mes.name);
    setCurrentChat(false);
  };

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <TextField
          id="outlined-basic"
          onChange={(e) => setSearchStudent(e.target.value)}
          value={searchStudent}
          label="Search Student"
          fullWidth
          variant="outlined"
        />
        <IconButton>Search</IconButton>
      </div>

      {newMessages &&
        newMessages.map((mes) => (
          <Card sx={{ maxWidth: 400 }} style={{ margin: 3 }}>
            <CardHeader
              style={{ margin: 2 }}
              avatar={
                <Avatar sx={{ backgroundColor: "#FA5523" }} aria-label="recipe">
                  {mes.name.charAt(0)}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  {/* <MoreVertIcon /> */}
                </IconButton>
              }
              title={mes.name}
              onClick={() => handleClick(mes)}
            />
          </Card>
        ))}
    </div>
  );
};

export default MessageListing;
