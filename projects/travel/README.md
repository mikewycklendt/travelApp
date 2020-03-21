# Travel App Project

## Installed Packages:

### Production:

1. cors 2.8.5
2. core-js 3.6.4
3. dotenv 8.2.0
4. express 4.17.1
5. fetch-mock 9.1.0
6. node-fetch 2.6.0
7. regenerator-runtime 0.13.3
8. webpack 4.41.6
9. webpack-cli 3.3.11
10. file-loader 5.1.0
11. html 1.0.0
12. js-cookie 2.2.1

### Development:

1. @babel/core 7.8.4
2. @babel/preset-env 7.8.4
3. babel-loader 8.0.6
4. clean-webpack-plugin 3.0.0
5. css-loader 3.4.2
6. html-webpack-plugin 3.2.0
7. jest 25.1.0
8. mini-css-extract-plugin 0.9.0
9. node-sass 4.13.1
10. optimize-css-assets-webpack-plugin 5.0.3
11. sass-loader 8.0.2
12. style-loader 1.1.3
13. terser-webpack-plugin 2.3.5
14. webpack-dev-server 3.10.3
15. workbox-webpack-plugin 5.0.0

## Key Functions:
 
### formHandler.js

```
document.getElementById('generate').addEventListener('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault()

    //event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('URL').value
    postURL('/postURL', url)
    .then(updateUI)
    .then(checkURL)

};
```

Adds event liztener to submit button.  Captures the user input, sends user input to postURL function, updates the UI with the updateUI function, then checks to see if the user input was valid.

### postURL.js

```
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
        return data
    }catch(error){
        console.log("error", error);
    }
}
```

Async function.  Takes endpoint and user input from the function being called in formHandler.js, sends a post request to endpoint, returns data.  Sends the user input to the postURL route in /server/index.js where the alyien API call is made that sends the API response to the /sentiment endpoint.

### updateUI.js

```
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
        console.log('error')
    }
};
```

Async function.  Fetches API results from /sentiment endpoint.  Logs the response, captures response as json object in const variable allData.  Sets innerHTML of CSS elements to API results stored in json object allData.

### checkURL.js

```
let checkURL = async()=>{
    const res = await fetch('/sentiment');
    try {
        const polarity = await res.json();
        console.log(polarity)
        if (polarity.polarity === 'enter a valid URL'){
            alert("Enter a valid URL")
        }
    }catch(error){
        console.log(error)
    }
};
```

Async function.  Fetches API response from endpoint /sentiment.  In /server/index.js, if API request returns an error, all four responses from the API are set to 'enter a valid URL'.  Const variable polarity captures response as json object, logs the object, checks to see if the polarity field of json object is 'enter a valid URL', if it is, sends an alert to user that says 'Enter a Valid URL.'

## JEST Test

### postURL.test.js

```
import "regenerator-runtime/runtime";
import "core-js/stable";
import "fetch-mock"
const fetchMock = require('fetch-mock'); 

describe('postURL', (url = '/postURL', data = {url: 'http://wwww.link.com'}) => {
    it('can post', async () => {
        fetchMock.once(url, {
            status: 200,
            statusText: 'OK',
            headers: {'Content-Type': 'application/json'},
            sendAsJson: true,
            body: JSON.stringify(data)
        }, {method: 'POST'});

        fetch('/postURL', {
            method: 'POST',
            body: JSON.stringify({data: 'Sent Payload'}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(function (res) {
            expect(res.status).toEqual(200);
            return res.json();
        })
        .then(function (json) {
            console.log(json);
            expect(json).toEqual(data);

            done();
        })
    })
})
```

Tests the postURL response that sends the user input to the server.

Requires Dependencies:

1. regenerator-runtime/runtime
2. core-js/stable
3. fetch-mock

Describes the poxtURL function, mocks the function input endpooint and user input.  Runs a test that returns 'can post' if the function successfully posts the data.  Mocks the fetch POST request to endoint stored in URL field of the function.  Checks to see if server returns successful response '200', checks to see if returned json object equals the data sent to the server.