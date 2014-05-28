window.BillSplit.Views.NewPayment = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.users = options.users;
    this.formType = 'from-user';

    this.listenTo(this.collection, 'invalid', this.errorMsg)
    this.listenTo(this.users, 'sync', this.render)
  },

  events: {
    'submit #new-payment' : 'submitPayment',
    'focus #payment-date' : 'displayCalendar',
    'click ul#form-type' : 'toggleForm'
  },

  template: JST['payments/new'],

  render: function () {
    var content = this.template({
      users: this.users
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  displayCalendar: function (event) {
    $(event.target).datepicker({ maxDate: 0 });
  },

  submitPayment: function (event) {
    event.preventDefault();
    this.removeSubviews('#errors'); //clear old error messages
    debugger;

    var paymentAttrs = $(event.target).serializeJSON()['payment'];
    if (this.formType = 'from-user') {
      paymentAttrs.sender_id = BillSplit.currentUser.id;
      paymentAttrs.receiver_id = $(event.target)
    }
    this.collection.create(paymentAttrs);
  },

  toggleForm: function (event) {
    debugger;
    $(event.currentTarget).find('li').toggleClass('active');
    this.formType = $(event.target).attr('data-id');
    var label = this.$el.find('label#user-select');
    var labelText = (this.formType === 'from-user' ? 'To' : 'From')
    label.html(labelText);
  }
})
