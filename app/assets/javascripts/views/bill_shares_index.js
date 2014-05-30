window.BillSplitr.Views.BillSharesIndex = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'sync' , this.render);
  },

  events: {
    'click button.edit-share' : 'showModal',
    'click #edit-modal2-confirmation' : 'editBillShare',
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
    event.preventDefault();
    $('#editModal2').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    var shareId = $(event.target).attr('data-id');
    var status = $(event.target).attr('data-status');

    var billShare = this.collection.get(shareId);
    billShare.set('status', status);
    billShare.save();
  },


  showModal: function (event) {
    $('#editModal2').on('show.bs.modal', function (e) {
      var btnData = $(event.target)
      var lenderId = btnData.attr('data-lender');
      var debtorId = btnData.attr('data-debtor');
      var status = btnData.attr('data-status');
      var amt = Math.abs(parseFloat(btnData.attr('data-amt')));
      var description = btnData.attr('data-description');
      var billShareId = btnData.attr('data-id')

      var lender = BillSplitr.users.get(lenderId);
      var debtor = BillSplitr.users.get(debtorId);
      var glyph = 'glyphicon '
      if (status === 'paid') {
        glyph += 'glyphicon-ok';
      } else {
        glyph = 'glyphicon-remove';
      }
      debugger;
      $('#modal2-glyphicon').addClass(glyph)
      $('#modal2-lender-data').html(lender.escape('f_name') + ' ' + lender.escape('l_name'));
      $('#modal2-debtor-data').html(debtor.escape('f_name') + ' ' + debtor.escape('l_name'));
      $('.modal2-amount-data').html(accounting.formatMoney(amt));
      $('.modal2-status-data').html(status);
      $('#modal2-description-data').html(description)

      $('#edit-modal2-confirmation').attr({
        'data-id': billShareId,
        'data-status' :status
      })
    })

    $('#editModal2').modal('show');
  }
})
