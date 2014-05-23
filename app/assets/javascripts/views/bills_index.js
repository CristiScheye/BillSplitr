window.BillSplit.Views.BillsIndex = Backbone.CompositeView.extend({
  template: JST['bills/index'],

  initialize: function (options) {
    this.listenTo(this.collection, 'sync' , this.render)
    this.users = options.users

    var newBill = new BillSplit.Views.NewBill({
      collection: this.collection,
      users: this.users
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