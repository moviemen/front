the.module([
    'swal',
    'collections/EpisodeList',
    'views/EpisodeView',
    'plugins/tpl!tpl/movies.html'
], function(
    $, _, H, B,
    swal,
    EpisodeList, EpisodeView,
    tpl
){
    return B.View.extend({
        collection: null,

        initialize: function() {
            _.bindAll(this, 'on_reset', 'on_add_one', 'on_remove_one');

            app.events.on('app:addEpisode', this.on_add_episode, this);
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
            console.log('Collection was reset', o);
            alert('TODO: IMPLEMENT ME!');
        },

        on_add_one: function(model) {
            console.log('Added from collection:', model);
            var view = new EpisodeView({model: model});
            view.render();
            this.$('.episodes').append(view.el);
        },

        on_remove_one: function(model) {
            console.log('Removed to collection:', model);
        },

        on_add_episode: function(name) {
            console.log('Adding episode with name', name);
            this.collection.create({name: name});
            sweetAlertInitialize();
            swal({title: 'Done', text: 'Episode added!', type: 'success', allowOutsideClick: true});
            app.events.trigger('app:episodeAdded');
        },
    });
});
