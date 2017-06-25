Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Meteor.subscribe("messages");

  Template.input.events({
    'click .sendMsg': function(e) {
       _sendMessage();
    },
    'keyup #msg': function(e) {
      if (e.type == "keyup" && e.which == 13) {
        _sendMessage();
      }
    },
    'click .deleteMsg': function(e) {
       _deleteMessage(this._id);
    }
  });

  Template.message.events({
    "click .delete": function () {
            Meteor.call("deleteMessage", this._id);
    }
  });

  _sendMessage = function() {
    var el = document.getElementById("msg");
    Messages.insert({user: Meteor.user().username, msg: el.value, timestamps: new Date()});
    el.value = "";
    el.focus();
  };

  Template.messages.helpers({
    messages: function() {
      return Messages.find({}, {sort: {timestamps: -1}});
    }
  });

  Template.registerHelper('isUser', function (username) {
       return username === Meteor.user().username;
  });

}

if (Meteor.isServer) {

  Meteor.startup(function () {
    Messages.remove({});

    Meteor.methods({
  	  'deleteMessage' : function(id){
  	    Messages.remove(id);
  	  }
  	});
  });

  Messages.allow({
    insert: function (userId, doc) {
      return (userId !== null);
    }
  });
  Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {timestamps: -1}});
  });
}
