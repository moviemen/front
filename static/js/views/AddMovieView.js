the.module([
    'swal',
    'models/AuthSingleton',
    'plugins/tpl!tpl/add.html',
], function($, _, H, B, swal, AuthSingleton, tpl){
    return B.View.extend({
        tagName: 'section',
        className: 'dialog hidden',

        events: {
            'click': 'close',
            'click .add_movie': 'add_movie'
        },

        initialize: function() {
//            _.bindAll(this, 'log_in');
        },

        render: function() {
            this.$el.html(tpl());
            this.$el.appendTo($('body'));
            window.setTimeout(function(){
                this.$el.removeClass('hidden');
            }.bind(this), 50);
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

        add_movie: function() {
            sweetAlertInitialize();
            swal({title: 'TODO', text: 'Not implemented :(', type: 'error', allowOutsideClick: true});
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
