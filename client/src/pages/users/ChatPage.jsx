import { Typography, Grid, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import Messenger from "../messenger/Messenger";
import ChatWindow from "./ChatWindow";
import Axios from "axios";
import YouTube from "react-youtube";
import axios from "axios";
import { useGoogleLogin } from "react-google-login";
import { formatTime } from "../utils/format-time";
import useTimer from "../components/useTimer";
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom'
// import { useParams } from "react-router-dom";



const ChatPage = () => {
  const [videoUrl, setVideoUrl] = React.useState("");
  const [isPaused, setIsPaused] = React.useState(false);
  const [pausedTime, setPausedTime] = React.useState(0);
  const { timer, isActive, isPause, handleStart, handlePause, handleResume, handleReset, setTimer } = useTimer(0)
  const history = useHistory()


  const checkElapsedTime = (e) => {

    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    // console.log(formatTime(Math.round(currentTime)), "{{}}{{}})))")
    setTimer(Math.round(currentTime))
    handlePause();
    setIsPaused(true);
    // console.log(currentTime, ")))");
    setPausedTime(currentTime);
  };

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };


  const id = useParams().id;
  const param = id ? id : "";
  const [video, setVideo] = React.useState();
  const ref = useRef();
  const url = "http://class.chartr.in:5000";
  // const url = "http://localhost:5000"
  React.useEffect(() => {
    Axios.get(`${url}/api/video/?id=${param}`).then((res) => {
      setVideo(res.data.video)
      setVideoUrl(
        res.data.video.videoLink.split("v=")[1].split("&")[0]
      );
    });
      
    
  }, []);

  const clientId = "325542883606-uq9ai4emg3e3r524jusu5rfgjtk8ga22.apps.googleusercontent.com";
  const [googleLoggedIn, setGoogleLoggedIn] = useState(false);


  // const id = useParams().id;
  // const param = id ? id : "";
  const onFailure = (result) => {
    // console.log("googleData", result);
    // alert(result);
  };
  // const url = "http://class.chartr.in:5000"
  // const url = "http://localhost:5000"

  const handlePlay = () => {
    handleStart();
  }

//   function foo() {

//     console.log("**", timer)
    

//     setTimeout(foo, 5000);
// }
// foo()
// setTimeout(console.log("**", timer), 5000);

if(timer%60===0) {
  axios.post(`${url}/api/save/videotime`, {
    time: timer,
    videoId: param,
    userId: localStorage.getItem('userId'),
    profId: "620e7f3e9135ef9f29cf75a3"
  })
  console.log("**", timer)
}

  
  const onSuccess = async (googleData) => {
    axios.post(`${url}/api/login`, {
        token: googleData.tokenId,
      }).then(res=>{
        console.log(res)
        setGoogleLoggedIn(res.data.name)
        localStorage.setItem('admin', res.data.admin)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('userId', res.data.userId)
      });
        // history.push('/user/login')
  };
  
const { signIn } = useGoogleLogin({
    onSuccess,
      onFailure,
      clientId,
      // isSignedIn: true,
      accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <div>
      <div style={{ margin: "2rem" }}>
        <Typography
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#344663",
          }}
        >
          Monday Lecture - 28/01/2022  - <span onClick={() => {
                    history.push(
                        `/videos/analytics/${param}`
                    )
                }} >Analysis</span>
        </Typography>{" "}
      </div>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        // spacing={20}
      >
        <Grid item>
          <YouTube
            videoId={videoUrl}
            width="560"
            height="715"
            containerClassName="embed embed-youtube"
            onPause={(e) => checkElapsedTime(e)}
            onPlay={handlePlay}
            opts={opts}
          />
          {formatTime(timer)}
        </Grid>
        {localStorage.getItem("email") || googleLoggedIn ? (
          <Grid item style={{ width: "400px" }}>
            {" "}
            <Messenger
              isPaused={isPaused}
              pausedTime={pausedTime}
              videoId={param}
              googleLoggedIn={googleLoggedIn}
            />{" "}
          </Grid>
        ) : (
          <>
          <div style={{textAlign: 'center'}} >
          <Typography>Please Login To Ask Doubt</Typography>
            <Button onClick={signIn}>Login</Button>
          </div>
          </>
        )}
      </Grid>
    </div>
  );
};

export default ChatPage;
