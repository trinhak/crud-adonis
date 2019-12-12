'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  category () {
    return this.belongsTo('App/Models/Category')
  }
  favorited () {
    return this.belongsToMany('App/Models/User').pivotTable('favorites')
  }
}

module.exports = Post
