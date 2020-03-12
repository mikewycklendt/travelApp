
import { postData } from "./postData"
import { updateUI } from "./updateUI"
import { checkURL } from "./checkURL"

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

export { handleSubmit }
