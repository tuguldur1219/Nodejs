const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config({ path: "./config/config.env" });
const {init} = require ('./db')
const routes = require('./books-api')
const cors = require('cors');
const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
app.use(routes)
app.use(cors());

init().then(() => {
    console.log(`Starting Main Server on ${process.env.PORT} port`)
    app.listen(3000)
})
