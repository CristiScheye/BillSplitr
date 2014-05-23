window.BillSplit.Views.NewBillShare = Backbone.View.extend({
  className: 'form-group',
  initialize: function (options) {

  },
  render: function () {
    var content = this.template({
      users: this.users
    });
    this.$el.html(content);
    return this;
  },
  template: JST['bill_shares/new']
})