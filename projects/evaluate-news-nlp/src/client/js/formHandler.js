import { apiCall } from "./apiCall"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('URL').value
    apiCall(url)
    .then(async function(data){
        console.log(data);
        let res = await postData('/', data);
        console.log(res);
    });

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
