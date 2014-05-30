window.BillSplit.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '' : 'dashboard',
    'bills/new' : 'new',
    'bills/:id' : 'show',
  },

  dashboard: function () {
    var userBalances = new BillSplit.Collections.UserBalances();
    userBalances.fetch();

    var main =  new BillSplit.Views.Dashboard({
      userBalances: userBalances
    });
    this._swapView(main);
  },

  new: function () {
    var bills = BillSplit.bills
    var users = BillSplit.users

    var newBill = new BillSplit.Views.NewBill({
      users: users,
      collection: bills
    });
    this._swapView(newBill);
  },

  show: function (id) {
    BillSplit.bills.fetch()
    var bill = BillSplit.bills.getOrFetch(id)

    var billShow = new BillSplit.Views.BillShow({
      collection: BillSplit.bills,
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
