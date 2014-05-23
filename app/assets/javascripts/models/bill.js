window.BillSplit.Models.Bill = Backbone.Model.extend({
  bill_shares: function () {
    this._bill_shares = this._bill_shares || new BillSplit.Collections.BillShares([], {
      bill: this
    });
    return this._bill_shares;
  },
  debtors: function () {
    this._debtors = this._debtors || new BillSplit.Collections.BillDebtors([], {
      bill: this
    });
    return this._debtors;
  },
  parse: function (resp) {
    this.debtors().set(resp['debtors'], { parse: true });
    delete resp['debtors'];

    return resp;
  },
});
