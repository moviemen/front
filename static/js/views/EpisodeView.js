the.define([
    'plugins/tpl!tpl/episode.html'
], function(
    $, _, H, B,
    tpl
) {
    return B.View.extend({
        tagName: 'div',
        className: 'episode',

        events: {
            'click .delete-episode': 'delete_episode'
        },

        render: function() {
            this.$el.html(tpl({episode: this.model.attributes}));
        },

        delete_episode: function() {
            sweetAlertInitialize();
            swal({
                title: "Please confirm",
                text: "Are you sure you want to unsubscribe from monitoring these series?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
                allowOutsideClick: true
            }, function(){
                this.model.destroy();
                swal({
                    title: "Deleted!",
                    text: "Episode monitoring removed.",
                    type: "success",
                    allowOutsideClick: true
                });
                this.remove();
            }.bind(this));
        }
    });
});
