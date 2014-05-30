window.BillSplitr.Views.Errors = Backbone.View.extend({
  initialize: function (options) {
    this.errors = options.errors;
  },
  template: JST['shared/errors'],
  className: 'alert alert-danger',
  render: function () {
    var content = this.template({
      errors: this.errors
    });
    this.$el.html(content);
    return this;
  }
})