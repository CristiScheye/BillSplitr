window.BillSplit.Collections.UserBalances = Backbone.Collection.extend({
  url: 'api/dashboard',
  model: BillSplit.Models.User
})
