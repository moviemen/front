the.module([
    'views/NavView',
    'models/AuthSingleton',
    'plugins/tpl!tpl/main.html'
], function(
    $, _, H, B,
    NavView, AuthSingleton, tpl
){
    'use strict';
    return B.View.extend({
        name: 'MainView',

        nav: null,

        el: $('body'),
        nav_el: null,

        initialize: function() {
        },

        render: function() {
            this.$el.html(tpl());

            this.nav_el = this.$('nav .inside');
            this.nav = new NavView({el: this.nav_el});
            this.render_nav();
        },

        render_nav: function() {
            this.nav.render();
        }
    });
});
