const { JSDOM } = require('jsdom')
const jquery = require('jquery')

document = new JSDOM('<!DOCTYPE html><html><body></body></html>')
window = document.window
$ = jQuery = jquery(window)

const chai = require('chai')
const chaiJquery = require('chai-jquery')

chai.should()
chai.use(chaiJquery)

const prettypre = require('./src/jquery.prettypre')

describe('prettyPre', function () {
    afterEach(function () {
        $('body').empty();
    });

    describe('Plugin', function () {
        beforeEach(function () {
            $('body').append('<pre class="foo">');
            $('body').append('<code class="foo">');
        });

        it('should return the original collection', function () {
            var $elements = $('.foo'),
                $result = $elements.prettyPre();

            $result.length.should.equal(2);
            $result.should.equal($elements)
        });

        it('should store an instance in data', function () {
            var $result = $('.foo').prettyPre({ type: '\s' });

            $result.each(function (index, element) {
                var instance = $(element).data('plugin_prettyPre');

                instance.should.not.be.undefined;
                instance.element.should.equal(element);
            })
        });
    });

    describe('#getContent()', function () {
        beforeEach(function () {
            $('body').append('<pre><code>foo</code></pre>');
        });

        it('should store the elements content', function () {
            var instance = $('pre').prettyPre().data('plugin_prettyPre');
            instance.originalContent.should.equal('<code>foo</code>');
        });
    });

    describe('#sanitizeContent()', function () {
        beforeEach(function () {
            $('body').append('<pre><code>bar</code></pre>');
        });

        it('should sanitize the elements content', function () {
            var instance = $('pre').prettyPre().data('plugin_prettyPre');
            instance.content.should.equal('&lt;code&gt;bar&lt;/code&gt;');
        });
    });

    describe('#calculateOffset()', function () {
        beforeEach(function () {
            $('body').append('<pre class="tab">&#9;&#9;qux</pre>');
            $('body').append('<pre class="space">    gralph</pre>');
        });

        it('should calculate tab offset', function () {
            var instance = $('.tab').prettyPre({
                type: '\t'
            }).data('plugin_prettyPre');

            instance.offset.should.equal(2);
        });

        it('should calculate space offset', function () {
            var instance = $('.space').prettyPre({
                type: ' '
            }).data('plugin_prettyPre');

            instance.offset.should.equal(4);
        })
    });

    describe('#buildRegex()', function () {
        beforeEach(function () {
            $('body').append('<pre>&#9;&#9;&#9;&#9;grund</pre>');
        });

        it('should build a regex pattern', function () {
            var instance = $('pre').prettyPre({
                type: '\t'
            }).data('plugin_prettyPre');

            instance.regex.should.be.instanceof(RegExp)
            instance.regex.toString().should.equal('/^\t{4}/gm')
        })
    });

    describe('#replaceContent()', function () {
        beforeEach(function () {
            var html = '&#9;&#9;&#9;&#9;ribble\n&#9;&#9;&#9;&#9;&#9;&#9;rabble';
            $('body').append('<pre>' + html + '</pre>');
        });

        it('should remove unnecessary spacing from the content', function () {
            var $result = $('pre').prettyPre({ type: '\t' });
            $result.html().should.match(/ribble\n\t\trabble/);
        })
    });

    describe('#trim()', function () {
        beforeEach(function () {
            var html = '\n\nbromp\n&#9;&#9;&#9;';
            $('body').append('<pre>' + html + '</pre>');
        })

        it('should trim whitespace from the end of the HTML', function () {
            var $result = $('pre').prettyPre({ type: '\t' });
            $result.html().should.equal('bromp');
        });
    });
});
