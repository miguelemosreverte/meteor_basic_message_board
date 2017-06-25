import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});


Template.input.events({
  'click .sendMsg': function(e) {
     _sendMessage();
  },
  'keyup #msg': function(e) {
    if (e.type == "keyup" && e.which == 13) {
      _sendMessage();
    }
  },
});

_sendMessage = function() {
  var el = document.getElementById("msg");
  Tasks.insert({user: Meteor.user().username, msg: el.value, timestamps: new Date()});
  el.value = "";
  el.focus();
};
