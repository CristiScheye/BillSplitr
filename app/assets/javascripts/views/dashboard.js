window.BillSplit.Views.Dashboard = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },
  events: {
    'click .mark-user-paid' : 'promptUserPayment'
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
  }
})
