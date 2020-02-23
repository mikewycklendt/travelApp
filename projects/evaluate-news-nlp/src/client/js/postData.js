import { updateUI } from "./apiCall"

let postData = async(url = '', data = {})=>{
    console.log(data);
    let polarity = data.polarity;
    let text = data.text;
    let polarity_confidence = data.polarity_confidence;
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { polarity, text, polarity_confidence }),
    });
    try {
        updateUI()
    }catch(error) {
        console.log("error", error);
    }
}

export { postData }