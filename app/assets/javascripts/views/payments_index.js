window.BillSplit.Views.PaymentsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render)
  },

  template: JST['payments/index'],

  render: function() {
    var content = this.template({
      payments: this.collection
    })
    this.$el.html(content);
    return this;
  }
})
