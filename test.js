const assert = require('assert')
const jquery = require('jquery')
const { JSDOM } = require('jsdom')

document = new JSDOM('<!DOCTYPE html><html><body></body></html>')
window = document.window
$ = jQuery = jquery(window)

const prettypre = require('./src/jquery.prettypre')

describe('prettyPre', function () {
    describe('#init()', function () {
        beforeEach(function () {
            $('body').append('<pre></pre>');
            $('body').append('<pre></pre>');
            $('body').append('<pre></pre>');
            $('body').append('<pre></pre>');
        });

        it('should return the original collection', function () {
            var $pre = $('pre');
            assert.equal($pre, $pre.prettyPre())
        });
    })
});
