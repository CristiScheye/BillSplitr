window.BillSplit.Views.Dashboard = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.userBalances = options.userBalances;

    this.listenTo(this.userBalances, 'sync', this.render);
    this.listenTo(BillSplit.bills, 'sync', this.render);

    var summaryView = new BillSplit.Views.Summary({
      collection: this.userBalances
    });
    this.addSubview('#summary', summaryView);
  },

  template: JST['layouts/dashboard'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})
