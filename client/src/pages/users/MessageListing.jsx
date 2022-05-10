import React, { useState, useEffect } from "react";
import { Paper, Grid, TextField, Button } from "@mui/material";
// import * as React from 'react';

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";

import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Axios from "axios";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const options = [
  "Search By Student Name",
  "Search By Topic",
  "Search BY Message Time",
  // "Hide all notification content",
];

const MessageListing = ({
  profId,
  videoId,
  setStudentId,
  setCurrentChat,
  setStudentName,
}) => {
  const [newMessages, setNewMessages] = useState();
  const [searchStudent, setSearchStudent] = useState();
  const [optionValue, setOptionValue] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chooseFilter, setChooseFilter] = useState();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [searchTopic, setSearchTopic] = React.useState(0);
  const [age, setAge] = React.useState("");
  const userId = localStorage.getItem("userId");


  const handleChange = (event) => {
    setAge(event.target.value);
  };
  

// foo();

  const handleRemoveFilter = () => {
    setChooseFilter(false);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("**sadsd")
    console.log(event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    console.log(e.target.value, "::");
    console.log(anchorEl, "::");
    console.log(optionValue, "::");

    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setChooseFilter(true);
    setAnchorEl(null);
  };
  const url = "http://class.chartr.in:5000";
  // const url = "http://localhost:5000"
  useEffect(() => {
    Axios.get(`${url}/api/get/users?profId=${profId}&videoId=${videoId}`).then(
      (res) => {
        // if(searchStudent)
        setNewMessages(res.data);
      }
    );
  }, []);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleMsgClick = (mes) => {
    setStudentId(mes.id);
    setStudentName(mes.name);
    setCurrentChat(false);
  };
  console.log(newMessages, searchStudent, "++");

  const handleSearch = (e, ind) => {
    Axios.get(`${url}/api/get/users?profId=${profId}&videoId=${videoId}`).then(
      (res) => {
        console.log(res.data)
        // if(searchStudent)
        if(ind===1) setNewMessages(res.data.filter((stu) => stu.name === searchStudent));
        if(ind===2) setNewMessages(res.data.filter((top) => top.topic === searchTopic));
        let selectedStudent = [];
        if(ind===3) {
          res.data.map(user=>{
            selectedStudent.push(user.id);
            // axios.get(`${url}/api/messages?studentId=${userId}&videoId=${videoId}&profId=${"620e7f3e9135ef9f29cf75a3"}`).then(res=>)
          })
          axios.post(`${url}/api/timefilter`, {time: age, selectedStudent: selectedStudent}).then(res=>setNewMessages(res.data))
        }
      }
    );
  };

  const mmmm = (e) => {
    console.log(e.target, ":::{}");
  };


  return (
    <div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        {/* <IconButton>Search</IconButton> */}

        {chooseFilter ? (
          <>
            {selectedIndex === 1 && (
              <>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      id="outlined-basic"
                      onChange={(e) => setSearchStudent(e.target.value)}
                      value={searchStudent}
                      label="Search Student"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={(e)=>handleSearch(e, 1)} >Search</Button>
                  </Grid>
                  
                  <Grid item>
                    <Button onClick={handleRemoveFilter}>Remove</Button>
                  </Grid>
                </Grid>
              </>
            )}
            {selectedIndex === 2 && (
              <>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                <TextField
                id="outlined-basic"
                onChange={(e) => setSearchTopic(e.target.value)}
                value={searchTopic}
                label="Search Student"
                fullWidth
                variant="outlined"
              />
                </Grid>
                <Grid item>
                  <Button onClick={(e)=>handleSearch(e, 2)}>Search</Button>
                </Grid>
                
                <Grid item>
                  <Button onClick={handleRemoveFilter}>Remove</Button>
                </Grid>
              </Grid>
            </>
              
            )}
            {selectedIndex === 3 && (
              // <TextField
              //   id="outlined-basic"
              //   onChange={(e) => setSearchTopic(e.target.value)}
              //   value={searchTopic}
              //   label="Search Student"
              //   fullWidth
              //   variant="outlined"
              // />
              <>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={5}>Five Minutes</MenuItem>
                  <MenuItem value={10}>Ten Minutes</MenuItem>
                  <MenuItem value={15}>Fifteen Minutes</MenuItem>
                </Select>
              </FormControl>
                </Grid>
                <Grid item>
                  <Button onClick={(e)=>handleSearch(e, 2)}>Search</Button>
                </Grid>
                
                <Grid item>
                  <Button onClick={handleRemoveFilter}>Remove</Button>
                </Grid>
              </Grid>
            </>
              
            )}
          </>
        ) : (
          <>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Filters
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              value={optionValue}
              onChange={(e) => mmmm(e)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
                role: "lisox",
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 0}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
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
              onClick={() => handleMsgClick(mes)}
            />
          </Card>
        ))}
    </div>
  );
};

export default MessageListing;
