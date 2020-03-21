# Travel App Project

## Installed Packages:

### Production:

1. cors 2.8.5
2. core-js 3.6.4
3. dotenv 8.2.0
4. express 4.17.1
5. fetch-mock 9.1.0
6. node-fetch 2.6.0
7. regenerator-runtime 0.13.3
8. webpack 4.41.6
9. webpack-cli 3.3.11
10. file-loader 5.1.0
11. html 1.0.0
12. js-cookie 2.2.1
13. loader 2.1.1
14. node-mocks-http 1.8.1

### Development:

1. @babel/core 7.8.4
2. @babel/preset-env 7.8.4
3. babel-loader 8.0.6
4. clean-webpack-plugin 3.0.0
5. css-loader 3.4.2
6. html-webpack-plugin 3.2.0
7. jest 25.1.0
8. mini-css-extract-plugin 0.9.0
9. node-sass 4.13.1
10. optimize-css-assets-webpack-plugin 5.0.3
11. sass-loader 8.0.2
12. style-loader 1.1.3
13. terser-webpack-plugin 2.3.5
14. webpack-dev-server 3.10.3
15. workbox-webpack-plugin 5.0.0

## Key Functions:
 
### formHandler.js

```
document.getElementById('generate').addEventListener('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault()

    //event.preventDefault()

    // check what text was put into the form field
    let place = document.getElementById('place').value
    let date = document.getElementById('date').value
    postData('/postData', {place: place, date: date})
    .then(updateUI)

};
```

Adds event listener to save trip button.  Gets place and date4 values.  Calls the postData function which sends the place and date data to the /postData route on the server where the APIs are called.

### postData.js

```
let postData = async(url = '', data = {})=>{
    console.log(data);
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify( { data} ),
    });
    try {
        return data
    }catch(error){
        console.log("error", error);
    }
}
```

Async function.  Takes the data sent from formHandler.js and sends a post request to the /postData route.

### updateUI.js

```
const Cookies = require('js-cookie');

let datediff = function (first, second){
    return Math.round((second - first)/(1000*60*60*24))
}
const updateUI = async () =>{
    const res = await fetch('/results');
    console.log(res);
    try {
        allData = await res.json();
        console.log(allData)
        console.log(allData)

        let month = allData.two.month
        let day = allData.two.day
        let year = allData.two.year

        let date = new Date(year, month - 1, day )

        var today = new Date()

        let daysUntil = datediff(today, date)
        
        console.log(daysUntil)

        console.log(today)
        Cookies.set('save', 'saved', {expires: 365});
        Cookies.set('date', allData.zero.date, {expires: 365});
        Cookies.set('place', allData.zero.place, {expires: 365});
        Cookies.set('high', allData.three.high, {expires: 365});
        Cookies.set('low', allData.three.low, {expires: 365});
        Cookies.set('forecast', allData.three.forecast, {expires: 365});
        Cookies.set('image', allData.four.image, {expires: 365});
        Cookies.set('daysUntil', daysUntil)
        let save = Cookies.get('save');
        console.log(save)
        document.getElementById("location").textContent = 'My trip to: ' + allData.zero.place;
        document.getElementById("time").textContent = 'Departing: ' + allData.zero.date;
        document.getElementById("daysUntil").textContent = allData.zero.place + ' is ' + daysUntil + ' days away.'
        document.getElementById("high").textContent = 'High - ' + allData.three.high + ', Low - ' + allData.three.low ;
        document.getElementById("forecast").textContent = allData.three.forecast;
        document.getElementById("image").innerHTML = '<img src="' + allData.four.image + '">';
        return allData;
    }catch(error){
        console.log(error)
        alert('Please Enter a Valid Date and Time')
    }
};
```

Create a function for calculating the time from now to date of trip,  updateUI is an async function.  Fetches the data from the /results route.  Calculates the number of days until the trip and stores it in the daysUntil variable.  Sets cookies for all the data so it shows up when the user comes back to the page.  Updates the div elements to show the data.

### cookies.js

```
const Cookies = require('js-cookie');

document.getElementById('removeTrip').addEventListener('click', removeTrip);

const resultsCheck = function() {
    if (Cookies.get('save')){
        let place = Cookies.get('place');
        let date = Cookies.get('date');
        let high = Cookies.get('high');
        let low = Cookies.get('low');
        let daysUntil = Cookies.get('daysUntil')
        let forecast = Cookies.get('forecast');
        let image = Cookies.get('image')
        document.getElementById("location").textContent = 'My trip to: ' + place;
        document.getElementById("time").textContent = 'Departing: ' + date;
        document.getElementById("daysUntil").textContent = place + ' is ' + daysUntil + ' days away.'
        document.getElementById("high").textContent = 'High - ' + high + ', Low - ' + low ;
        document.getElementById("forecast").textContent = forecast;
        document.getElementById("image").innerHTML = '<img src="' + image + '">';
    }
}

resultsCheck();

function removeTrip(event) {
    if(Cookies.get('save')){
        Cookies.remove('save');
        Cookies.remove('place');
        Cookies.remove('date');
        Cookies.remove('high');
        Cookies.remove('low');
        Cookies.remove('forecast');
        Cookies.remove('image');
        alert('Trip Removed')
        document.getElementById("location").textContent = '';
        document.getElementById("time").textContent = '';
        document.getElementById("daysUntil").textContent = '';
        document.getElementById("high").textContent = '';
        document.getElementById("forecast").textContent = '';
        document.getElementById("image").innerHTML = '';
    }
}
```

Creates event listener for remove trip button.  resultsCheck function checks to see if there are any cookies stored for a previous trip submitted by the user.  If the cookies are present, the function updates the div elements to show the data.  removeTrip function removes the cookies and sets the div elements on the page to blanks.

## /server/index.js

### index.js /postData route

```
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
        term = term1 + '+' + term2
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
```

The /postData route is where all the API calls are made so the keys can be stored as environment variables.  It chains multiple functions together to send all the data to the /results endpoint where the updateUI function fetches it.  

The first function fetches the data submitted by the postData function.  It then splits the place data into two variables and stores the in projectData.

The geonames function is called where the latitude and longitude of the location is retrieved through the geonames API.

The following async function takes the data from the geonames function and stores it in projectData.  It also splits the date data into three variables, month, day and year and stores all three in the projectData object.

The next function calls the darksky API with the data stored in the projectData object.  It collects the weather's high, low and forecast for the given date and stores them in an object inside the projectData object.

The following async function calls the pixabay API to retrive an image of the given location.  It takes the location1 and location2 data stored within the projectData object and combines them, connecting them with a '+' and uses that variable to call the API.

The final function sends all the data stored in the projectData object to the server so it can be retrieved from the /results endpoint.