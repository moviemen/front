the.module([], function(
    $, _, H, B
){
    var Model = B.Model.extend({
        url: '/auth',
        on_error: null,

        defaults: {
            authorized: parseInt(window.localStorage.authorized),
            access_token: window.localStorage.access_token
        },

        log_in: function(login, password, on_success, on_error) {
            this.on_error = on_error;
            this.fetch({
                data: $.param({
                    email: login,
                    password: password
                }),
                success: function(data) {
                    this.on_success(data);
                    on_success();
                }.bind(this),
                error: on_error
            });
        },

        log_out: function() {
            console.log('Logging out');
            this.set('authorized', 0);
            window.localStorage.authorized = 0;
            this.trigger('state-changed');
        },

        is_authorized: function() {
            return parseInt(this.get('authorized'));
        },

        initialize: function() {
            _.bindAll(this, 'on_success');
        },

        start: function() {
            this.on('success', this.on_response);
            this.on('error', this.on_response);
            this.trigger('state-changed');
        },

        on_success: function(data) {
            // Callback if error
            this.set('authorized', data.get('authorized')?1:0);
            this.set('access_token', data.get('access_token'));
            window.localStorage.authorized = data.get('authorized')?1:0;
            window.localStorage.access_token = data.get('access_token');
            console.log('Login OK');
            this.trigger('state-changed');
        }
    });
    return new Model();
});
