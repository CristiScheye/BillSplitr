window.BillSplit.Collections.BillShares = Backbone.Collection.extend({
  model: BillSplit.Models.BillShare,
  url: 'api/bill_shares'
})
