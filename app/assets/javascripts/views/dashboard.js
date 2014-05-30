window.BillSplitr.Views.Dashboard = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.userBalances = options.userBalances;

    this.listenTo(this.userBalances, 'sync', this.render);
    this.listenTo(BillSplitr.bills, 'sync', this.render);

    var summaryView = new BillSplitr.Views.Summary({
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
