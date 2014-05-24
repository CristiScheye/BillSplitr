window.BillSplit.Views.BillsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync' , this.render);
    this.users = options.users;
  },

  events: {
    'click a#toggle-new-bill-form' : 'toggleNewBillForm'
  },

  template: JST['bills/index'],

  render: function () {
    var content = this.template({
      bills: this.collection
    });

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
        collection: this.collection,
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