window.BillSplitr.Views.Summary = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.userBalances = options.userBalances;
    this.listenTo(this.userBalances, 'sync', this.render)
  },
  events: {
    'click button.edit-balance' : 'showModal',
    'click #edit-modal-confirmation' : 'editBalance',
    'click .bills-index' : 'toggleBillHistory'
  },

  template: JST['layouts/summary'],

  render: function () {
    var totals = this.userBalances.currentUserTotals();
    var content = this.template({
      userBalances: this.userBalances,
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

      var otherUser = BillSplitr.users.get(userId);
      var currentUser = BillSplitr.users.get(BillSplitr.currentUser.id);

      $('#modal-other-user-data').html(otherUser.escape('name'));
      $('#modal-current-user-data').html(currentUser.escape('name'));
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
        view.userBalances.fetch();
      }
    })
  },

  toggleBillHistory: function (event) {
    var userId = $(event.currentTarget).attr('data-index');
    var subs = this.subviews('#bill-history-' + userId);
    if (subs.length === 0) {
      this.addBillHistory(userId)
    } 
  },

  addBillHistory: function (userId) {
    var view = this;
    var userId = userId;

    var bill_shares = new BillSplitr.Collections.BillShares();
    this.listenTo(bill_shares, 'sync', this.syncBalances)
    bill_shares.fetch({
      data: {
        user_id: userId
      },
      success: function (res) {
        var billsIndex = new BillSplitr.Views.BillSharesIndex({
          collection: res
        });
        view.addSubview('#bill-history-' + userId, billsIndex);
      }
    })
  },
  syncBalances: function() {
    this.userBalances.fetch();
  }
})
