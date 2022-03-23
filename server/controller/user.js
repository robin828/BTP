const userModel = require("../models/userModel");
const Videos = require("../models/addVideo");
const Message = require("../models/message");
const multer = require('multer')
// const uuidv4 = require('uuid/v4')
// const { validationResult } = require("express-validator");
const { OAuth2Client } = require('google-auth-library');

var mongoose = require("mongoose");
const clientId = "325542883606-uq9ai4emg3e3r524jusu5rfgjtk8ga22.apps.googleusercontent.com";

const client = new OAuth2Client(clientId);

const login = async (req, res, next) => {
    const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const { name, email } = ticket.getPayload();

  const user = new userModel({
    name,
    email,
    token,
    admin: false
  });

  const admin=false;
  let existingUser;
  try {
    existingUser = await userModel.findOne({ email });
  } catch (error) {
    return res.status(400).send("something went wrong");
  }
  if (existingUser) {
    res.status(201);
    res.json({ name, email, admin: existingUser.admin, userId: existingUser._id });
  }
  else {
    try {
      console.log(user)
        await user.save();
    } catch (error) {
        console.log(error)
    }
  
  
  //   upsert(users, { name, email, picture });
    res.status(201);
    res.json({ name, email, admin, userId: _id });
  }

  
}

const addVideo = async (req, res, next) => {
  const {title, topic, typeOfVideo, subTopic, videoLink} = req.body;

  const video = new Videos({
    title, topic, typeOfVideo, subTopic, videoLink
  })

  try {
    await video.save();
  } catch (error) {
    console.log(error)
  }

  res.status(201);
    res.json({ title, topic });
}

const getVideos = async (rea, res, next) => {

  let videos;

  try {
    videos = await Videos.find({});
  } catch (error) {
    console.log(error)
  }

  res.json(videos);
}

const getOneVideo = async (req, res, next )=> {
  const {id} = req.query
  // console.log(id)

  let video;

  try {
    video = await Videos.findById({_id: id})
  } catch (error) {
    console.log(error)
  }

  // console.log(video)

  res.json({video})
}

const addMessages = async (req, res, next) => {
  const {sender, videoId, reciver, text, topic, subTopic, studentId, profId, studentName, type, audioData, pausedTime} = req.body
  console.log(audioData)
  // console.log(sender, videoId, reciver, text, topic, subTopic)

  const newMessage = new Message({
    sender, videoId, status: "Not Seen", reciver, text, topic, subTopic, studentId, profId, studentName, type, audioData, pausedTime
  })

  // console.log(newMessage)

  try {
    await newMessage.save();
  } catch (error) {
    console.log(error)
  }

  res.send("Success")

}

const getMessages = async (req, res, next) => {
    const {videoId, studentId, profId} = req.query;
    // console.log(studentId, videoId, profId);
    // console.log(userId, videoId, "{{}")
    let messages;
    try { 
      if(profId) messages = await Message.find({$and: [{studentId}, {videoId}, {profId}]})
      else messages = await Message.find({$and: [{studentId}, {videoId}, {studentId}]})
      

      // console.log(messages)
    } catch (error) {
      console.log(error)
    }
    res.json({messages})
}

const getUsers = async (req, res, next) => {
  const { profId, videoId } = req.query;
  let unSeenMessages;
  // console.log(profId, videoId, "{{}}")
  try {
    unSeenMessages = await Message.find({$and: [{profId}, {status: "Not Seen"}]})
  } catch (error) {
    console.log(error)
  }
  let filteredMessages = [];

  unSeenMessages.forEach((mes)=>{
    console.log(mes, '{{}}', videoId)
    // console.log(mes.studentId)

    if(!filteredMessages.find((item)=>item.id===mes.studentId) && videoId===mes.videoId) {
      // console.log("***")
      // if()
      let obj = {};
      obj.id = mes.studentId;
      obj.name = mes.studentName;
      filteredMessages.push(obj)
    };
  })


  res.json(filteredMessages)
}

const addFiles = (req, res, next) => {
  const newpath = "./files/";
  const file = req.files.files;
  const filename = file.name;
  console.log(filename);
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      console.log(err)
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
  
console.log(filename, "{{}}")
console.log("***")
// upload.single('profileImg');

}




exports.login = login;
exports.addVideo = addVideo;
exports.getVideos = getVideos;
exports.getOneVideo = getOneVideo;
exports.addMessages = addMessages;
exports.getMessages = getMessages;
exports.getUsers = getUsers;
exports.addFiles = addFiles;