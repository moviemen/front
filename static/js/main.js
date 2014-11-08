window.the = {
    common: [
        'jquery',
        'underscore',
        'handlebars',
        'backbone'
    ],
    module: function(deps, constructor) {
        return define.call(window, the.common.concat(deps), constructor);
    },
    define: function() {
        the.module.apply(window, arguments);
    },
    log: function() {
        console.log.apply(console, [].slice.apply(arguments));
    },
};

the.module([
    'app',
], function($, _, H, B, app) {
    'use strict';

    H.registerHelper('nl2br', function(text) {
        var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new H.SafeString(nl2br);
    });

    window.app = app;
    window.setTimeout(function(){
        app.start();
    }, 500);
});
