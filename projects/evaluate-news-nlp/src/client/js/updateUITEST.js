import "regenerator-runtime/runtime";
import "core-js/stable";
import "fetch-mock"

const fetchMock = require('fetch-mock');
fetchMock.config.sendAsJson = true;

import updateUI from './updateUI';
import { isIterable } from "core-js";

describe('updateUI', () => {
    it('can fetch', async () => {
        const res = fetchMock.get('/sentiment', {polarity: 'polarity', polarity_confidence: 'polarity confidence', subjectivity: 'subjectivity', subjectivity_confidence: 'subjectivity confidence'});
        //const res = await updateUI('/sentiment');
        //const allData = await res.json();
        expect(res.polarity).toEqual('polarity');
        expect(res.polarity_confidence).toEqual('polarity confidence');
        expect(res.subjectivity).toEqual('subjectivity');
        expect(res.subjectivity_confidence).toEqual('subjectivity confidence');

    })
})


jest.mock('./updateUI', () => jest.fn());

test('update fields', () => {
    document.body.innerHTML =
        `<header>
            <div class="logo">
                News Article Processing
            </div>
         </header>
         <main>
         <section>
                <div class="holder">
                    <input id="URL" type="text" name="input" value="" placeholder="URL" size="48">
                    <button id="generate" type = "submit"> Submit </button>
                </form>
                </div>
         <section>
         <section>
                <div class="results">
                    <div class="box">
                        <strong>Results:</strong>
                 </div>
                 <div class="box">
                        Polarity: <div id="polarity"></div>
                 </div>
                 <div class="box">
                        Polarity Confidence: <div id="polarityConfidence"></div>
                 </div>
                 <div class="box">
                        Subjectivity: <div id="subjectivity"></div>
                 </div>
                 <div class="box">
                        Subjectivity Confidence: <div id="subjectivityConfidence"></div>
                 </div>
                 </div>
         </section>
         </main>
         <footer>
            <p>Michael Wycklendt      Udacity</p>
         </footer>`
    const updateUI = require('./updateUI')

    updateUI.mockImplementation(cb => {
        cb({
            polarity: 'polarity',
            polarity_confidence: 'polarity confidence',
            subjectivity: 'subjectivity',
            subjectivity_confidence: 'subjectivity confidence'
        });

    
    });

    expect(updateUI).toBeCalled();
    expect(document.getElementById("polarity").innerHTML).toEqual('polarity');
    expect(document.getElementById("polarityConfidence").innerHTML).toEqual('polarity confidence');
    expect(document.getElementById("subjectivity").innerHTML).toEqual('subjectivity');
    expect(document.getElementById("subjectivityConfidence").innerHTML).toEqual('subjectivity confidence');
});
