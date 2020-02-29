const updateUI = async () =>{
    const res = await fetch('/sentiment');
    console.log(res);
    try {
        console.log(res.data)
        const allData = await res.json();
        console.log(allData)
        document.getElementById("polarity").innerHTML = allData.polarity;
        document.getElementById("polarityConfidence").innerHTML = allData.polarity_confidence;
        document.getElementById("subjectivity").innerHTML = allData.polarity;
        document.getElementById("subjectivityConfidence").innerHTML = allData.polarity_confidence;
        return allData;
    }catch(error){
        console.log(error)
    }
};





export { updateUI }