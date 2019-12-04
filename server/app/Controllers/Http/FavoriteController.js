'use strict'

const Favorite = use('App/Models/Favorite');

class FavoriteController {
  async create ({ request, response }) {
    try {
      const { post_id, user_id } = request.all();
      const favorite = await Favorite.create({ post_id, user_id })
      return response.status(200).json({"favorite": favorite})
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({"message": error})
    }

  }
}

module.exports = FavoriteController
