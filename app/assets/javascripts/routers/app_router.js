window.BillSplit.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.bills = BillSplit.bills
  },

  routes: {
    '' : 'dashboard',
    'bills' : 'billsIndex',
    'bills/:id' : 'billShow',
    'payments' : 'paymentsIndex'
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

  billsIndex: function () {
    this.bills.fetch();
    var users = BillSplit.users;
    users.fetch();

    var billsIndex = new BillSplit.Views.BillsIndex({
      collection: this.bills,
      users: users
    });

    this._swapView(billsIndex);
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

  paymentsIndex: function () {
    var users = BillSplit.users;
    users.fetch();

    var payments = new BillSplit.Collections.Payments()
    payments.fetch();

    var paymentsIndex = new BillSplit.Views.PaymentsIndex({
      collection: payments,
      users: users
    });

    this._swapView(paymentsIndex);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().el);
  }
})
