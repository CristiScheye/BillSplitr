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
  },
  validate: function (attrs) {
    debugger;
    var errors = [];

    if (!attrs.sender_id) {
      errors.push("Please select the user who sent the payment");
    }

    if (!attrs.receiver_id) {
      errors.push("Please select the user who received the payment");
    }

    if (!attrs.amount) {
      errors.push('Please enter an amount')
    } else if(attrs.amount <= 0 ) {
      errors.push('Please enter an amount > 0');
    }

    if (!attrs.date) {
      errors.push('Please enter a date');
    }

    if (errors.length > 0){
      return errors;
    }
  }
})