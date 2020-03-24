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
    alert('trip removed')
    console.log('trip removed')
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


export { removeTrip }
export { resultsCheck }