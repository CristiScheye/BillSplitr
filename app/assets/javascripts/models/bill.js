window.BillSplit.Models.Bill = Backbone.Model.extend({
  parse: function (resp) {
    this.bill_shares().set(resp['bill_shares'], { parse: true });
    delete resp['bill_shares'];

    this.lender().set(resp['lender'], { parse: true });
    delete resp['lender'];

    return resp;
  },
  validate: function (obj) {
    var attrs = obj.bill;
    var errors = []
    if (!attrs.amount) {
      errors.push('Please enter an amount');
    } else if (parseFloat(attrs.amount) <= 0) {
      errors.push('Amount must be greater than 0');
    }

    if (!attrs.description) {
      errors.push('Please enter a description');
    }

    if (!attrs.date) {
      errors.push('Please select a date');
    }

    if (errors.length > 0) {
      return errors;
    }
  },
  bill_shares: function () {
    this._bill_shares = this._bill_shares || new BillSplit.Collections.BillShares([], {
      bill: this
    });
    return this._bill_shares;
  },
  lender: function () {
    this._lender = this._lender || new BillSplit.Models.User();
    return this._lender;
  }
});
