window.BillSplit.Views.NewBill = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.shareCount = 0;
    this.shareType = 'split-even'
    this.listenTo(this.collection, 'invalid', this.errorMsg)

    this.users = options.users;
    this.users.fetch();
  },

  events: {
    'submit form#new-bill' : 'submitBill',
    'click #add-share-form' : 'addShareForm',
    'focus #bill-date' : 'displayCalendar',
    'click ul#share-type' : 'toggleAmountField',
    'focusout #bill_amount' : 'calculateEvenSplit'
  },

  template: JST['bills/new'],

  render: function () {
    var that = this;
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    var $slider = this.$el.find('#share-type-slider')
    $slider.slider({
      change: function (event, ui) {
        that.toggleAmountField(event, ui);
      },
      stop: function (event, ui) {
        //snaps to either side of the slide bar
        if (ui.value < 50){
          $slider.slider('value', 0);
        } else {
          $slider.slider('value', 100);
        }
        return false;
      }
    });

    return this;
  },

  addShareForm: function (event) {
    var newBillShare = new BillSplit.Views.NewBillShare({
      users: this.users,
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
    $(event.target).datepicker({ maxDate: 0 });
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
    $(event.currentTarget).find('li').toggleClass('active')
    this.shareType = $(event.target).attr('data-id')
    this.formatAmountFields();
  },

  calculateEvenSplit: function () {
    var $shareAmounts = this.$el.find('.split-even');
    var $total = this.$el.find('#bill_amount');
    var subTotals = accounting.formatNumber((parseFloat($total.val()) / (this.shareCount + 1)), 2) || 0
    $shareAmounts.val(subTotals);
  }
});
