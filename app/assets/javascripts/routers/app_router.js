window.BillSplitr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '' : 'summary',
    'bills/new' : 'new',
    'bills/:id' : 'show',
    'friends' : 'friends'
  },

  summary: function () {
    var userBalances = new BillSplitr.Collections.UserBalances();
    userBalances.fetch();

    var main =  new BillSplitr.Views.Summary({
      userBalances: userBalances
    });
    this._swapView(main);
  },

  friends: function () {
    var friends = new BillSplitr.Collections.Friends();
    friends.fetch();

    var friendsView = new BillSplitr.Views.Friends({
      collection: friends
    });
    this._swapView(friendsView)
  },

  new: function () {
    var bills = BillSplitr.bills
    var users = new BillSplitr.Collections.Friends()

    var newBill = new BillSplitr.Views.NewBill({
      users: users,
      collection: bills
    });
    this._swapView(newBill);
  },

  show: function (id) {
    BillSplitr.bills.fetch()
    var bill = BillSplitr.bills.getOrFetch(id)

    var billShow = new BillSplitr.Views.BillShow({
      collection: BillSplitr.bills,
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
