var express = require('express')
const uploadroute = express.Router();
const { upload ,getdata} = require('../controllers/upload.controller.js')
const { singleUpload } = require('../middleware/multer')
uploadroute.post('/upload', singleUpload, upload)
uploadroute.get('/getdata', getdata)


module.exports = uploadroute;