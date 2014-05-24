window.BillSplit.Views.PaymentsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.users = options.users;
    this.listenTo(this.collection, 'sync', this.render)
  },

  events: {
    'click a#toggle-new-payment-form' : 'toggleNewPaymentForm'
  },

  template: JST['payments/index'],

  render: function() {
    var content = this.template({
      payments: this.collection
    })

    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  toggleNewPaymentForm: function (event) {
    event.preventDefault();
    var el = $(event.target);

    if (el.hasClass('show-form')) {
      el.html('[ - ] Record New Payment');

      var newPayment = new BillSplit.Views.NewPayment({
        collection: this.collection,
        users: this.users
      });
      this.addSubview('#new-payment', newPayment)
    } else {
      el.html('[ + ] Record New Payment');

      this.removeSubviews('#new-payment');
    }

    el.toggleClass('show-form')
  }
})