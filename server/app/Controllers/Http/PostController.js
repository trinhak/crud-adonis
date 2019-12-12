'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User');

class PostController {
  async getCategories({ response }) {
    try {
      const categories = await Database.table('categories');
      return response.status(200).json({"categories": categories})
    } catch (error) {
      return response.status(400).json({"message": error})
    }
  }

  async create({ request, response }) {
    try {
      const { name, description, image, userId, categoryId } = request.all();
      const dataPost = {
        name_post: name,
        description_post: description,
        image_url: image,
        user_id: userId,
        category_id: categoryId
      };
      await Post.create(dataPost)
      return response.status(200).json({"data": dataPost})
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({"message": error})
    }
  }

  async getPostByUserId({ request, response }) {
    try {
      const { page, id } = request.get();
      const posts = await Post
        .query()
        .with('user', (builder) => {
          builder.setHidden(['password'])
          .with('profile')
        })
        .where('user_id', id)
        .where('isDelete', 0)
        .paginate(page, 10)
      return response.status(200).json({"data": posts});
    } catch (error) {
      console.log('error', error);
      return response.status(400).json({"message": error})
    }
  }

  async getAllPost({ request, response }) {
    try {
      const { page } = request.get();
      const posts = await Post
        .query()
        .with('user', (builder) => {
          builder.setHidden(['password'])
          .with('profile')
        })
        .with('favorited')
        .withCount('favorited')
        .where('isDelete', 0)
        .orderBy('created_at', 'DESC')
        .paginate(page, 10)
      return response.status(200).json({"data": posts});
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({"message": error})
    }
  }
  async deletePost({ request, response }) {
    try {
      const { id, userId } = request.get();
      const user = await User.find(userId)
      console.log('postId', id)
      console.log('userId', userId)
      await user.posts().where('id', id).update({ isDelete: 1 })
      return response.status(200).json({"message": 'sucess'})
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({"message": error})
    }
  }
}

module.exports = PostController
