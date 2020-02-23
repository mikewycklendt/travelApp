import { apiCall } from "./apiCall"
import { postData } from "./postData"
import { postURL } from "./postURL"
import { postURL } from "./postURL"
import { updateUI } from "./updateUI"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('URL').value
    postURL('/postURL', url)
    //.then(updateUI());
};

export { handleSubmit }
