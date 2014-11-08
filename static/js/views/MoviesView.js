the.module([
    'plugins/tpl!tpl/movies.html'
], function(
    $, _, H, B,
    tpl
){
    return B.View.extend({
        render: function() {
            this.$el.html(tpl());
        },
    });
});
