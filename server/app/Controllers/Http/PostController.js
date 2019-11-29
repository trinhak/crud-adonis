'use strict'

const Database = use('Database')

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
      console.log('description', description)
      const dataPost = {
        name_post: name,
        description_post: description,
        image_url: image,
        user_id: userId,
        category_id: categoryId
      };
      console.log('vo day')
      await Database.table('posts').insert(dataPost)
      return response.status(200).json({"data": dataPost})
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({"message": error})
    }
  }

  async getPostByUserId({ request, response }) {
    try {
      const { userId, currentPage } = request.all();
      const data = await Database.table('posts').where('user_id', userId).paginate(currentPage, 10)
      return response.status(200).json({"data": data});
    } catch (error) {
      console.log('error', error);
      return response.status(400).json({"message": error})
    }
  }
}

module.exports = PostController
