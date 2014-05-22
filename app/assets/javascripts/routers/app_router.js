window.BillSplit.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '' : 'index'
  },

  index: function () {
    var bills = BillSplit.bills;
    bills.fetch();

    var billsIndex = new BillSplit.Views.BillsIndex({
      collection: bills
    });

    this._swapView(billsIndex);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().el);
  }
})