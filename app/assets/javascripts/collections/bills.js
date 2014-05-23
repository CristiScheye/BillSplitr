window.BillSplit.Collections.Bills = Backbone.Collection.extend({
  model: BillSplit.Models.Bill,
  url: 'api/bills',
  getOrFetch: function (id) {
    var bill = this.get(id);

    if (!bill) {
      bill = new BillSplit.Models.Bill({ 'id' : id })
      this.add(bill)
    }

    bill.fetch()

    return bill;
  }
})