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


let apiCall = async (url) => {
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

app.post('/postURL', getURL);

function getURL(req, res){
    console.log(req.body);
    url = req.body.data;
    console.log(url)
    apiCall(url)
}