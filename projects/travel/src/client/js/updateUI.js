const updateUI = async () =>{
    const res = await fetch('/results');
    console.log(res);
    try {
        console.log(res.data)
        const allData = await res.json();
        console.log(allData)
        document.getElementById("place").innerHTML = allData.one.place;
        document.getElementById("date").innerHTML = allData.one.date;
        document.getElementById("high").innerHTML = allData.three.high;
        document.getElementById("low").innerHTML = allData.three.low;
        document.getElementById("forecast").innerHTML = allData.three.forecast;
        document.getElementById("image").innerHTML = allData.four.image;
        return allData;
    }catch(error){
        console.log('error')
    }
};

export { updateUI }