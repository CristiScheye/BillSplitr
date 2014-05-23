window.BillSplit.Models.BillShare = Backbone.Model.extend({
  debtor: function () {
    this._debtor = this._debtor || new BillSplit.Models.User()
    return this._debtor;
  },
  parse: function(resp) {
    this.debtor().set(resp['debtor'], { parse: true });
    delete resp['debtor'];

    return resp
  }
})