window.BillSplit.Views.NewPayment = Backbone.View.extend({
  initialize: function (options) {
    this.users = options.users;
    this.listenTo(this.users, 'sync', this.render)
  },

  events: {
    'submit #new-payment' : 'submitPayment',
    'focus #payment-date' : 'displayCalendar'
  },

  template: JST['payments/new'],

  render: function () {
    var content = this.template({
      users: this.users
    });
    this.$el.html(content);
    return this;
  },

  displayCalendar: function (event) {
    $(event.target).datepicker({ maxDate: 0 });
  },

  submitPayment: function (event) {
    event.preventDefault();
    var paymentAttrs = $(event.target).serializeJSON()['payment'];
    this.collection.create(paymentAttrs);
  }
})