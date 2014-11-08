the.module([
    'Router',
    'models/AuthSingleton',
    'views/MainView'
], function(
    $, _, H, B,
    Router, AuthSingletonInstance, MainView
) {
    'use strict';
    var app = {
        user: AuthSingletonInstance,
        events: _.extend({}, B.Events),

        main_view: null,

        start: function() {
            the.log('App started');

            var router = new Router();

            //$('body').on('click', 'a', function() {
                //Backbone.history.navigate('#' + $(this).attr('href'));
                //return false;
            //});

            window.clearInterval(window.dots_interval);

            $('loading').addClass('hidden');
            window.setTimeout(function(){
                this.main_view = new MainView();
                this.main_view.render();
                window.setTimeout(function(){
                    $('nav').removeClass('hidden');
                    $('content').removeClass('hidden');
                    $('footer').removeClass('hidden');
                }.bind(this), 50);

                this.user.on('state-changed', this.user_changed);
                this.user.start();
            }.bind(this), 200);

//            Backbone.history.start();
//            this.user.on('sync', this.userReady);
//            this.user.on('error', this.userReady);
        },
        user_changed: function() {
            console.log('User state changed');
            Backbone.history.stop();
            Backbone.history.start();
        }
    };
    return app;
});
