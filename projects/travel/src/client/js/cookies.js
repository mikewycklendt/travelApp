const Cookies = require('js-cookie');


document.getElementById('removeTrip').addEventListener('click', removeTrip);



const resultsCheck = function() {
    if (Cookies.get('save')){
        let place = Cookies.get('place');
        let date = Cookies.get('date');
        let high = Cookies.get('high');
        let low = Cookies.get('low');
        let forecast = Cookies.get('forecast');
        let image = Cookies.get('image')
        document.getElementById("location").innerHTML = place;
        document.getElementById("time").innerHTML = date;
        document.getElementById("high").innerHTML = high;
        document.getElementById("low").innerHTML = low;
        document.getElementById("forecast").innerHTML = forecast;
        document.getElementById("image").innerHTML = image;
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
    }
}


export { removeTrip }
export { resultsCheck }