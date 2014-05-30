window.BillSplitr.Collections.Users = Backbone.Collection.extend({
  model: BillSplitr.Models.User,
  url: 'api/users',
  getOrFetch: function (id) {
    var user = this.get(id);

    if (!user) {
      user = new BillSplitr.Models.User({ 'id' : id })
      this.add(user)
    }

    user.fetch()

    return user;
  }
})
