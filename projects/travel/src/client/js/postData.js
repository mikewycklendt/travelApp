import { apiCall } from "./apiCall"
import { updateUI } from "./updateUI"

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

export { postData }