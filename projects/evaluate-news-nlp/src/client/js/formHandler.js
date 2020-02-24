
import { postURL } from "./postURL"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('URL').value
    postURL('/postURL', url)
    //.then(updateUI());
};

export { handleSubmit }
