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

export { updateUI }