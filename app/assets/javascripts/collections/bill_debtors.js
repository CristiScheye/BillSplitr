window.BillSplit.Collections.BillDebtors = Backbone.Collection.extend({
  initialize: function (options) {
    this.bill = options.bill
  },
  model: BillSplit.Models.User,
  url: 'api/users'
})