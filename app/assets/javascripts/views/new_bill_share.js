window.BillSplitr.Views.NewBillShare = Backbone.View.extend({
  initialize: function (options) {
    this.count = options.count;
    this.user = options.user;
  },

  events: {
    'click .remove-billshare' : 'removeShareForm'
  },

  template: JST['bill_shares/new'],

  render: function () {
    var content = this.template({
      user: this.user,
      count: this.count,
    });
    this.$el.html(content);
    return this;
  },

  removeShareForm: function (event) {
    this.trigger('removeShareForm', this)
  },
});
