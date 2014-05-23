window.BillSplit.Views.BillShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
  },
  template: JST['bills/show'],
  render: function () {
    debugger;
    var content = this.template({
      bill: this.model
    });

    this.$el.html(content);
    return this;
  }
})