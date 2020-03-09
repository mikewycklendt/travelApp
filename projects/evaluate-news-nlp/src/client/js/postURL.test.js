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