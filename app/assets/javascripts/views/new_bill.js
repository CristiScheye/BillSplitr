window.BillSplit.Views.NewBill = Backbone.CompositeView.extend({
  addShareForm: function (event) {
    debugger;
    this.share_count += 1
    var newBillShare = new BillSplit.Views.NewBillShare({
      users: this.users,
      count: this.share_count
    });
    this.addSubview('#new-bill-share', newBillShare)
  },
  events: {
    'submit form#new-bill' : 'submitBill',
    'click #add-share-form' : 'addShareForm'
  },
  initialize: function (options) {
    this.users = options.users;
    this.users.fetch()

    this.share_count = 0;

    var newBillShare = new BillSplit.Views.NewBillShare({
      users: this.users,
      count: this.share_count
    });
    this.addSubview('#new-bill-share', newBillShare)
  },
  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  submitBill: function (event) {
    event.preventDefault()
    var billAttrs = $(event.target).serializeJSON()

    debugger;

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