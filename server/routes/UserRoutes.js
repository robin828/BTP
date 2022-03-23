const express = require('express');
const route = express.Router();
const {login, addVideo, getVideos, getOneVideo, addMessages, getMessages, getUsers, addFiles} = require('../controller/user');
route.post('/login', login);
route.post('/add/video', addVideo);
route.get('/videos', getVideos);
route.get('/video', getOneVideo);
route.post('/messages', addMessages);
route.get('/messages', getMessages);
route.get('/get/users', getUsers)
route.post('/add/file', addFiles)

module.exports = route;