window.BillSplit.Views.NewPrefilledPayment = Backbone.View.extend({
  initialize: function (options) {
    this.sender = new BillSplit.Models.User({ id: options.senderId })
    this.receiver =new BillSplit.Models.User({ id: options.receiverId })
    this.amount = Math.abs(options.amount);

    this.sender.fetch();
    this.receiver.fetch();

    this.listenTo(this.sender, 'sync', this.render);
    this.listenTo(this.receiver, 'sync', this.render)
  },
  events: {
    'click #submit-payment' : 'submitPayment'
  },
  template: JST['payments/new_prefilled'],
  render: function () {
    var content = this.template({
      sender: this.sender,
      receiver: this.receiver,
      amount: this.amount
    });
    this.$el.html(content);
    return this;
  },
  submitPayment: function (event) {
    debugger;

    $.ajax({
      type: "POST",
      url: 'api/payments',
      data: {payment: {
        sender_id: this.sender.id,
        receiver_id: this.receiver.id,
        amount: this.amount
      }},
      success: function (resp) {
        this.trigger('payment-made', this);
      }.bind(this)
    });
  }
})
