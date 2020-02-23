var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');




const app = express()

app.use(express.static('dist'))

dotenv.config();
console.log(`Your API key is ${process.env.API_ID}`);


console.log(__dirname)

projectData = {};

url = {};

const AYLIENTextAPI = require('aylien_textapi');

let textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY,
    url: url
});


let apiCall = async (url) => {
    textapi.sentiment({
    }, function(error, response) {
        if (error === null) {
            let data = response.json();
            console.log(data);
            projectData = data;
        }else{
            console.log(error)
        }
    })
};



app.route('/')
    .get(function (req, res) {
        console.log(process.env);
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

app.get('/postURL', getURL);

function getURL(req, res){
    res.send(url)
    console.log(url)
    apiCall(url)
}