window.BillSplit.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.bills = BillSplit.bills
  },

  routes: {
    '' : 'index',
    'bills/:id' : 'show'
  },

  index: function () {
    this.bills.fetch();
    var users = BillSplit.users;
    users.fetch()

    var billsIndex = new BillSplit.Views.BillsIndex({
      collection: this.bills,
      users: users
    });

    this._swapView(billsIndex);
  },

  show: function (id) {
    var bill = this.bills.getOrFetch(id)
    var users = BillSplit.users;
    users.fetch()

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