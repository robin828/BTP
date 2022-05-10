const express = require('express');
const route = express.Router();
const {login, addVideo, getVideos, getOneVideo, addMessages, getMessages, getUsers, addFiles, saveVideoTime, videoAnalytics, getAllMessages} = require('../controller/user');
route.post('/login', login);
route.post('/add/video', addVideo);
route.get('/videos', getVideos);
route.get('/video', getOneVideo);
route.get('/video/messages', getAllMessages);
route.post('/messages', addMessages);
route.get('/messages', getMessages);
route.get('/get/users', getUsers)
route.post('/add/file', addFiles)
route.post('/save/videotime', saveVideoTime)
route.post('/video/analytics', videoAnalytics)

module.exports = route;