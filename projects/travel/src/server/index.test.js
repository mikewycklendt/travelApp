import "regenerator-runtime/runtime";
import "core-js/stable";
import "fetch-mock"

const httpMocks = require('node-mocks-http');

const fetchMock = require('fetch-mock'); 

describe('getData', (data = {place: 'city, state', date: '03/19/2021'}) => {
    it('can request', async() => {
        fetchMock.once('/', {
            status: 200,
            statusText: 'OK',
            headers: {'Content-Type': 'application/json'},
            sendAsJson: true,
            body: {data}
        }, {method: 'GET'})
        
        fetch('/', {
            method: 'GET',
            body: JSON.stringify({data: 'Received Payload'}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(function(req){
            expect(req.status).toEqual(200);
            return req.json();
        })
        .then(function (json) {
            console.log(json);
            payload = json.body.data
            console.log
            expect(payload).toMatchObject(data)
            return data
        })        
        .catch((e) => console.log(e))   
    })
})

describe('geonames', (url = 'https://geonamesapi.com', geonames = {lat: 'lat', lng: 'lng'}, darksky = {high: 'high', low: 'low', forecast: 'forecast'}, 
    projectData = {
                zero: {
                    date: '03/19/2021',
                    place: 'city, state'
                },
                one: {
                    coord: 
                        {
                            lat: '', 
                            lng: ''
                        }, 
                    date: '03/19/2021', 
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
                }}, place = '', date = '', place1 = '', place2 = '', place_split = '', date_split = '', data = '', lat = '', lng = '', month = '', day = '', year = '', darksky_key = '123456789') => {

                    place = projectData.zero.place;
                    place_split = place.split(', ')
                    place1 = place_split[0]
                    place2 = place_split[1]
                    projectData.one.place = place
                    projectData.one.location1 = place1
                    projectData.one.location2 = place2
                    projectData.one.coord.lat = data.lat
                    projectData.one.coord.lng = data.lng
    it('can get coordinates', async() => {

        fetchMock.mock(url, {
            method: 'GET',
            credentials: 'same-origin',
            status: 200,
            statusText: 'OK',
            headers: {'Content-Type': 'application/json'},
            sendAsJson: true,
            body: {geonames}
        })
        fetch(url, {
            method: 'GET',
            body: JSON.stringify({data: 'Received Payload'}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(function(req){
            expect(req.status).toEqual(200);

            console.log(data)
            return req.json();
        })
        .then(function (json) {
            console.log(json);
            data = json.body.geonames;
            projectData.one.coord.lat = data.lat;
            projectData.one.coord.lng = data.lng;
            console.log(data)
            console.log(geonames)
            expect(data).toMatchObject(geonames)
            data = projectData
            return data;
        })
        .then(function(data) {
            console.log(data)
            projectData = data
            date = projectData.zero.date
            console.log(date)
            date_split = date.split("/")
            console.log(date_split)
            projectData.two.month = date_split[0];
            projectData.two.day = date_split[1]
            projectData.two.year = date_split[2];
            data = projectData
            console.log(data)
            expect(data).toMatchObject(projectData)
        })
        .catch((e) => console.log(e))
    }) 
})

describe('darksky', (darksky = {high: 'high', low: 'low', forecast: 'forecasrt'},
    projectData = {
        zero: {
            date: '03/19/2021',
            place: 'city, state'
        },
        one: {
            coord: 
                {
                    lat: 'lat', 
                    lng: 'lng'
                }, 
            date: '03/19/2021', 
            place: 'city, state',
            location1: 'city', 
            location2: 'state'
        }, 
        two: {
            month: '03', 
            day: '19', 
            year: '2021'
        }, 
        three: {
            high: '', 
            low: '', 
            forecast: ''
        },
        four: {
            image: ''
        }}, darksky_key = '123456789', data = '') => {
    it('can get forecast', async() => {
        fetchMock.mock(`https://api.darksky.net/forecast/${darksky_key}/${projectData.one.coord.lat},${projectData.one.coord.lng},${projectData.two.year}-${projectData.two.month}-${projectData.two.day}T12:00:00?exclude=currently,flags`, {
            method: 'GET',
            status: 200,
            statusText: 'OK',
            headers: {'Content-Type': 'application/json'},
            sendAsJson: true,
            body: {darksky}
        })
        fetch(`https://api.darksky.net/forecast/${darksky_key}/${projectData.one.coord.lat},${projectData.one.coord.lng},${projectData.two.year}-${projectData.two.month}-${projectData.two.day}T12:00:00?exclude=currently,flags`, {
            method: 'GET',
            body: JSON.stringify({data: 'Received Payload'}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(function(req){
            expect(req.status).toEqual(200);
            return req.json();
        })
        .then(function (json) {
            console.log(json)
            data = json.body.darksky
            expect(data).toMatchObject(darksky)
            return data
        })
        .then(function (data) {
            console.log(data)
            projectData.three.high = data.high
            projectData.three.low = data.low
            projectData.three.forecast = data.forecast
            console.log(projectData)
            data = projectData
            return data
        })
        .then(function (data) {
            expect(data).toMatchObject(projectData)
        })
        .catch((e) => console.log(e))
    })
})

describe('pixabay', (pixabay = {image: 'https://www.pixabay.com/image.jpg'},
    projectData = {
        zero: {
            date: '03/19/2021',
            place: 'city, state'
        },
        one: {
            coord: 
                {
                    lat: 'lat', 
                    lng: 'lng'
                }, 
            date: '03/19/2021', 
            place: 'city, state',
            location1: 'city', 
            location2: 'state'
        }, 
        two: {
            month: '03', 
            day: '19', 
            year: '2021'
        }, 
        three: {
            high: 'high', 
            low: 'low', 
            forecast: 'forecast'
        },
        four: {
            image: ''
        }}, pixabay_key = '123456789', data = '', key = '', term1 = '', term2 = '', term = '') => {
    it('can get forecast', async() => {

        term1 = projectData.one.location1
        term2 = projectData.one.location2
        term = term1 + '+' + term2 
        key = pixabay_key

        fetchMock.mock(`https://pixabay.com/api/?key=${key}&q=${term}&image_type=photo&per_page=3&category=places`, {
            method: 'GET',
            status: 200,
            statusText: 'OK',
            headers: {'Content-Type': 'application/json'},
            sendAsJson: true,
            body: {pixabay}
        })
        fetch(`https://pixabay.com/api/?key=${key}&q=${term}&image_type=photo&per_page=3&category=places`, {
            method: 'GET',
            body: JSON.stringify({data: 'Received Payload'}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(function(req){
            expect(req.status).toEqual(200);
            return req.json();
        })
        .then(function (json) {
            console.log(json)
            data = json.body.pixabay
            expect(data).toMatchObject(pixabay)
            return data
        })
        .then(function (data) {
            console.log(data)
            projectData.four.image = data.image
            console.log(projectData)

        })
        .catch((e) => console.log(e))
    })
})