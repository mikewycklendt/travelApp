var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

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
})


let apiCall = async (url, res) => {
    textapi.sentiment({
        'url': url
    }, function(error, response) {
        if (error === null) {
            projectData = response;
            console.log(projectData);
        }else{
            console.log(error)
        }
    })
};

app.route('/sentiment')
    .get(getData)
    .post(getURL)


function getData(req, res){
    //JSON.stringify(projectData);
    res.status(200).json(projectData)
    console.log(projectData)
};

app.route('/')
    .get(function (req, res) {
        console.log(process.env);
        res.sendFile('dist/index.html', { root: __dirname + '/,'})
        res.status(200).json(projectData)
    })
    .post(getSentiment);

function getSentiment(req, res){
    console.log(req.body);
    projectData = req.body;
    console.log(projectData);
    res.status(200).json(projectData);
};

const port = 8000;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on ${port}`)
})



app.post('/postURL', getURL);

function getURL(req, res){
    console.log(req.body);
    url = req.body.data;
    console.log(url)
    textapi.sentiment({
        'url': url
    }, function(error, response) {
        if (error === null) {
            projectData = response;
            console.log(projectData);
            res.send(projectData)
        }else{
            projectData = {polarity: 'enter a valid URL', polarity_confidence: 'enter a valid URL', subjectivity: 'enter a valid URL', subjectivity_confidence: 'enter a valid URL'}
            console.log(error)
            res.send(projectData)
        }
    })
}