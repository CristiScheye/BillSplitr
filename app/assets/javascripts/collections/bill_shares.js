window.BillSplit.Collections.BillShares = Backbone.Collection.extend({
  // debtors: function () {
  //
  //   this._debtors = this._debtors || new BillSplit.Collections.BillDebtors([], {
  //     bill: this.bill
  //   });
  //
  //   _(this.models).each(function(bill_share){
  //     this._debtors.add(bill_share.debtor());
  //   }.bind(this))
  //   return this._debtors;
  // },
  model: BillSplit.Models.BillShare,
  url: function () {
    return 'api/bills/' + this.bill.id + '/bill_shares'
  }
})