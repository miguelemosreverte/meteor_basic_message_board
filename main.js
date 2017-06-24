Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {

  Meteor.subscribe("messages");
}

if (Meteor.isServer) {

  Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {timestamps: -1}});
  });
}
