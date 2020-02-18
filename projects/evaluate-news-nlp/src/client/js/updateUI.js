const updateUI = async () =>{
    const res = await fetch('/sentiment');
    try {
        const allData = await res.json();
        console.log(allData)
        document.getElementById("polarity").innerHTML = allData.polarity;
        document.getElementById("text").innerHTML = allData.text;
        document.getElementById("polarityConfidence").innerHTML = allData.polarity_confidence;
        return allData
    } catch(error) {
        console.log(error)
    }
};

export { updateUI }