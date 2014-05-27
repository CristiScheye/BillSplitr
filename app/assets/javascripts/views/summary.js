window.BillSplit.Views.Summary = Backbone.View.extend({
  template: JST['layouts/summary'],
  render: function () {
    var content = this.template({
      userBalances: this.collection
    });
    this.$el.html(content);
    return this;
  }
})
