the.module([
    'swal',
    'typeahead',
    'models/AuthSingleton',
    'models/Episode',
    'plugins/tpl!tpl/add.html',
], function($, _, H, B, swal, Bloodhound, AuthSingleton, Episode, tpl){
    return B.View.extend({
        tagName: 'section',
        className: 'dialog hidden add-movie-dialog',

        options: {},

        events: {
            'click': 'close',
            'click .add_movie': 'add_episode'
        },

        initialize: function(options) {
            this.options = options || {};
            app.events.on('app:episodeAdded', this.on_episode_added, this);
            _.bindAll(this, 'add_episode');
        },

        render: function() {
            this.$el.html(tpl());
            this.$el.appendTo($('body'));
            window.setTimeout(function(){
                this.$el.removeClass('hidden');
            }.bind(this), 50);

            var movies = new Bloodhound({
              datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
              queryTokenizer: Bloodhound.tokenizers.whitespace,
              remote: '/suggest/%QUERY'
            });

            movies.initialize();

            this.$('.name').typeahead(null, {
              name: 'movies',
              displayKey: 'rus',
              source: movies.ttAdapter()
            });
        },

        close: function(e) {
            if (!e || $(e.target).hasClass('fi-x') || $(e.target).hasClass('dialog')) {
                // Close pop-up
                window.setTimeout(function () {
                    this.remove();
                }.bind(this), 50);
                this.$el.addClass('hidden');
            }
        },

        add_episode: function() {
            app.events.trigger('app:addEpisode', this.$('.name').val());
        },

        on_episode_added: function() {
            this.close();
            app.events.off('app:episodeAdded', this.on_episode_added);
        }

/*        log_in: function() {
            AuthSingleton.log_in(this.$('.email').val(), this.$('.password').val(), function(){
                sweetAlertInitialize();
                swal({title: 'Hello', text: 'Welcome back!', type: 'success', allowOutsideClick: true});
                this.close();
            }.bind(this), function(){
                sweetAlertInitialize();
                swal({title: 'Oops', text: 'Wrong login or password!', type: 'error', allowOutsideClick: true});
            });
        },*/
    });
});
