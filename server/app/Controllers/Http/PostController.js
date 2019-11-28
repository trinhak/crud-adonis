'use strict'

const Database = use('Database')

class PostController {
  async getCategories({ response }) {
    try {
      const categories = await Database.table('categories');
      console.log('categories', categories)
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

      const post = Database.table('posts').insert(dataPost)
      return response.status(200).json({"data": post})
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({"message": error})
    }
  }
}

module.exports = PostController
