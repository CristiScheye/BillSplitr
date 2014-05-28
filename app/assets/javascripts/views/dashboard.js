window.BillSplit.Views.Dashboard = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.bills = options.bills;
    this.users = options.users;
    this.userBalances = options.userBalances;

    this.listenTo(this.userBalances, 'sync', this.render)
    this.listenTo(this.bills, 'sync', this.render)

    var summaryView = new BillSplit.Views.Summary({
      collection: this.userBalances
    })
    this.addSubview('#summary', summaryView);
  },

  events: {
    'click a#toggle-new-bill-form' : 'toggleNewBillForm',
  },

  template: JST['layouts/dashboard'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  toggleNewBillForm: function (event) {
    event.preventDefault();
    var el = $(event.target);

    if (el.hasClass('show-form')) {
      el.html('[ - ] Split New Bill');

      var newBill = new BillSplit.Views.NewBill({
        collection: this.bills,
        users: this.users
      });
      this.addSubview('#new-bill', newBill);
    } else {
      el.html('[ + ] Split New Bill');

      this.removeSubviews('#new-bill');
    }

    el.toggleClass('show-form')
  }
})
