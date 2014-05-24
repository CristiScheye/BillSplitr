window.BillSplit.Views.PaymentsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.users = options.users;

    this.listenTo(this.collection, 'sync', this.render)

    var newPayment = new BillSplit.Views.NewPayment({
      collection: this.collection,
      users: this.users
    });
    this.addSubview('#new-payment', newPayment)
  },
  render: function() {
    var content = this.template({
      payments: this.collection
    })

    this.$el.html(content);
    this.attachSubviews();

    return this;
  },
  template: JST['payments/index']
})