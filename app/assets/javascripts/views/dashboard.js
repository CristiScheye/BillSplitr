window.BillSplit.Views.Dashboard = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.bills = options.bills;
    this.payments = options.payments
    this.users = options.users;
    this.userBalances = options.userBalances;

    this.listenTo(this.userBalances, 'sync', this.render)
    this.listenTo(this.bills, 'sync', this.render)

    debugger;

    var summaryView = new BillSplit.Views.Summary({
      collection: this.userBalances
    })
    this.addSubview('#summary', summaryView);

    var billsIndex = new BillSplit.Views.BillsIndex({
      users: this.users,
      collection: this.bills
    });
    this.addSubview('#history', billsIndex);

    var paymentsIndex = new BillSplit.Views.PaymentsIndex({
      collection: this.payments
    });
    this.addSubview('#history', paymentsIndex);
  },

  events: {
    'click a#toggle-new-bill-form' : 'toggleNewBillForm',
    'click a#toggle-new-payment-form' : 'toggleNewPaymentForm'
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
  },

  toggleNewPaymentForm: function (event) {
    event.preventDefault();
    var el = $(event.target);

    if (el.hasClass('show-form')) {
      el.html('[ - ] Record New Payment');

      var newPayment = new BillSplit.Views.NewPayment({
        collection: this.payments,
        users: this.users
      });
      this.addSubview('#new-payment', newPayment)
    } else {
      el.html('[ + ] Record New Payment');

      this.removeSubviews('#new-payment');
    }

    el.toggleClass('show-form')
  }
})
