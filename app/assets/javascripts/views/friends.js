window.BillSplitr.Views.Friends = Backbone.CompositeView.extend({
  initialize: function () {
    var newFriendship = new BillSplitr.Views.NewFriendship({
      friends: this.collection
    });
    this.addSubview('#new-friendship', newFriendship);

    this.listenTo(this.collection, 'sync', this.render);
  },


  template: JST['users/friends'],
  
  render: function () {
    var content = this.template({
      friends: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})