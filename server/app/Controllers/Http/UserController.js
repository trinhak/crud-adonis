'use strict'
const { validate } = use('Validator')
const Encryption = use('Encryption')
const Hash = use('Hash')
const Event = use('Event')
/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const User = use('App/Models/User');

class UserController {
  async create ({ auth, session, request, response }) {
    try {
      const data = request.only(['email', 'password', 'username'])
      console.log('data', data)
      await User.create(data)
      const user = await User.findBy('email', data.email)
      console.log('user', user)
      return response.status(200).json({"user": user})
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({"message": error})
    }
  };
  index ({ request, response , view }) {
    return view.render('login')
  };

  async login ({ auth, request, response, session, view }) {
    try {
      const { email, password } = request.all();
      const rules = {
        email: 'required|email',
        password: 'required',
      }
      const validation = await validate(request.all(), rules)
      if (validation.fails()) {
        return reresponse.status(400).json({ "error": validation.messages() })
      }
      await auth.attempt(email, password);
      const user = await User.findBy('email', email)
      let accessToken = await auth.generate(user)
      Object.assign(user, accessToken)
      return response.status(200).json({"user": user, "access_token": accessToken})
    } catch (error) {
      console.log('error', error);
      return response.status(400).json({ "error": error })
    }
  };

  signup ({ request, response , view }) {
    return view.render('signup')
  };

  async signout ({ request, auth, response }) {
    try {
      // const currentUser = await auth.getUser();
      const { currentUser } = request.all();
      const refreshToken = request.input(currentUser);
      await auth
          .authenticator('jwt')
          .revokeTokens([refreshToken], true)
      return response.status(200).json({"message": "logout success" })
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({ "error": error })
    }
  }
}

module.exports = UserController
