'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Favorite extends Model {
  user () {
    return this.belongsToMany('App/Model/User')
  }
  post () {
    return this.belongsToMany('App/Model/Post')
  }
}

module.exports = Favorite
