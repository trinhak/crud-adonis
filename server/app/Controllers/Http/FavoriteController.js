'use strict'

const Post = use('App/Models/Post')
const User = use('App/Models/User');

class FavoriteController {
  async create ({ request, response }) {
    try {
      const { userId, postId } = request.all();
      const post = await Post.find(postId);
      const data = await post.favorited().wherePivot('user_id', userId).fetch();
      if (data.toJSON().length > 0) {
        await post.favorited().detach([userId])
      } else {
        await post.favorited().attach([userId])
      }
      return response.status(200).json({"message": 'sucess'})
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({"message": error})
    }
  }
}

module.exports = FavoriteController
