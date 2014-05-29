window.BillSplit.Views.Summary = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render)
    BillSplit.users.fetch();
  },
  events: {
    'click button.edit-balance' : 'showModal',
    'click .modal-dismiss' : 'closeModal',
    'click .bills-index' : 'toggleBillHistory'
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
    return this;
  },

  showModal: function (event) {
    $('#editModal').on('show.bs.modal', function (e) {
      var btnData = $(event.target)
      var senderId = btnData.attr('data-sender');
      var receiverId = btnData.attr('data-receiver');
      var reqType = btnData.attr('data-status');
      var amt = Math.abs(parseFloat(btnData.attr('data-amt')));

      if (senderId) {
        receiverId = BillSplit.currentUser.id;
      } else {
        senderId = BillSplit.currentUser.id;
      }

      var sender = BillSplit.users.get(senderId);
      var receiver = BillSplit.users.get(receiverId);
      var bodyText = '';

      $('#modal-sender-data').html(sender.escape('f_name') + ' ' + sender.escape('l_name'));
      $('#modal-receiver-data').html(receiver.escape('f_name') + ' ' + receiver.escape('l_name'));
      if (reqType === 'paid') {
        $('#editModalLabel').html('Payment Confirmation')
        bodyText += ' paid '
      } else if (reqType === 'void'){
        $('#editModalLabel').html('Void Confirmation')
        bodyText += ' does NOT owe '
      }
      bodyText += accounting.formatMoney(amt) + ' to '
      $('#modal-other-data').html(bodyText)
    })

    $('#editModal').modal('show');
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
