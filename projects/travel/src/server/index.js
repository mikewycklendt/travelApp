var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const Cookies = require('js-cookie')

const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

dotenv.config();

GEONAMES_API = process.env.GEONAMES_ID
darksky_key = process.env.DARKSKY_KEY
pixabay_key = process.env.PIXABAY_KEY
console.log(pixabay_key )
console.log(darksky_key)
console.log(GEONAMES_API);
console.log(`Your API key is ${process.env.API_ID}`);

console.log(__dirname)

projectData = {
                zero: {
                    date: '',
                    place: ''
                },
                one: {
                    coord: 
                        {
                            lat: '', 
                            lng: ''
                        }, 
                    date: '', 
                    place: '',
                    location1: '', 
                    location2: ''
                }, 
                two: {
                    month: '', 
                    day: '', 
                    year: ''
                }, 
                three: {
                    high: '', 
                    low: '', 
                    forecast: ''
                },
                four: {
                    image: ''
                }};

place = {};

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

app.route('/results')
    .get(getResults)
    .post(getResults)


function getResults(req, res){
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
    res.status(200).json(projectData);
};

const port = 8001;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on ${port}`)
})



app.post('/postData', getData);

function getData(req, res){
    console.log(req.body.data);
    place = req.body.data.place;
    date = req.body.data.date;
    projectData.one.date = date;
    projectData.one.place = place;
    projectData.zero.date = date;
    projectData.zero.place = place;
    place_split = place.split(", ")
    location1 = place_split[0]
    location2 = place_split[1]
    projectData.one.location1 = location1
    projectData.one.location2 = location2
    console.log(projectData)
    console.log(date)
    console.log(place)
    geonames(place, GEONAMES_API)
    .then(async function(data) {
        if(data.totalResultsCount === 'Invalid Place'){
            projectData.zero.place = 'Invalid Place'
            projectData = data
            console.log(projectData)
        }
        lng = data.geonames[1].lng
        lat = data.geonames[1].lat
        console.log(lng)
        console.log(lat)
        projectData.one.coord.lat = lat;
        projectData.one.coord.lng = lng;
        console.log(projectData)
        date_split = date.split("/")
        console.log(date_split)
        month = date_split[0]
        day = date_split[1]
        year = date_split[2]
        console.log(month)
        console.log(day)
        console.log(year)
        projectData.two.month = month;
        projectData.two.day = day;
        projectData.two.year = year;
        console.log(projectData)
        
        data = projectData
        return data
    })
    .then(async function(data){
        console.log(data)
        lat = data.one.coord.lat
        lng = data.one.coord.lng
        date = data.one.date
        console.log(lat)
        console.log(lng)
        console.log(date)
        date_split = date.split("/")
        console.log(date_split)
        month = date_split[0]
        day = date_split[1]
        year = date_split[2]
        console.log(month)
        console.log(day)
        console.log(year)
        data.two.month = month
        data.two.day = day
        data.two.year = year
        console.log(data)
        data = projectData
        return data    
    })
    .then(async function(data){
        lat = data.one.coord.lat
        lng = data.one.coord.lng
        month = data.two.month
        day = data.two.day
        year = data.two.year
        key = darksky_key
        data = projectData
        const res = await fetch(`https://api.darksky.net/forecast/${darksky_key}/${lat},${lng},${year}-${month}-${day}T12:00:00?exclude=currently,flags`)
        try {
            let data = await res.json()
            console.log(data)
            console.log(data.daily.data)
            console.log(projectData)
            results = data.daily.data[0]
            console.log(results)
            projectData.three.high = results.temperatureHigh
            projectData.three.low = results.temperatureLow
            projectData.three.forecast = results.summary
            data = projectData
            console.log(data)
            return data
        } catch(error) {
            console.log(error)
        }
    })
    .then(async function(data){
        term1 = data.one.location1
        term2 = data.one.location2
        key = pixabay_key
        location = projectData.zero.place
        location_split = location.split(' ');

        let term = ''
        let i = 0;
        if (location_split.length > 1) {
            for (i = 0; i < location_split.length; i++) {
                range = location_split.length - 1;
                if (i < range) {
                    term += location_split[i] + '+';
                } else {
                    term += location_split[i];
                }
                
            };
            //nocomma = term.split(',')
            //if (nocomma.length > 1) {
            //    for ( i = 0; i < nocomma.length; i ++) {
            //        term += nocomma[i]
            //    }
            //}
        } else {
            term = location;
        }

        if (location_split.length > 1) {
            let nocomma = term.split(',')
            if (nocomma.length > 1) {
                term = '';
                for (i = 0; i < nocomma.length; i++) {
                    term += nocomma[i]
                }
            }
        } else {
            term = location
        }

        projectData.one.location2 = term;

        console.log(term)
        const res = await fetch(`https://pixabay.com/api/?key=${key}&q=${term}&image_type=photo&per_page=3&category=places`)
        try {
            let data = await res.json()
            console.log(data)
            image = data.hits[0].largeImageURL
            console.log(image)
            projectData.four.image = image
            data = projectData
            console.log(data)
            console.log(projectData)
            console.log(term)
            console.log(location_split)
            return data
        } catch(error) {
            console.log(error)
        }
    })
    .then(async function(data){
        projectData = data
        res.send(projectData)
    })
};

    //console.log(projectData)
    //lat = projectData.one.coord.lat;
    //lng = projectData.one.coord.lng;
    //month = projectData.two.month;
    //day = projectData.two.day;
    //year = projectData.two.year;
    //darkskyFetch(lat, lng, month, day, year, darksky_key)

    


    //textapi.sentiment({
    //    'url': url
    //}, function(error, response) {
    //    if (error === null) {
    //        projectData = response;
    //        console.log(projectData);
    //        res.send(projectData)
    //    }else{
    //        projectData = {polarity: 'enter a valid URL', polarity_confidence: 'enter a valid URL', subjectivity: 'enter a valid URL', subjectivity_confidence: 'enter a valid URL'}
    //        console.log(error)
    //        res.send(projectData)
    //    }
    //})


