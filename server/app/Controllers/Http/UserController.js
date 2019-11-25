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
      // let token = await auth.generate(user)
      // Object.assign(user, token)
      const rules = {
        username: 'required',
        email: 'required|email|unique:users,email',
        password: 'required',
      }
      const validation = await validate(data, rules)
      if (validation.fails()) {
        session.withErrors(validation.messages()).flashAll();
        return response.redirect('back');
      }
      await User.create(data)
      const user = await User.findBy('email', email)
      session.flash({ notification: 'Signup success!! wellcom...!'  })
      let accessToken = await auth.generate(user)
      return response.status(200).json({"user": user, "access_token": accessToken})
    } catch (error) {
      session.withErrors([{ field: 'error', message: 'Already exist' }]).flashAll()
      return response.redirect('back')
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
        session.withErrors(validation.messages()).flashAll();
        return response.redirect('back');
      }
      await auth.attempt(email, password);
      const user = await User.findBy('email', email)
      let accessToken = await auth.generate(user)
      return response.status(200).json({"user": user, "access_token": accessToken})
    } catch (error) {
      console.log('error', error);
      session.withErrors([{ field: 'error', message: 'Password or email incorrect' }]).flashAll()
      return response.redirect('back')
    }
  };

  signup ({ request, response , view }) {
    return view.render('signup')
  };

  async signout ({ auth, response }) {
    try {
      console.log('method signout')
      await auth.logout()
      return response.redirect('/');
    } catch (error) {
      console.log('error', error)
    }
  }
}

module.exports = UserController
