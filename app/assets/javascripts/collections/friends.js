window.BillSplitr.Collections.Friends = Backbone.Collection.extend({
  model: BillSplitr.Models.User,
  url: 'api/friends'
})