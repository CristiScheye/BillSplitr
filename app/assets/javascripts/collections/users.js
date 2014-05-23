window.BillSplit.Collections.Users = Backbone.Collection.extend({
  model: BillSplit.Models.User,
  url: 'api/users'
})