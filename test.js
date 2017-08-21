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

describe('prettyPre()', function () {
    var instance = function (type) {
        return $('<pre>').prettyPre({ type: type }).data('plugin_prettyPre');
    };

    describe('#getContent()', function () {
        it('should return the elements content', function () {
            var element = $('<pre>').html('foo bar')[0];
            instance().getContent(element).should.equal('foo bar');
        });

        it('should strip empty newlines from start of content', function () {
            var element = $('<pre>').html('\nfoo bar')[0];

            instance().getContent(element).should.equal('foo bar');

            element.innerHTML = '\n\nfoo bar';
            instance().getContent(element).should.equal('foo bar');

            element.innerHTML = '\n\tfoo\nbar';
            instance().getContent(element).should.equal('\tfoo\nbar');
        });

        it('should strip trailing whitespace end from content', function () {
            var element = $('<pre>').html('foo bar\n\t \t')[0];
            instance().getContent(element).should.equal('foo bar');
        });

        it('should convert angle brackets to HTML entities', function () {
            var element = $('<pre>').html('<>')[0];

            instance().getContent(element).should.equal('&lt;&gt;');

            element.innerHTML = '<p>foo</p>';
            instance().getContent(element).should.equal('&lt;p&gt;foo&lt;/p&gt;');
        });
    });

    describe('#setContent()', function () {
        it('should replace the content of the given element', function () {
            var element = $('<pre>').html('foo')[0];

            instance().setContent(element, 'bar').should.equal(element);
            element.innerHTML.should.equal('bar');
        })
    });

    describe('#calculateOffset()', function () {
        it('should calculate the tab offset properly', function () {
            var content = "\t\t\t\tfoo\n\t\tbar";
            instance('\t').calculateOffset(content).should.equal(2);
        });

        it('should calculate the space offset properly', function () {
            var content = "        foo\n  bar";
            instance().calculateOffset(content).should.equal(2);
        });
    });

    describe('#buildRegex()', function () {
        it('should return a regular expression', function () {
            instance().buildRegex('foo').should.be.instanceof(RegExp);
        });

        it('should build based on tab offset', function () {
            var content = "\t\tfoo\tbar";
            ('\t').should.match(instance().buildRegex(content));
        });

        it('should build based on space offset', function () {
            var content = "    foo\n  bar";
            ('  ').should.match(instance().buildRegex(content));
        });
    });


    describe('Plugin', function () {
        beforeEach(function () {
            $('body').append('<pre class="foo">');
            $('body').append('<code class="foo">');
        });

        afterEach(function () {
            $('body').empty();
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
});
