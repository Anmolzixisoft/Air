var express = require('express')
const apiRouter = express.Router();

const uploadexel = require('./upload.route')

apiRouter.use('/api', uploadexel);

module.exports = apiRouter;