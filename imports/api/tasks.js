import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {

  Meteor.startup(function () {
    Tasks.remove({});

    Meteor.methods({
      'deleteMessage' : function(user, taskId){
        owner = Tasks.findOne(taskId).user
        if (user === owner){
            Tasks.remove(taskId);
        }
      }
    });
  });

  Tasks.allow({
    insert: function (userId, doc) {
      return (userId !== null);
    }
  });
  Meteor.publish("tasks", function () {
    return Tasks.find({}, {sort: {timestamps: -1}});
  });

}
