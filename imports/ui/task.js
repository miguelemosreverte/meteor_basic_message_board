import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './task.html';

Template.task.helpers({
  isOwner(username) {
    return username === Meteor.user().username;
  },
});

Template.task.events({
  'click .delete'() {
    Meteor.call('deleteMessage', this._id);
  }
});
