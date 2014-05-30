window.BillSplitr.Models.BillShare = Backbone.Model.extend({
  parse: function(resp) {
    this.debtor().set(resp['debtor'], { parse: true });
    delete resp['debtor'];

    this.lender().set(resp['lender'], { parse: true });
    delete resp['lender'];

    this.bill().set(resp['bill'], { parse: true });
    delete resp['bill'];

    return resp
  },
  debtor: function () {
    this._debtor = this._debtor || new BillSplitr.Models.User()
    return this._debtor;
  },
  lender: function () {
    this._lender = this._lender || new BillSplitr.Models.User()
    return this._lender;
  },
  bill: function () {
    this._bill = this._bill || new BillSplitr.Models.Bill()
    return this._bill;
  }
});
