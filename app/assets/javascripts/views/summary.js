window.BillSplit.Views.Summary = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render)
  },
  events: {
    'click button.edit-balance' : 'showModal',
    'click .bills-index' : 'toggleBillHistory',
    'click .modal-dismiss' : 'closeModal',
    'click button.small-modal-show' : 'temp'
  },

  temp: function (event) {
    debugger;
    $('#myWeeModal').modal('show');
  },

  template: JST['layouts/summary'],

  render: function () {
    var totals = this.collection.currentUserTotals();
    var content = this.template({
      userBalances: this.collection,
      totals: totals
    });
    this.$el.html(content);
    this.attachSubviews();

    debugger;
    return this;
  },

  showModal: function (event) {
    $('#editModal').modal('show');
    // var senderId = $(event.target).attr('data-sender');
    // var receiverId = $(event.target).attr('data-receiver');
    //
    // if (senderId) {
    //   receiverId = BillSplit.currentUser.id;
    // } else {
    //   senderId = BillSplit.currentUser.id;
    // }
    //
    // var editModal = new BillSplit.Views.EditBalanceConfirmation({
    //   senderId: senderId,
    //   receiverId: receiverId,
    //   balance: $(event.target).attr('data-amount'),
    //   status: $(event.target).attr('data-status')
    // })

    // if user selects 'OK', call editBalance(event)
    // else do nothing
    // close modal
  },

  closeModal: function (event) {
    debugger;
    event.preventDefault();
    alert('closing modal!');
  },

  editBalance: function (event) {
    event.preventDefault();
    var view = this;
    var userId = $(event.target).attr('data-id');
    var status = $(event.target).attr('data-status')

    $.ajax({
      type: 'POST',
      url: 'api/update_balance',
      data: {
        user_id: userId,
        status: status
      },
      success: function () {
        view.collection.fetch();
      }
    })
  },

  toggleBillHistory: function (event) {
    debugger;
    var userId = $(event.currentTarget).attr('data-index');
    var subs = this.subviews('#bill-history-' + userId);
    if (subs.length === 0) {
      this.addBillHistory(userId, this.toggleCollapse)
    }
  },

  addBillHistory: function (userId, callback) {
    var view = this;
    var userId = userId;

    var bill_shares = new BillSplit.Collections.BillShares();
    this.listenTo(bill_shares, 'sync', this.syncBalances)
    bill_shares.fetch({
      data: {
        user_id: userId
      },
      success: function (res) {
        var billsIndex = new BillSplit.Views.BillSharesIndex({
          collection: res
        });
        view.addSubview('#bill-history-' + userId, billsIndex);
      }
    })
  },
  syncBalances: function() {
    this.collection.fetch();
  }
})
