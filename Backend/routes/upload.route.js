var express = require('express')
const uploadroute = express.Router();
const { upload } = require('../controllers/upload.controller')
uploadroute.post('/upload', upload)

module.exports = uploadroute;