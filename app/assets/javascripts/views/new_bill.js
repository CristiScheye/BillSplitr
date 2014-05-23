window.BillSplit.Views.NewBill = Backbone.View.extend({
  events: {
    'submit form#new-bill' : 'submitBill',
  },
  initialize: function (options) {
    this.users = options.users;
    this.listenTo(this.users, 'sync', this.render);
  },
  render: function () {
    var content = this.template({
      users: this.users
    });
    this.$el.html(content);
    return this;
  },
  submitBill: function (event) {
    event.preventDefault()
    var form = $(event.target).serializeJSON()
    var billAttrs = form['bill']

    debugger;


    this.collection.create(billAttrs);
  },
  template: JST['bills/new']
})