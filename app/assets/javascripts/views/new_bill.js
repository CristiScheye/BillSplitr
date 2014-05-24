window.BillSplit.Views.NewBill = Backbone.CompositeView.extend({
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

  events: {
    'submit form#new-bill' : 'submitBill',
    'click #add-share-form' : 'addShareForm',
    'focus #bill-date' : 'displayCalendar'
  },

  template: JST['bills/new'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addShareForm: function (event) {
    this.share_count += 1
    var newBillShare = new BillSplit.Views.NewBillShare({
      users: this.users,
      count: this.share_count
    });
    this.addSubview('#new-bill-share', newBillShare)
  },

  displayCalendar: function (event) {
    $(event.target).datepicker({ maxDate: 0 });
  }

  submitBill: function (event) {
    event.preventDefault()
    var billAttrs = $(event.target).serializeJSON()

    this.collection.create(billAttrs, {
      success: function (model) {
        //TODO: add validations on bill model
        BillSplit.router.navigate('/bills/' + model.id, {
          trigger: true
        })
      }
    });
  }
});