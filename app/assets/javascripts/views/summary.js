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
    debugger;
    // get the bill shares collection that belongs to this user (might already be in a subview)


    this.collection.fetch();
  },

  toggleBillHistory: function (event) {
    var userId = $(event.currentTarget).attr('data-index');
    var subs = this.subviews('#bill-history-' + userId);
    if (subs.length === 0) {
      this.getBillHistory(userId, this.toggleCollapse)
    } else{
      this.toggleCollapse(userId);
    }
  },

  toggleCollapse: function (userId) {
    debugger;
    this.$el.find('.bill-history').collapse('hide')
    this.$el.find('#bill-history-' + userId).collapse('show')
  },

  getBillHistory: function (userId, callback) {
    var view = this;
    var userId = userId

    var bill_shares = new BillSplit.Collections.BillShares();
    this.listenTo(bill_shares, 'sync', this.collection.fetch())
    bill_shares.fetch({
      data: {
        user_id: userId
      },
      success: function (res) {
        var billsIndex = new BillSplit.Views.BillSharesIndex({
          collection: res
        });
        view.addSubview('#bill-history-' + userId, billsIndex);
        callback.call(view, userId);
      }
    })
  },
})
