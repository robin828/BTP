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
  const url = "http://class.chartr.in:5000"
  // const url = "http://localhost:5000"
  useEffect(() => {
    Axios.get(`${url}/api/get/users?profId=${profId}&videoId=${videoId}`).then(
      (res) => {
        // if(searchStudent)
        setNewMessages(
          res.data
        );
      }
    );
  }, []);

  const handleClick = (mes) => {
    setStudentId(mes.id);
    setStudentName(mes.name);
    setCurrentChat(false);
  };
  console.log(newMessages, searchStudent, "++")

  const handleSearch = () => {
    Axios.get(`${url}/api/get/users?profId=${profId}&videoId=${videoId}`).then(
      (res) => {
        // if(searchStudent)
        setNewMessages(
          res.data.filter((stu) => stu.name === searchStudent)
        );
      }
    );
    
  }

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
        {/* <IconButton>Search</IconButton> */}
        <IconButton onClick={handleSearch} >Filters</IconButton>
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
