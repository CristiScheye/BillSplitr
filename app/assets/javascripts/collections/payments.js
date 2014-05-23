window.BillSplit.Collections.Payments = Backbone.Collection.extend({
  model: BillSplit.Models.Payment,
  url: 'api/payments'
})