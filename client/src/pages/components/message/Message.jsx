import "./message.css";
import React, {useState} from "react";
// import { format } from "timeago.js";
// import { isAbsolute } from "node:path/posix";

export default function Message({ message, own, type, pausedTime }) {
  console.log(message, own, type, pausedTime, "{{}{}}")

  // console.log(message,"message")
  const [height, setHeight] = useState(150)
  const [width, setWidth] = useState(150)
  // console.log(message, "{{}{}{}}")
  // console.log(pausedTime, ")))")
  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    // alert(localStorage.getItem('admin'))
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return +minutes+':'+seconds; // Return is HH : MM : SS
}

  const handleClick = () => {
    if(height===500) {
      setHeight(150);
      setWidth(150)
    }
    else{
      setHeight(500);
      setWidth(500)
    }
    
  }

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        {type==='text' && <p className="messageText">{message}<br/>{localStorage.getItem('admin')==='true'&&<span style={{align: 'left'}}>{convertHMS(pausedTime)}</span>}</p>}
        {type==='image' && <img className="images" height={height} onClick={handleClick} width={width} src={message} /> }
        {type==='audio' && <><audio controls src={message} /> <br/>{localStorage.getItem('admin')==='true'&&<span style={{align: 'left'}}>{convertHMS(pausedTime)}</span>}</>}
        {/* {pausedTime} */}
      </div>
      {localStorage.getItem('admin')===true && alert("*") }
      {/* sdsads */}
      {/* {localStorage.getItem('admin')===true && <p>{pausedTime}</p> } */}
      {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
    </div>
  );
}

