window.BillSplitr.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',
  displayName: function() {
    var str = this.escape('email');
    if(this.get('f_name') !== 'n/a') {
      str = this.escape('name') + ' | ' + str;
    }
    return str;
  }
})