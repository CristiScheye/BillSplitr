window.BillSplit.Views.BillShow = Backbone.View.extend({
  template: JST['bills/show'],
  render: function () {
    var content = this.template({
      bill: this.model
    });

    this.$el.html(content);
    return this;
  }
})