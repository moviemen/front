the.module([
    'collections/EpisodeList',
    'views/EpisodeView',
    'plugins/tpl!tpl/movies.html'
], function(
    $, _, H, B,
    EpisodeList, EpisodeView,
    tpl
){
    return B.View.extend({
        collection: null,

        initialize: function() {
            _.bindAll(this, 'on_reset', 'on_add_one', 'on_remove_one');
        },

        render: function() {
            this.$el.html(tpl());
            this.$('.episodes').html('');

            this.collection = new EpisodeList();
            this.collection.on('reset', this.on_reset);
            this.collection.on('add', this.on_add_one);
            this.collection.on('remove', this.on_remove_one);

            this.collection.fetch();
        },

        on_reset: function(o) {
            console.log('Collection reset', o);
            alert('TODO: IMPLEMENT ME!');
        },

        on_add_one: function(model) {
            console.log('Collection add:', model);
            var view = new EpisodeView({model: model});
            view.render();
            this.$('.episodes').append(view.el);
        },

        on_remove_one: function(model) {
            console.log('Collection remove:', model);
        }
    });
});
