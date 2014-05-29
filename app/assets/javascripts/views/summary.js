window.BillSplit.Views.Summary = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render)
    BillSplit.users.fetch();
  },
  events: {
    'click button.edit-balance' : 'showModal',
    'click #edit-modal-confirmation' : 'editBalance',
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
      var userId = btnData.attr('data-user');
      var reqType = btnData.attr('data-status');
      var amt = Math.abs(parseFloat(btnData.attr('data-amt')));

      var otherUser = BillSplit.users.get(userId);
      var currentUser = BillSplit.users.get(BillSplit.currentUser.id);

      $('#modal-other-user-data').html(otherUser.escape('f_name') + ' ' + otherUser.escape('l_name'));
      $('#modal-current-user-data').html(currentUser.escape('f_name') + ' ' + currentUser.escape('l_name'));
      $('#modal-amount-data').html(accounting.formatMoney(amt))
      // add info to confirmation for editBalance params
      $('#edit-modal-confirmation').attr({
        'data-id': userId,
        'data-status': 'paid'
      })
    })

    $('#editModal').modal('show');
  },

  editBalance: function (event) {
    event.preventDefault();
    $('#editModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

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
