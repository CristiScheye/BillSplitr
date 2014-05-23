window.BillSplit.Models.Payment = Backbone.Model.extend({
  parse: function (resp) {
    this.sender().set(resp['sender'], { parse: true });
    delete resp['sender'];

    this.receiver().set(resp['receiver'], { parse: true });
    delete resp['receiver'];

    return resp;
  },
  receiver: function () {
    this._receiver = this._receiver || new BillSplit.Models.User();
    return this._receiver;
  },
  sender: function () {
    this._sender = this._sender || new BillSplit.Models.User();
    return this._sender;
  }
})