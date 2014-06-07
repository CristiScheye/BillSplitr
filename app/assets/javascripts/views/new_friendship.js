window.BillSplitr.Views.NewFriendship = Backbone.View.extend({
  initialize: function (options) {
    this.friends = options.friends 
  },

  template: JST['users/new_friend'],
  
  events: {
    'submit form' : 'submit'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var emailAttr = $(event.currentTarget).serializeJSON();
    console.log(emailAttr)
    var view = this;
    $.ajax({
      type: 'POST',
      url: 'api/friendships',
      data: emailAttr,
      success: function (friend) {
        view.friends.add(friend);
        view.render(); //in case friend is already in collection, still render
      }
    })
  }
})