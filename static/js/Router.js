the.define([
//    'views/AccountView',
//    'views/FindView',
//    'views/OfferView',
//    'views/HelpView',
    'views/WelcomeView',
    'views/MoviesView',
    'models/AuthSingleton',
    'plugins/tpl!tpl/breadcrumbs.html'
], function($, _, H, B,
    WelcomeView, MoviesView,
    AuthSingletonInstance,
    breadcrumbs_tpl
) {
    'use strict';
    return Backbone.Router.extend({
        routes: {
            '*path': 'defaultRoute'
        },
        currentView: null,
        setView: function(viewClass) {
            console.log('Switching to', viewClass);
            var hidePrevious = function() {
                this.currentView.destroy && this.currentView.destroy();
            }.bind(this);
            var showNext = function() {
                this.currentView = new viewClass({el: $('content .inside')});
                this.currentView.render();
                $('.breadcrumbs .inside').html(breadcrumbs_tpl({name: this.currentView.name}));
            }.bind(this);

            if(this.currentView) {
                hidePrevious();
                $('page').addClass('hidden');
                window.setTimeout(function() {
                    $('page').removeClass('hidden');
                    showNext();
                }, 150);
            } else {
                showNext();
            }
        },
        setMenuItem: function(href) {
            $('nav a').removeClass('active');
            $("nav a[href='"+href+"']").addClass('active');
        },
        defaultRoute: function(route) {
            if(!!AuthSingletonInstance.is_authorized()) {
                console.log('Route for authorized');
                this.setView(MoviesView);
                app.main_view.render_nav();
            } else {
                console.log('Route for not authorized');
                this.setView(WelcomeView);
                app.main_view.render_nav();
            }
        }
    });
});
