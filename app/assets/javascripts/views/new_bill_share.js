window.BillSplit.Views.NewBillShare = Backbone.View.extend({
  initialize: function (options) {
    this.count = options.count;
    this.users = options.users;
    this.listenTo(this.users, 'sync', this.render);
  },

  events: {
    'click .remove-billshare' : 'removeShareForm'
  },

  template: JST['bill_shares/new'],

  render: function () {
    var content = this.template({
      users: this.users,
      count: this.count,
    });
    this.$el.html(content);
    debugger;
    this.$el.find('.chosen-select').chosen({ width: "30%" });
    return this;
  },

  removeShareForm: function (event) {
    this.trigger('removeShareForm', this)
  }

});
