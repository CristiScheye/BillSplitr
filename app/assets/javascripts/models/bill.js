window.BillSplit.Models.Bill = Backbone.Model.extend({
  bill_shares: function () {
    this._bill_shares = this._bill_shares || new BillSplit.Collections.BillShares([], {
      bill: this
    });
    return this._bill_shares;
  },
  lender: function () {
    this._lender = this._lender || new BillSplit.Models.User();
    return this._lender;
  },
  parse: function (resp) {
    this.bill_shares().set(resp['bill_shares'], { parse: true });
    delete resp['bill_shares'];

    this.lender().set(resp['lender'], { parse: true });
    delete resp['lender'];

    return resp;
  },
});
