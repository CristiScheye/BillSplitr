window.BillSplit.Views.Summary = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render)
  },
  events: {
    'click .edit-balance' : 'editBalance',
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

  editBalance: function (event) {
    event.preventDefault();
    var view = this;
    var userId = $(event.target).attr('data-id');
    var status = $(event.target).attr('data-status')

    $.ajax({
      type: 'POST',
      url: 'api/update_balance',
      data: {
        user_id: userId,
        status: status
      },
      success: function () {
        view.collection.fetch();
      }
    })
  },

  toggleBillHistory: function (event) {
    debugger;
    var userId = $(event.currentTarget).attr('data-index');
    var subs = this.subviews('#bill-history-' + userId);
    if (subs.length === 0) {
      this.addBillHistory(userId, this.toggleCollapse)
    }
  },

  addBillHistory: function (userId, callback) {
    var view = this;
    var userId = userId;

    var bill_shares = new BillSplit.Collections.BillShares();
    this.listenTo(bill_shares, 'sync', this.syncBalances)
    bill_shares.fetch({
      data: {
        user_id: userId
      },
      success: function (res) {
        var billsIndex = new BillSplit.Views.BillSharesIndex({
          collection: res
        });
        view.addSubview('#bill-history-' + userId, billsIndex);
      }
    })
  },
  syncBalances: function() {
    this.collection.fetch();
  }
})
