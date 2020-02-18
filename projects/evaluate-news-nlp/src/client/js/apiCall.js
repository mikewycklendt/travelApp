let textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});


let apiCall = async (url) => {
    textapi.sentiment({
    'url': url
    }, function(error, response) {
        if (error === null) {
            let data = response.json();
            console.log(data);
            return data;
        }
    })
};

export { apiCall }