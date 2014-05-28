window.BillSplit.Views.Summary = Backbone.CompositeView.extend({
  events: {
    'click .mark-user-paid' : 'promptUserPayment',
  },

  template: JST['layouts/summary'],

  render: function () {
    var content = this.template({
      userBalances: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  promptUserPayment: function (event) {
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
      amount: amount,
      collection: BillSplit.payments
    })
    this.addSubview('#new-payment', newUserBalancePayment);
    this.listenTo(newUserBalancePayment, 'payment-complete', this.completeUserPayment)
    this.listenTo(newUserBalancePayment, 'payment-cancelled', this.removePaymentView)
  },

  completeUserPayment: function (subview) {
    this.removePaymentView(subview);
    this.collection.fetch();
    this.render();
  },

  removePaymentView: function (subview) {
    this.removeSubviews('#new-payment')
  }
})
