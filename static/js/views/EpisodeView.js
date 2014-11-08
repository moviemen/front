the.define([
    'plugins/tpl!tpl/episode.html'
], function(
    $, _, H, B,
    tpl
) {
    return B.View.extend({
        tagName: 'div',
        className: 'episode',

        render: function() {
            this.$el.html(tpl({episode: this.model.attributes}));
        },
    });
});
