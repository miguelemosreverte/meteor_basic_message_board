Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {

  Meteor.subscribe("messages");

  Template.input.events({
    'click .sendMsg': function(e) {
       _sendMessage();
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
}

if (Meteor.isServer) {

  Messages.allow({
    insert: function (userId, doc) {
      return (userId !== null);
    }
  });
  Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {timestamps: -1}});
  });
}
