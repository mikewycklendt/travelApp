
import { postURL } from "./postURL"
import { updateUI } from "./updateUI"
import { checkURL } from "./checkURL"

document.getElementById('generate').addEventListener('click', handleSubmit);

function handleSubmit(event) {
    //event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('URL').value
    postURL('/postURL', url)
    .then(updateUI())
    .then(checkURL)

};

export { handleSubmit }
