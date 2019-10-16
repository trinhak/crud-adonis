'use strict'

class UserController {
  async create ({ auth, session, request, response }) {
    const data = request.only(['username', 'email', 'password'])
    console.log(data)
  }
}

module.exports = UserController
