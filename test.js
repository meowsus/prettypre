jsdom = require('mocha-jsdom')

describe('prettyPre', function () {
    before(function () {
        jsdom();
        jquery, $ = require('jquery');
        prettypre = require('./src/jquery.prettypre')
    });
});
