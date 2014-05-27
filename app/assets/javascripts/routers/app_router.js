window.BillSplit.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.bills = BillSplit.bills
  },

  routes: {
    '' : 'dashboard',
    'bills/:id' : 'billShow',
  },

  dashboard: function () {
    var users = BillSplit.users;
    var userBalances = new BillSplit.Collections.UserBalances();
    var payments = new BillSplit.Collections.Payments()

    payments.fetch();
    this.bills.fetch();
    users.fetch();
    userBalances.fetch();

    var main =  new BillSplit.Views.Dashboard({
      userBalances: userBalances,
      bills: this.bills,
      payments: payments,
      users: users
    });
    this._swapView(main);
  },

  billShow: function (id) {
    var bill = this.bills.getOrFetch(id)
    var users = BillSplit.users;
    users.fetch();

    var billShow = new BillSplit.Views.BillShow({
      collection: this.bills,
      model: bill
    });

    this._swapView(billShow);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().el);
  }
})
