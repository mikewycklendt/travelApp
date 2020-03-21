import "regenerator-runtime/runtime";
import "core-js/stable";
import "fetch-mock"

const fetchMock = require('fetch-mock'); 
const httpMocks = require('node-mocks-http');

describe('postData', (url = '/postData', data = {place: 'city, state', date: '03/21/2021'}, payload = '') => {
    it('can post', async () => {
        fetchMock.mock(url, {
            method: 'POST',
            status: 200,
            statusText: 'OK',
            headers: {'Content-Type': 'application/json'},
            sendAsJson: true,
            body: {data}
        })
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({data: 'Sent Payload'}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(function (res) {
            expect(res.status).toEqual(200);
            return res.json()
        })
        .then(function (json) {
            console.log(json);
            payload = json.body.data
            console.log(payload)
            expect(payload).toMatchObject(data);
            done();
        })
        .catch((e) => console.log(e))
    })
});