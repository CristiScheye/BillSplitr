window.BillSplitr.Collections.UserBalances = Backbone.Collection.extend({
  url: 'api/dashboard',
  model: BillSplitr.Models.User,
  currentUserTotals: function () {
    _totals = {
      debt: 0,
      credit: 0
    }
    this.models.forEach(function(model){
      var amt = parseFloat(model.attributes.balance)
      if (amt > 0) {
        _totals.credit += amt;
      } else if (amt < 0){
        _totals.debt += amt;
      }
    })
    _totals.net = _totals.credit + _totals.debt;
    return _totals;
  }
})
