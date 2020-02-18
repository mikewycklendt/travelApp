var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
const AYLIENTextAPI = require('aylien_textapi');


dotenv.config();

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

projectData = {};

app.route('/')
    .get(function (req, res) {
        res.sendFile('dist/index.html', { root: __dirname + '/,'})
    })
    .post(getSentiment);

function getSentiment(req, res){
    console.log(req.body);
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
};

const port = 8000;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on ${port}`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/sentiment', getData);

function getData(req, res){
    res.send(projectData)
    console.log(projectData)
};

