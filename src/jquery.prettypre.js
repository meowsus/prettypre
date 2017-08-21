;(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'prettyPre',
        defaults = {
            type: ' '     // can be \r, \n, \t, \f, \v, or \s to match all
        };

    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.content = this.getContent(this.element);

        this.init();
    }

    $.extend(Plugin.prototype, {
        /**
         * modifies the elements `innerHTML` content to:
         * 1. remove the first newline character
         * 2. change arrow brackets into HTML entities
         * 3. remove any trailing spacing characters
         * @param  {HTMLElement} element the target element
         * @return {String} the element's sanitized HTML
         */
        getContent: function (element) {
            return element.innerHTML
                .replace(/^\n*/, '')                            // 1
                .replace(/[<>]/g, function (c) {                // 2
                    return { '<': '&lt;', '>': '&gt;' }[c];
                })
                .replace(/\s*$/, '');                           //3
        },

        /**
         * sets an elements `innerHTML` to the given String
         * @param {HTMLElement} element the target element
         * @param {String} string the replacement content
         * @return {HTMLElement} the passed element
         */
        setContent: function (element, string) {
            element.innerHTML = string;
            return element;
        },

        /**
         * determines the indentation size by finding concurrent spaces of type
         * `this.settings.type`. Reads from the last line, making the assumption
         * that that line is more often correctly indented.
         * @param  {String} content the sanitized HTML content
         * @return {Integer} the determined number of spaces to remove
         */
        calculateOffset: function (content) {
            var lines = content.split('\n'),
                offset = 0;

            for (var i = lines.length - 1; i >= 0; i--) {
                var line = lines[i];

                while(line.indexOf(this.settings.type) === 0) {
                    offset += 1;
                    line = line.substring(1);
                }

                break;
            }

            return offset;
        },

        /**
         * builds a regular expression that looks at the beginning of each line
         * for N number of spaces, where N is the calculated offset, and spaces
         * are `this.settings.type`.
         * @param  {String} content the sanitized HTML content
         * @return {RegExp} the regular expression used for space removal
         */
        buildRegex: function (content) {
            var offset = this.calculateOffset(content),
                regex = '^' + this.settings.type + '{' + offset + '}';

            return new RegExp(regex, 'gm');
        },

        /**
         * asks for the regex needed to match the offending whitespace before
         * replacing the content of the element with a string removing said
         * whitespace.
         * @return {null}
         */
        init: function () {
            var regex = this.buildRegex(this.content);
            this.setContent(this.element, this.content.replace(regex, ''));
        },
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if ( ! $.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);
