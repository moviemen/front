the.module([
    'models/AuthSingleton',
    'views/LoginView',
    'views/AddMovieView',
    'plugins/tpl!tpl/nav.html'
], function(
    $, _, H, B,
    AuthSingleton, LoginView, AddMovieView, tpl
){
    return B.View.extend({
        events: {
            'click a.login': 'on_show_login',
            'click a.add': 'on_show_add',
            'click a.logout': 'log_out'
        },

        on_show_login: function() {
            var login_view = new LoginView();
            login_view.render();
        },

        on_show_add: function() {
            var add_movie_view = new AddMovieView();
            add_movie_view.render();
        },

        log_out: function() {
            AuthSingleton.log_out();
            sweetAlertInitialize();
            swal({title: 'Bye', text: 'You are logged out.', type: 'success', allowOutsideClick: true});
        },

        render: function() {
            this.$el.html(tpl({authorized: !!AuthSingleton.is_authorized()}));
        }
    });
});
