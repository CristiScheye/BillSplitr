window.BillSplit.Views.BillsIndex = Backbone.CompositeView.extend({
  template: JST['bills/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync' , this.render)

    var users = new BillSplit.Collections.Users()
    users.fetch()

    var newBill = new BillSplit.Views.NewBill({
      collection: this.collection,
      users: users
    })
    this.addSubview('#new-bill', newBill);
  },

  render: function () {
    var content = this.template({
      bills: this.collection
    });

    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
})