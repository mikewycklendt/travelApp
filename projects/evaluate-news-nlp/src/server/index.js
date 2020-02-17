var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
const AYLIENTextAPI = require('aylien_textapi');
const textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

dotenv.config();

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

projectData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html', { root: __dirname + '/,'})
})

const port = 8000;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on ${port}`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
