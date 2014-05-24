window.BillSplit.Views.NewBillShare = Backbone.View.extend({
  initialize: function (options) {
    this.count = options.count;
    this.users = options.users;
    this.listenTo(this.users, 'sync', this.render);
  },

  events: {
    'submit form#new-share-form' : 'handleNewShare'
  },

  template: JST['bill_shares/new'],

  render: function () {
    var content = this.template({
      users: this.users,
      count: this.count
    });
    this.$el.html(content);
    return this;
  },

  handleNewShare: function (event) {
    event.preventDefault();
    var billShareAttrs = $(event.target).serializeJSON()
    debugger;
  }
});