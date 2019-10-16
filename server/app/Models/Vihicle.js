'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vihicle extends Model {
  User () {
    return this.belongsTo('App/Models/User')
  }

  VihicleType () {
    return this.belongsTo('App/Models/VihicleType')
  }
}

module.exports = Vihicle
