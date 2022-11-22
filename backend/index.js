require('dotenv').config()
const express = require("express");
var cors = require('cors')
var app = express();
const ytdl = require("ytdl-core");
// OUR ROUTES WILL GO HERE
app.use(cors())

console.log("PORT: ", process.env.PORT)
app.use(express.json())

const port = process.env.PORT || 8000

console.log("In Index.js")
app.get('/', async (req, res) => {
    console.log("In get /")
    res.json("Uwu!!")
})
app.get('/download', async (req, res) => {
    console.log("In get /download")
    const v_id = req.query.url.split('v=')[1];
    console.log("req: ", req.query.url)
    const info = await ytdl.getInfo(req.query.url);
    // console.log(info.formats)
    res.json(info.formats)
})

app.get('*', (req, res) => {
    res.json("Bad request")
})

app.listen(port, () => {
    console.log("Server is running on http://localhost:8000");
});