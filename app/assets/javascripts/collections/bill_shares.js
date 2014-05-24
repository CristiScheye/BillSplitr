window.BillSplit.Collections.BillShares = Backbone.Collection.extend({
  model: BillSplit.Models.BillShare,
  url: function () {
    return 'api/bills/' + this.bill.id + '/bill_shares'
  }
})