const geonames = async (place, id) => {
    const res = await fetch(`http://api.geonames.org/searchJSON?name=${place}&username=${id}`)
    try {
        const data = await res.json()
        console.log(data)
        if(data.totalResultsCount === 0){
            projectData.zero.date = 'Invalid Place'
            projectData.zero.place = 'Invalid Place'
            projectData.three.high = 'Invalid Place'
            projectData.three.low = 'Invalid Place'
            projectData.three.forecast = 'Invalid Plsvr'
            projectData.four.image = 'Invalid Place'
            data.totalResultsCount = 'Invalid Place'
        }
        console.log(data)
        return data
    } catch(error) {
        console.log(error)

        return data
    }
};

//function geonames(place, id){
//    fetch(`http://api.geonames.org/searchJSON?name=${place}&username=${id}`)
//    .then(response => response.json())
//    .then(data => {
//        console.log(data)
//        lng = data.geonames[1].lng
//        lat = data.geonames[1].lat
//        console.log(lng)
//        console.log(lat)
//        projectData.one.coord.lat = lat;
//        projectData.one.coord.lng = lng;
//        console.log(projectData)
//        console.log(projectData)
//        lat = projectData.one.coord.lat;
//        lng = projectData.one.coord.lng;
//        date = projectData.one.date;
//        console.log(lat)
//        console.log(lng)
//        date_split = date.split("/")
//        console.log(date_split)
//        month = date_split[0]
//        day = date_split[1]
//        year = date_split[2]
//        console.log(month)
//        console.log(day)
//        console.log(year)
//        projectData.two.month = month;
//        projectData.two.day = day;
//        projectData.two.year = year;
//        console.log(projectData)
//    })
//    .catch(error => error)
//}

const darkskyFetch = async (data) => {
    console.log(data)
    lat = data.one.coord.lat
    lng = data.one.coord.lng
    date = data.one.date
    console.log(lat)
    console.log(lng)
    console.log(date)
}

//function darkskyFetch(lat, lng, month, day, year, darksky_key){
//    fetch(`https://api.darksky.net/forecast/${darksky_key}/${lat},${lng},${year}-${month}-${day}`)
//    .then(response => response.json())
//    .then(data => {
//        console.log(data)
//    })
//    .catch(error => eerror)
//}

function preDarkSky(){
    console.log(projectData)
    lat = projectData.one.coord.lat;
    lng = projectData.one.coord.lng;
    date = projectData.one.date;
    console.log(lat)
    console.log(lng)
    date_split = date.split("/")
    console.log(date_split)
    month = date_split[0]
    day = date_split[1]
    year = date_split[2]
    console.log(month)
    console.log(day)
    console.log(year)
    darkskyFetch(lat, lng, month, day, year, darksxky_key)
}

