window.BillSplit.Views.PaymentsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.users = options.users;

    this.listenTo(this.collection, 'sync', this.render)

    //also add new payment form as a subview
  },
  render: function() {
    var content = this.template({
      payments: this.collection
    })
    this.$el.html(content);
    return this;
  },
  template: JST['payments/index']
})