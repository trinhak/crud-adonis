'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProfileSchema extends Schema {
  up() {
    this.create('profiles', table => {
      table.increments();
      table.string('user_name', 200).nullable();
      table.bigInteger('identify_card_number').nullable();
      table.string('phone', 50).nullable();
      table.boolean('gender').nullable();
      table.string('address', 200).nullable();
      table.string('city', 50).nullable();
      table.string('country', 50).nullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.timestamps();
    });
  }

  down() {
    this.drop('profiles');
  }
}

module.exports = ProfileSchema;
