window.BillSplit.Views.BillSharesIndex = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync' , this.render);
  },

  events: {
    'click .edit-share' : 'editBillShare'
  },

  template: JST['bill_shares/index'],

  render: function () {
    var content = this.template({
      bill_shares: this.collection
    });

    this.$el.html(content);
    return this;
  },

  editBillShare: function (event) {
    debugger;
    event.preventDefault();
    var shareId = $(event.target).attr('data-id');
    var status = $(event.target).attr('data-status');

    var billShare = this.collection.get(shareId);
    billShare.set('status', status);
    billShare.save();
  }
})
