window.BillSplit.Views.EditBalanceConfirmation = Backbone.View.extend({
  initialize: function (options) {
    this.senderId = options.senderId;
    this.receiverId = options.receiverId;
    this.balance = options.balance;
    this.status = options.status;

    this.sender = new BillSplit.Models.User();
    this.receiver = new BillSplit.Models.User();
    var view = this;

    var users = BillSplit.users.fetch({
      success: function(collection) {
        this.sender = collection.get(options.senderId);
        this.receiver = collection.get(options.receiverId);
        view.render();
        view.showModal();
      }
    });
  },

  template: JST['bill_shares/edit_balance_confirmation'],

  render: function () {
    debugger;
    var content = this.template({
      sender: this.sender,
      receiver: this.receiver,
      balance: this.balance,
      status: this.status
    })

    this.$el.html(content);
    return this;
  },

  showModal: function() {
    //clear all modals
    this.$el.find('#editModal').modal();
  }
})
