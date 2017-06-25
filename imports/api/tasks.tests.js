/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const valid_user = 'tmeasday';
      const invalid_user = 'intruder';
      let taskId;

      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          msg: 'test task',
          timestamps: new Date(),
          user: 'tmeasday',
        });
      });//beforeEach

      it('can delete owned task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers['deleteMessage'];

        deleteTask.apply(valid_user, [taskId]);

        assert.equal(Tasks.find().count(), 0);
      });//it

      it('cant delete not owned task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers['deleteMessage'];

        deleteTask.apply(invalid_user, [taskId]);

        assert.equal(Tasks.find().count(), 1);
      });//it

      it('insert owned task', () => {
        // Verify that the method does what we expected
        assert.equal(Tasks.find().count(), 1);
      });//it



    });//describe('methods'

  });//describe('Tasks'
}
