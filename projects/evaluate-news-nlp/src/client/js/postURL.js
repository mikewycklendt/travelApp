import { apiCall } from "./apiCall"
import { updateUI } from "./updateUI"

let postURL = async(url = '', data = {})=>{
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
        updateUI()
    }catch(error){
        console.log("error", error);
    }
}

export { postURL }