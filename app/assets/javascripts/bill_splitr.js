window.BillSplitr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    this.balances = new BillSplitr.Collections.UserBalances();
    this.users = new BillSplitr.Collections.Friends();

    this.balances.fetch();
    this.users.fetch();

    this.router = new BillSplitr.Routers.AppRouter({
      $rootEl : $rootEl
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
    BillSplitr.initialize();
  });

Backbone.CompositeView = Backbone.View.extend({
  subviews: function(selector) {
    this._subviews = this._subviews || {}

    if(!selector) {
      return this._subviews
    } else {
      this._subviews[selector] = this._subviews[selector] || []
      return this._subviews[selector];
    }
  },

  removeSubview: function(selector, subview) {
    var index = NaN;
    _.each(this.subviews(selector), function(currentSubview, idx) {
      if (currentSubview === subview){
        index = idx;
      }
    });

    if (!isNaN(index)) {
      this.subviews(selector)[index].remove();
      this.subviews(selector).splice(index, 1);
    }
  },

  removeSubviews: function(selector) {
    this._subviews[selector] = [];
    this.$(selector).empty();
  },

  addSubview: function(selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview);
  },

  attachSubview: function(selector, subview) {
    this.$(selector).append(subview.render().el);
    subview.delegateEvents();
  },

  attachSubviews: function() {
    var view = this;
    _.each(this.subviews(), function(subviews, selector) {
      view.$(selector).empty();
      _.each(subviews, function(subview){
        view.attachSubview(selector, subview);
      })
    })
  },

  remove: function() {
    Backbone.View.prototype.remove.call(this);
    var view = this;
    _.each(this.subviews(), function(subviews, selector) {
      _.each(subviews, function(subview) {
        subview.remove();
      })
    })
  },

  renderSelector: function(selector) {
    var view = this;
    view.$(selector).empty();
    _.each(this.subviews(selector), function(subview){
      view.attachSubview(selector, subview);
    })
  },

  errorMsg: function (_view, errors) {
    var errorView = new BillSplitr.Views.Errors({
      errors: errors
    });
    this.addSubview('#errors', errorView);
  },
})
