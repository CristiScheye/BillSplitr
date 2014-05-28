window.BillSplit.Views.Summary = Backbone.CompositeView.extend({
  events: {
    'click .mark-user-paid' : 'promptUserPayment',
  },

  template: JST['layouts/summary'],

  render: function () {
    var totals = this.collection.currentUserTotals();
    var content = this.template({
      userBalances: this.collection,
      totals: totals
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  promptUserPayment: function (event) {
    alert('prompt user payment in Summary composite view!')
    // TODO: this should change the bill share status
    // (or all bill share statuses that this balance
    // refers to) to 'paid'
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
