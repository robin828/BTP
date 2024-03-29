import React, { useState } from "react";
import { Typography, Grid, Button, TextareaAutosize } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import MultipleValueTextInput from "react-multivalue-text-input";
import "./addVideoForm.css";
import { useHistory } from "react-router";

const AddVideoForm = () => {
  const [title, setTitle] = useState();
  const [topic, setTopic] = useState();
  const [typeOfVideo, setTypeOfVideo] = useState();
  const [time, setTime] = useState();
  const [subTopic, setSubTopic] = useState([]);
  const [videoLink, setVideoLink] = useState();
  const history = useHistory();
  const type = [
    {
      value: "Informative",
      label: "Informative",
    },
    {
      value: "Course Lecture",
      label: "Course Lecture",
    },
    {
      value: "Specific Topic",
      label: "Specific Topic",
    },
  ];
  console.log(subTopic);
  const url = "https://class.chartr.in/"
  // const url = "http://localhost:5000/";

  const handleClick = () => {
    const payload = {
      title,
      topic,
      typeOfVideo,
      subTopic,
      videoLink,
      time,
      videoUploader: localStorage.getItem("userId"),
    };
    Axios.post(`${url}api/add/video`, payload).then((res) => {
      if(res.status === 201) {
        history.push('/videos')
        console.log(res.data);
      }
    });
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography
            style={{
              fontFamily: "Montserrat",
              fontSize: 40,
              fontWeight: "bold",
              margin: "3rem",
              color: "252B42",
            }}
          >
            Upload Video
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "25ch",
                    marginBottom: "1.5rem",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    label="Video Title"
                    id="outlined-size-small"
                    // defaultValue="Small"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Video Title"
                    size="small"
                  />
                </div>
              </Box>
            </Grid>
            <Grid item>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "25ch",
                    marginBottom: "1.5rem",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    label="Topic of the Video"
                    id="outlined-size-small"
                    // defaultValue="Small"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Topic of the Video"
                    size="small"
                  />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    // id="outlined"
                    select
                    label="Select"
                    value={typeOfVideo}
                    onChange={(e) => setTypeOfVideo(e.target.value)}
                    helperText="Please select type"
                  >
                    {type.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </Box>
            </Grid>
            <Grid item >
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  {/* <MultipleValueTextInput
                  
                    onItemAdded={(item, allItems) =>
                      setSubTopic([...subTopic, item])
                    }
                    onItemDeleted={(item, allItems) =>
                      setSubTopic((item) =>
                        subTopic.filter((it, i) => item !== it)
                      )
                    }
                    // label="Sub-Topic"
                    // values={["default value"]}
                    name="item-input"
                    placeholder="Sub-Topic"
                  /> */}
                  <TextField
                    label="Duration of Video"
                    id="outlined-size-small"
                    // defaultValue="Small"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Duration of the Video in minutes"
                    size="small"
                  />
                  {/* <TextField
                    // id="outlined-select-currency"
                    select
                    label="Select"
                    value={subTopic}
                    onChange={(e)=>setSubTopic(e.target.value)}
                    helperText="Please add Sub topic"
                  >
                    {type.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField> */}
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {/* <Box
      sx={{
        width: 600,
        height: 100,
        maxWidth: '100%',
        maxHeight: '100%',
       
      }}
    >
      <TextField style={{height: 100}} fullWidth label="Something Specific to video" id="fullWidth" />
    </Box>
  
  */}
          {/* <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Youtube Video Link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            //   defaultValue="" style={{fontFamily: 'Montserrat', fontSize: 40, fontWeight: 'bold', margin: '3rem', color: "252B42"}}
            style={{
              width: 650,
              height: 75,
              fontFamily: "Montserrat",
              color: "252B42",
              fontSize: 20,
              margin: "1.5rem",
            }}
          /> */}
          <MultipleValueTextInput
                  
                    onItemAdded={(item, allItems) =>
                      setSubTopic([...subTopic, item])
                    }
                    onItemDeleted={(item, allItems) =>
                      setSubTopic((item) =>
                        subTopic.filter((it, i) => item !== it)
                      )
                    }
                    // label="Sub-Topic"
                    // values={["default value"]}
                    name="item-input"
                    placeholder="Sub-Topic"
                  />
        </Grid>
        <Grid item>
          {/* <Box
      sx={{
        width: 600,
        height: 100,
        maxWidth: '100%',
        maxHeight: '100%',
       
      }}
    >
      <TextField style={{height: 100}} fullWidth label="Something Specific to video" id="fullWidth" />
    </Box>
  
  */}
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Youtube Video Link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            //   defaultValue="" style={{fontFamily: 'Montserrat', fontSize: 40, fontWeight: 'bold', margin: '3rem', color: "252B42"}}
            style={{
              width: 650,
              height: 75,
              fontFamily: "Montserrat",
              color: "252B42",
              fontSize: 20,
              margin: "1.5rem",
            }}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleClick}
            variant="contained"
            style={{
              background: "#FA5523",
              margin: "1rem",
              fontWeight: "800",
              fontSize: 14,
              borderRadius: "10px",
            }}
          >
            Upload Video
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddVideoForm;
