window.BillSplit.Views.NewBill = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.shareCount = 0;
    this.shareType = 'split-even'
    this.listenTo(this.collection, 'invalid', this.errorMsg);
    this.listenTo(BillSplit.users, 'sync', this.render)

    BillSplit.users.fetch();
  },

  events: {
    'submit form#new-bill' : 'submitBill',
    'focus #bill-date' : 'displayCalendar',
    'click #share-type' : 'toggleAmountField',
    'focusout #bill_amount' : 'formatAmountFields',
  },

  template: JST['bills/new'],

  render: function () {
    var that = this;
    var content = this.template({
      users: BillSplit.users
    });
    this.$el.html(content);
    this.attachSubviews();

    this.$el.find('#share-type').one('click', this.displayShareForm.bind(this))
    return this;
  },

  displayShareForm: function (event) {
    var view = this;
    this.$el.find('#bill-share-form').show();

    this.$el.find('.chosen-select').chosen({
      width: "30%",
    }).change(this.addShareForm.bind(view));
  },

  addShareForm: function (event) {
    debugger;
    var userId = $('select').val();
    var user = BillSplit.users.get(userId);
    var newBillShare = new BillSplit.Views.NewBillShare({
      user: user,
      count: this.shareCount,
    });
    this.shareCount += 1
    this.addSubview('#new-bill-share', newBillShare)
    this.listenToOnce(newBillShare, 'removeShareForm', this.removeShareForm)
    this.formatAmountFields();
  },

  removeShareForm: function (shareForm) {
    this.shareCount -= 1;
    this.removeSubview('#new-bill-share', shareForm);
    this.formatAmountFields();
  },

  displayCalendar: function (event) {
    $(event.target).datepicker();
  },

  submitBill: function (event) {
    event.preventDefault()
    this.removeSubviews('#errors'); //clear old error messages

    var billAttrs = $(event.target).serializeJSON()

    this.collection.create(billAttrs, {
      success: function (model) {
        BillSplit.router.navigate('/bills/' + model.id, {
          trigger: true
        })
      }
    });
  },

  formatAmountFields: function () {
    var $shareAmounts = this.$el.find('.share-amount');
    var $sliderText = this.$el.find('#slider-text')
    if (this.shareType === 'split-custom') {
      $shareAmounts.prop('readonly', false);
      $shareAmounts.removeClass('split-even');
      $sliderText.html("Custom").removeClass('split-even').addClass('split-custom')
    } else {
      $shareAmounts.prop('readonly', true);
      $shareAmounts.addClass('split-even');
      this.calculateEvenSplit();
      $sliderText.html("Even").addClass('split-even').removeClass('split-custom')
    }
  },

  toggleAmountField: function (event, ui) {
    debugger;
    var $billType = $(event.target)
    $billType.addClass('active')
    $billType.siblings().removeClass('active')
    this.shareType = $billType.attr('data-id')
    this.formatAmountFields()
  },

  calculateEvenSplit: function () {
    var $shareAmounts = this.$el.find('.split-even');
    var $total = this.$el.find('#bill_amount');
    var totalVal = accounting.formatNumber($total.val(), 2, '');
    $total.val(totalVal)
    var subTotals = accounting.formatNumber((totalVal / (this.shareCount + 1)), 2, '') || 0
    $shareAmounts.val(subTotals);
  },
});
