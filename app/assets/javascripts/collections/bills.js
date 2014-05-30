window.BillSplitr.Collections.Bills = Backbone.Collection.extend({
  model: BillSplitr.Models.Bill,
  url: 'api/bills',
  getOrFetch: function (id) {
    var bill = this.get(id);

    if (!bill) {
      bill = new BillSplitr.Models.Bill({ 'id' : id })
      this.add(bill)
    }

    bill.fetch()

    return bill;
  }
})
