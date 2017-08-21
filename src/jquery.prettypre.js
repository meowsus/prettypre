;(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'prettyPre',
        defaults = {
            spacingType: ' ' // can be \r, \n, \t, \f, \v, or \s to match all
        };

    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            this.getContent();
            this.sanitizeContent();
            this.calculateOffset();
            this.buildRegex();
            this.replaceContent();
            this.trim();
        },

        getContent: function () {
            this.originalContent = this.element.innerHTML;
        },

        sanitizeContent: function () {
            this.content = this.originalContent.replace(/[<>]/g, function (c) {
                return { '<': '&lt;', '>': '&gt;' }[c];
            });
        },

        calculateOffset: function () {
            var content = this.content;

            this.offset = 0;
            while(content.indexOf(this.settings.spacingType) === 0) {
                this.offset += 1;
                content = content.substring(1);
            }
        },

        buildRegex: function () {
            this.regex = new RegExp(
                '^' + this.settings.spacingType + '{' + this.offset + '}', 'gm'
            );
        },

        replaceContent: function () {
            this.element.innerHTML = this.content.replace(this.regex, '');
        },

        trim: function () {
            this.element.innerHTML = this.element.innerHTML.replace(/\s*$/, '');
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if ( ! $.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);
