'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VihicleTypeSchema extends Schema {
  up () {
    this.create('vihicle_types', (table) => {
      table.increments()
      table.string('name', 40).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vihicle_types')
  }
}

module.exports = VihicleTypeSchema
