const userModel = require("../models/userModel");
const Videos = require("../models/addVideo");
const Message = require("../models/message");
const multer = require('multer')
// const uuidv4 = require('uuid/v4')
// const { validationResult } = require("express-validator");
const { OAuth2Client } = require('google-auth-library');

var mongoose = require("mongoose");
const videoWatchTime = require("../models/videoWatchTime");
const message = require("../models/message");
const clientId = "325542883606-e4b5v6036u5a32siipql0b0c5ouv8i9l.apps.googleusercontent.com";
// const clientId = "325542883606-uq9ai4emg3e3r524jusu5rfgjtk8ga22.apps.googleusercontent.com";
// const clientId = "325542883606-uq9ai4emg3e3r524jusu5rfgjtk8ga22.apps.googleusercontent.com";
// const clientId = "353286550918-7ueoro5qciugncvj97qsrg8k89contos.apps.googleusercontent.com";

// const clientId = "353286550918-7ueoro5qciugncvj97qsrg8k89contos.apps.googleusercontent.com";
// const clientId = "325542883606-uq9ai4emg3e3r524jusu5rfgjtk8ga22.apps.googleusercontent.com";


const client = new OAuth2Client(clientId);

const login = async (req, res, next) => {
    const { token } = req.body;
    // console.log(token, "PPP")
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
    res.json({ name, email, admin: existingUser.admin, userId: existingUser._id, firstLogin: false });
  }
  else {
    try {
      // console.log(user)
        await user.save();
    } catch (error) {
        console.log(error)
    }
  
    try {
      existingUser = await userModel.findOne({ email });
    } catch (error) {
      return res.status(400).send("something went wrong");
    }
    if (existingUser) {
      res.status(201);
      res.json({ name, email, admin: existingUser.admin, userId: existingUser._id, firstLogin: true });
    }
  
  //   upsert(users, { name, email, picture });
    // res.status(201);
    // res.json({ name, email, admin, firstLogin: true });
  }

  
}

const addVideo = async (req, res, next) => {
  const {title, topic, typeOfVideo, subTopic, videoLink, videoUploader, time} = req.body;

  const video = new Videos({
    title, topic, typeOfVideo, subTopic, videoLink, videoUploader, time
  })

  try {
    await video.save();
    res.status(201);
    res.json({ title, subTopic });
  } catch (error) {
    res.status(500);
    console.log(error)
  }

  
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
  const {sender, videoId, reciver, text, topic, subTopic, studentId, profId, studentName, type, audioData, pausedTime, uploadedImage} = req.body
  // console.log(audioData)
  console.log(text)
  // console.log(sender, videoId, reciver, text, topic, subTopic)

  const newMessage = new Message({
    sender, videoId, status: "Not Seen", reciver, text, topic, subTopic, studentId, profId, studentName, type, audioData, pausedTime, uploadedImage
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
    if(!filteredMessages.find((item)=>item.id===mes.studentId) && videoId===mes.videoId) {
      // console.log("***")
      // if()
      let obj = {};
      obj.id = mes.studentId;
      obj.name = mes.studentName;
      obj.subTopic = mes.subTopic
      filteredMessages.push(obj)
    };
  })


  res.json(filteredMessages)
}

const addFiles = (req, res, next) => {
  const newpath = "./files/";
  const file = req.files.files;
  const filename = file.name;
  // console.log(filename);
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      console.log(err)
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
  
// console.log(filename, "{{}}")
// console.log("***")
// upload.single('profileImg');

}

const saveVideoTime = async (req, res, next) => {
  const { userId, videoId, time, profId } = req.body;
  // console.log(userId, videoId, time, profId, "PPPOOO")

  let alreadyViewed;
  // console.log(profId, videoId, "{{}}")
  try {
    alreadyViewed = await videoWatchTime.find({$and: [{videoId}, {userId}]})
  } catch (error) {
    console.log(error)
  }
  console.log(alreadyViewed)
  if(alreadyViewed.length===0) {
    try {
      // console.log("))((")
      const watchTime = new videoWatchTime({
        userId, videoId, time, profId
      })
      await watchTime.save({userId, videoId, time, profId})
    } catch (error) {
      console.log(error)
    }
  }
  else {
    try {

      // console.log("))((21")
      if(time>alreadyViewed[0].time) {
        const id = alreadyViewed.userId
        console.log(id)
        const result = await videoWatchTime.updateOne({userId: id}, {$set: {time: time}})
        // alreadyViewed[0].time = time
      }

      res.send("done")

      // await alreadyViewed[0].save({})
    } catch (error) {
      console.log(error)
    }
    // res.send()
  }

}

const videoAnalytics = async (req, res, next) => {
  const {videoId, userId, profId} = req.body;
  let analysis;
  console.log(profId, videoId, "{{}}")
  try {
    analysis = await videoWatchTime.find({$and: [{videoId}, {profId}]})
  } catch (error) {
    console.log(error)
  }

  console.log(analysis)
  res.json({analysis})
}

const getAllMessages = async (req, res, next) => {
  const {id} = req.query
  console.log(id)
  let allMessages;
  // console.log(profId, videoId, "{{}}")
  try {
    allMessages = await message.find({videoId: id})
  } catch (error) {
    console.log(error)
  }
  let doubtTime = []
  allMessages.forEach(time=>doubtTime.push(time.pausedTime))

  console.log(doubtTime, "{}{}")
  res.json({doubtTime})


}

exports.login = login;
exports.addVideo = addVideo;
exports.getVideos = getVideos;
exports.getOneVideo = getOneVideo;
exports.addMessages = addMessages;
exports.getMessages = getMessages;
exports.getUsers = getUsers;
exports.addFiles = addFiles;
exports.saveVideoTime = saveVideoTime;
exports.videoAnalytics = videoAnalytics;
exports.getAllMessages = getAllMessages;