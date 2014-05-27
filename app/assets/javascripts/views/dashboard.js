window.BillSplit.Views.Dashboard = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.bills = options.bills;
    this.payments = options.payments
    this.users = options.users;

    this.listenTo(this.collection, 'sync', this.render)
    this.listenTo(this.bills, 'sync', this.render)
  },

  events: {
    'click .mark-user-paid' : 'promptUserPayment',
    'click a#toggle-new-bill-form' : 'toggleNewBillForm',
    'click a#toggle-new-payment-form' : 'toggleNewPaymentForm'
  },

  template: JST['layouts/dashboard'],

  render: function () {
    var content = this.template({
      userBalances: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  promptUserPayment: function (event) {
    debugger;
    var btnData = $(event.target)
    var senderId = btnData.attr('sender-id');
    var receiverId = btnData.attr('receiver-id');
    var amount = btnData.attr('amt');

    if (senderId) { //the current user sends payment to other user
      receiverId = BillSplit.currentUser.id
    } else { //the current user receives payment from other user
      senderId = BillSplit.currentUser.id
    }

    var newUserBalancePayment = new BillSplit.Views.NewPrefilledPayment({
      senderId: senderId,
      receiverId: receiverId,
      amount: amount
    })
    this.addSubview('#new-payment', newUserBalancePayment);
    this.listenTo(newUserBalancePayment, 'payment-made', this.completeUserPayment)
  },

  completeUserPayment: function (subview) {
    this.removeSubviews('#new-payment')
    this.collection.fetch();
    this.render();
  },

  toggleNewBillForm: function (event) {
    event.preventDefault();
    var el = $(event.target);

    if (el.hasClass('show-form')) {
      el.html('[ - ] Split New Bill');

      var newBill = new BillSplit.Views.NewBill({
        collection: this.bills,
        users: this.users
      });
      this.addSubview('#new-bill', newBill);
    } else {
      el.html('[ + ] Split New Bill');

      this.removeSubviews('#new-bill');
    }

    el.toggleClass('show-form')
  },

  toggleNewPaymentForm: function (event) {
    event.preventDefault();
    var el = $(event.target);

    if (el.hasClass('show-form')) {
      el.html('[ - ] Record New Payment');

      var newPayment = new BillSplit.Views.NewPayment({
        collection: this.payments,
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
