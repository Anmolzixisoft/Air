require('./database/mysqldb');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const route = require('./routes/api.routes');

app.use(express.json());
app.use(cors());
require('dotenv').config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}`)
});

require('dotenv').config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}`)
});


app.use(route);
app.get('/', (req, res) => {
    return res.send({ message: "server is run" })
})



app.listen(process.env.PORT, () => {
    console.log("Server is up and listening on port : " + process.env.PORT);
});