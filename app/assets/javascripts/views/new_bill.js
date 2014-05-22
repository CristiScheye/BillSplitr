window.BillSplit.Views.NewBill = Backbone.View.extend({
  template: JST['bills/new'],
  events: {
    'submit form' : 'submitBill'
  },
  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
  submitBill: function (event) {
    event.preventDefault()
    debugger;
    var billAttrs = $(event.target).serializeJSON()['bill']

    this.collection.create(billAttrs);
  }
})