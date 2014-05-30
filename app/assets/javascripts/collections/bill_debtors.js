window.BillSplitr.Collections.BillDebtors = Backbone.Collection.extend({
  initialize: function (options) {
    this.bill = options.bill
  },
  model: BillSplitr.Models.User,
  url: 'api/users'
})