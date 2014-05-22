window.BillSplit.Collections.Bills = Backbone.Collection.extend({
  model: BillSplit.Models.Bill,
  url: 'api/bills'
})