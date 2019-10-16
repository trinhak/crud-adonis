'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VihicleSchema extends Schema {
  up () {
    this.create('vihicles', (table) => {
      table.increments()
      table.string('license_plate', 10).notNullable();
      table.string('manufatory', 30);
      table.string('made_in', 50);
      table.date('registration_date');
      table
        .integer('type_id')
        .unsigned()
        .references('id')
        .inTable('vihicle_types');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.timestamps()
    })
  }

  down () {
    this.drop('vihicles')
  }
}

module.exports = VihicleSchema
