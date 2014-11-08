the.define([], function($, _, H, B) {
    return B.Model.extend({
        url: '/episodes/',

        options: {},

        initialize: function(options) {
            this.options = options || {};
//            this.bind('remove', function() {
//                this.destroy();
//            });
        }
    });
});