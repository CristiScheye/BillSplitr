window.BillSplit.Collections.Users = Backbone.Collection.extend({
  model: BillSplit.Models.User,
  url: 'api/users',
  getOrFetch: function (id) {
    var user = this.get(id);

    if (!user) {
      user = new BillSplit.Models.User({ 'id' : id })
      this.add(user)
    }

    user.fetch()

    return user;
  }
})
