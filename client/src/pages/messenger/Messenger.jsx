import "./messenger.css";
import Message from "../components/message/Message";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { TextField, IconButton, Grid, Fab } from "@mui/material";
import paperClip from "../common/resources/paperclip.png";
import "react-voice-recorder/dist/index.css";
import ab2str from "arraybuffer-to-string";
import useRecorder from "../components/useRecorder";
import { formatMinutes, formatSeconds } from "../utils/format-time";
import backButton from "../common/resources/back.png";
import { io } from "socket.io-client";
import MessageListing from "../users/MessageListing";

export default function Messenger({ videoId, isPaused, pausedTime, googleLoggedIn }) {
  const { recorderState, audioBlob, ...handlers } = useRecorder();
  const { recordingMinutes, recordingSeconds, initRecording, audio } = recorderState;
  const { cancelRecording, startRecording, saveRecording } = handlers; 

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [studentId, setStudentId] = useState();
  const socket = useRef();
  const [studentName, setStudentName] = useState();
  const [uploadedFile, seUploadedFile] = useState();
  const [binaryImage, setBinaryImage] = useState()
  const userId = localStorage.getItem("userId");
  const admin = localStorage.getItem("admin");

  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://class.chartr.in:8900");
    socket.current.on("getMessage", (data) => {
      console.log(data, "{{}{}}");
      // alert("4$$$")
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        type: data.type,
        pausedTime: data.pausedTime
      });
    });
    if (admin === "true") {
      setCurrentChat(true);
    }
  }, []);

  useEffect(() => {
    admin === "true"
      ? arrivalMessage &&
        arrivalMessage.sender === studentId &&
        setMessages((prev) => [...prev, arrivalMessage])
      : arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {});
  }, [userId]);

  const url = "https://class.chartr.in"
  // const url = "http://localhost:5000"
  useEffect(() => {
    const getMessages = async () => {
      try {
        let res;
        if (admin === "true") {
          res = await axios.get(
            `${url}/api/messages?profId=${userId}&videoId=${videoId}&studentId=${studentId}`
          );
        } else
          res = await axios.get(
            `${url}/api/messages?studentId=${userId}&videoId=${videoId}&profId=${"627a811f70b2eec90b51307c"}`
          );
        setMessages(res.data.messages);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, googleLoggedIn]);

  const handleAddFiles = (e) => {
    console.log("{}{}");
    console.log(e.target.files[0]);
    setNewMessage(e.target.files[0].name);
    seUploadedFile(e.target.files[0]);
    var formData = new FormData();
    formData.append("files", e.target.files[0]);
    axios
      .post(`${url}/api/add/file`, formData, {})
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(()=>{
    setNewMessage("Recorded Audio");
  }, [audio])
  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let receiverId;
    // alert("**")
    if (admin === "true") receiverId = studentId;
    else receiverId = "627a811f70b2eec90b51307c";
    let message;
    if (admin === "true") {
      message = {
        sender: userId,
        text: newMessage,
        videoId: videoId,
        studentName: localStorage.getItem("name"),
        reciver: receiverId,
        pausedTime:pausedTime,
        type: "text",
        profId: userId,
        studentId: studentId,
        audioData: "null",
        uploadedImage: null
      };
    } else {
      message = {
        sender: userId,
        text: newMessage,
        videoId: videoId,
        pausedTime:pausedTime,
        type: "text",
        reciver: receiverId,
        studentName: localStorage.getItem("name"),
        profId: "627a811f70b2eec90b51307c",
        studentId: userId,
        audioData: "null",
        uploadedImage: null
        // conversationId: currentChat._id,
      };
    }

    if (uploadedFile) {
      const data = await blobToBase64(uploadedFile)
      console.log(data, "P{P{P")
      
  //     var reader = new FileReader();
  // reader.onloadend = function() {
  //   console.log('RESULT', reader.result)
  //   message.text = reader.result
  // }
  // var op = reader.readAsDataURL(uploadedFile);
  // console.log(op, 'RESULT')
  // console.log(message.text, 'RESULT', reader)
  // let ans;
  // var reader = new FileReader();
  // reader.onloadend = function(ans) {
  //   console.log('File String:', reader.result);
  //   ans = reader.result
  //   console.log(ans, 'File String:', reader.result)
  //   /******************* for Binary ***********************/
  //   var data=(reader.result).split(',')[1];
  //    var binaryBlob = atob(data);
  //    console.log('File String:', binaryBlob);
  // }
  message.text = data.split(',')[1]
  
  // reader.then
  // reader.readAsDataURL(uploadedFile);
  // console.log(ans, "File String:")
      // console.log(uploadedFile, reader.result, "RESULT")
      message.type = "image";
      socket.current.emit("sendMessage", {
        senderId: userId,
        receiverId: receiverId,
        text: uploadedFile,
        pausedTime: pausedTime,
        type: "image",
      });
    } 
    else if(audio && newMessage==="Recorded Audio") {
      message.type = "audio";
      const data = await blobToBase64(audioBlob)
      console.log(data, "{{}}}}}}}}}}")
      message.text = data.split(',')[1]

      socket.current.emit("sendMessage", {
        senderId: userId,
        receiverId: receiverId,
        pausedTime:message.pausedTime,
        text: message.text,
        type: "audio",
      });
    }
    else {
      socket.current.emit("sendMessage", {
        senderId: userId,
        receiverId: receiverId,
        text: newMessage,
        pausedTime:message.pausedTime,
        type: "text",
      });
    }

    try {
      await axios.post(
        `${url}/api/messages`,
        message
      );
      console.log(message.audioData, "{{}{}{}}")
      setMessages([...messages, message]);
      setNewMessage("");
      // audio=false
    } catch (err) {
      console.log(err);
    }
    seUploadedFile();
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="messenger">
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <>
              {currentChat ? (
                <MessageListing
                  profId={userId}
                  videoId={videoId}
                  setCurrentChat={setCurrentChat}
                  setStudentName={setStudentName}
                  setStudentId={setStudentId}
                />
              ) : (
                <>
                  {admin === "true" && (
                    <>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Grid item>
                          <IconButton onClick={() => setCurrentChat(true)}>
                            <img eight="30" width="30" src={backButton} />
                          </IconButton>
                        </Grid>
                        <Grid item>{studentName}</Grid>
                      </Grid>
                    </>
                  )}
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        {m.type === "text" && (
                          <Message
                            message={m.text}
                            own={m.sender === userId}
                            type="text"
                            pausedTime={m.pausedTime}
                          />
                        )}
                        {m.type === "image" && (
                          <Message
                            message={"data:image/jpeg;base64," + m.text
                            }
                            // message={
                            //   typeof m.text === "string"
                            //     ? `${"class.chartr.in"}/images/` + m.text
                            //     : "data:image/jpeg;base64," +
                            //       ab2str(m.text, "base64")
                            // }
                            own={m.sender === userId}
                            type="image"
                            // pausedTime={m.pausedTime}
                          />
                        )}
                        {m.type === "audio" && <Message
                        pausedTime={m.pausedTime}
                            message={
                              "data:audio/ogg;base64," + m.text
                            }
                            own={m.sender === userId}
                            type="audio"
                          />}
                      </div>
                    ))}
                  </div>
                  <TextField
                    id="outlined-basic"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    label="Type Your Comment here"
                    fullWidth
                    variant="outlined"
                  />
                  {isPaused ? 
                  <div className="chatBoxBottom">
                    <div className="controls-container">
                      <div className="recorder-display">
                        <div className="recording-time">
                          {initRecording && (
                            <div className="recording-indicator"></div>
                          )}
                          <span>{formatMinutes(recordingMinutes)}</span>
                          <span>:</span>
                          <span>{formatSeconds(recordingSeconds)}</span>
                        </div>
                      </div>
                      <div className="start-button-container">
                        {initRecording ? (
                          <button
                            className="start-button"
                            title="Save recording"
                            disabled={recordingSeconds === 0}
                            onClick={saveRecording}
                          >
                            <FontAwesomeIcon icon={faSave} size="2x" />
                          </button>
                        ) : (
                          <button
                            title="Start recording"
                            onClick={startRecording}
                          >
                            <FontAwesomeIcon icon={faMicrophone} size="2x" />
                          </button>
                        )}
                      </div>
                    </div>
                    <label htmlFor="upload-photo">
                      <input
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={(e) => handleAddFiles(e)}
                      />
                      <Fab size="small" component="span" aria-label="add">
                        <img src={paperClip} />
                      </Fab>
                    </label>

                    <div>
                      <button className="chatSubmitButton">Add Topic</button>
                      <button
                        className="chatSubmitButton"
                        onClick={newMessage!==""&&handleSubmit}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                  : "Please Pause the video first to ask doubt" }
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
