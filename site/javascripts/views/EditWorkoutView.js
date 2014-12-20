
define([
    'jquery',
    'handlebars',
    'backbone',
    'text!templates/editWorkoutTemplate.html',
    'collections/WorkoutsCollection',

], function($, handlebars, Backbone, EditWorkoutTemplate,WorkoutsCollection,id){
    var EditWorkoutView = Backbone.View.extend({
        el: '.page',
        template: handlebars.compile(EditWorkoutTemplate),

        events: {
                'submit .edit-workout-form': 'saveUser',
                'click .delete': 'deleteUser'
              },
         saveUser: function (ev) {
                var userDetails = $(ev.currentTarget).serializeObject();




                var user = new User();
                user.save(userDetails, {
                  success: function (user) {
                    router.navigate('', {trigger:true});
                  }
                });
                return false;
        },
        deleteUser: function (ev) {
                this.user.destroy({
                  success: function () {
                    console.log('destroyed');
                    router.navigate('', {trigger:true});
                  }
                });
                return false;
        },

        initialize: function(id) {
            this.render(id);
        },

        render: function (id) {
                    var self = this,
                        workoutsCollection = new WorkoutsCollection(),
                        workouts = [];

                    workoutsCollection.fetch({
                        success: function (data) {
                            $.each(data.models, function(index, model) {
                                workouts.push(model);
                            });
                            self.$el.html(self.template({workouts: [workouts[id]]}));
                        }
                    });
                }
    });
  return EditWorkoutView;
});

      $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
      };