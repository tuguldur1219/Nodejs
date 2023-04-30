const express = require("express");
const dotenv = require('dotenv');

dotenv.config({ path: "./config/config.env" });

const app = express();
const port = 3000
app.use(express.static(__dirname + '/'));

app.get("/", (req, res)=> {
    res.send("App Home!");
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

console.log(__dirname);
