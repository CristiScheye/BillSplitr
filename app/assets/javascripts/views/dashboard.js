window.BillSplit.Views.Dashboard = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },
  template: JST['layouts/dashboard'],
  render: function () {
    var content = this.template({
      userBalances: this.collection
    });
    this.$el.html(content);
    return this;
  }
})
