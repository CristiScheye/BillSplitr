window.BillSplit.Views.Summary = Backbone.CompositeView.extend({
  initialize: function () {
    this.billHistories = {}
  },
  events: {
    'click .mark-user-paid' : 'promptUserPayment',
    'click .bills-index' : 'toggleBillHistory'
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
  },

  toggleBillHistory: function (event) {
    this.$el.find('.bill-history').collapse('hide');

    var userId = $(event.currentTarget).attr('data-id');
    var subs = this.subviews('#bill-history-' + userId);
    if (subs.length === 0) {
      this.getBillHistory(userId);
    } else {
      this.$el.find('#bill-history-' + userId).collapse('show')
    }

  },

  getBillHistory: function (userId) {
    var view = this;
    var userId = userId

    var bills = new BillSplit.Collections.Bills();
    bills.fetch({
      data: {
        user_id: userId
      },
      success: function (res) {
        var billsIndex = new BillSplit.Views.BillsIndex({
          collection: res
        });
        view.addSubview('#bill-history-' + userId, billsIndex);
        view.$el.find('#bill-history-' + userId).collapse('show')
      }
    })
  }
})
