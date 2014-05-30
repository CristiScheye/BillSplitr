window.BillSplitr.Views.BillShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  template: JST['bills/show'],
  render: function () {
    var content = this.template({
      bill: this.model,
      bill_shares: this.model.bill_shares(),
      lender: this.model.lender()
    });

    this.$el.html(content);
    return this;
  }
})