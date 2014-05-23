window.BillSplit.Views.NewBill = Backbone.CompositeView.extend({
  events: {
    'submit form#new-bill' : 'submitBill',
  },
  initialize: function (options) {
    this.users = options.users;

    var users = new BillSplit.Collections.Users()
    users.fetch()

    var newBillShare = new BillSplit.Views.NewBillShare({
      users: users
    });
    this.addSubview('#new-bill-share', newBillShare)
  },
  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews
    return this;
  },
  submitBill: function (event) {
    event.preventDefault()
    var billAttrs = $(event.target).serializeJSON()['bill']

    this.collection.create(billAttrs, {
      success: function (model) {
        //TODO: add validations on bill model
        BillSplit.router.navigate('/bills/' + model.id, {
          trigger: true
        })
      }
    });
  },
  template: JST['bills/new']
})