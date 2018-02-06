const app = require('../script');
const getUserData = require('../script').getUserData;
const getUserRepos = require('../script').getUserRepos;
const expect = require("chai").expect;
const co = require('co');
const fetch = require('node-fetch');

describe('getUserData', function () {
    it('should return a Json Object witht the user info', () => co(function* () {
        const name = "gerardcobas"
        const response = yield fetch('https://api.github.com/users/' + name);
        expect(response.status).to.be.equal(200);
        const user = yield response.json();
        expect(user).to.be.an('Object');
    }).catch(function (err) {}));
});

describe('getUserRepos', function () {
    it('should return a Json Object with the repos', () => co(function* () {
        const response = yield fetch('https://api.github.com/users/' + name, '/repos`');
        expect(response.status).to.be.equal(200);
        const repos = yield response.json();
        expect(repos).to.be.an('Object');
    }).catch(function (err) {}));
});