;(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'prettyPre',
        defaults = {
            spacingType: '\t'
        };

    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.originalContent = this.getContent();
        this.content = this.sanitizeContent();

        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            // get spacing type
            // get spacing offset
            // replace content

            var spacingOffset = this.calculateOffset(),
                regex = this.buildRegex(spacingOffset);

            this.element.innerHTML = this.content.replace(regex, '\n')
        },

        buildRegex: function (offset) {
            return new RegExp(
                '\n' + this.settings.spacingType + '{' + offset + '}', 'g'
            );
        },

        calculateOffset: function () {
            var content = this.content,
                offset = 0;

            while(content.indexOf(this.settings.spacingType) === 0) {
                offset += 1;
                content.substring(1);
            }

            return offset;
        },

        getContent: function () {
            return this.element.innerHTML;
        },

        sanitizeContent: function () {
            return this.originalContent.replace(/[<>]/g, function (char) {
                return { '<': '&lt;', '>': '&gt;' }[char];
            });
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
