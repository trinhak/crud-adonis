'use strict'

const Cloudinary = use('App/Services/Cloudinary')

class UploadController {
  async upload ({ request, response }) {
    try {
      if(request.file('image')){
        let cloudinary_response = await Cloudinary.upload(request.file('image'))

        return response.status(200).json(cloudinary_response)
    }
    return response.status(400).json({ data: 'Please upload an Image.'})
    } catch (error) {
      console.log('UploadController', error)
      return response.status(400).json({ data: error})
    }
  }
}

module.exports = UploadController
