window.BillSplit.Views.BillsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync' , this.render);
    this.users = options.users;
  },

  template: JST['bills/index'],

  render: function () {
    var content = this.template({
      bills: this.collection
    });

    this.$el.html(content);
    return this;
  }
})
