'use strict'
const { validate } = use('Validator')
/** @type {import('@adonisjs/ignitor/src/Helpers')} */

const User = use('App/Models/User');
const Profile = use('App/Models/Profile');
const Database = use('Database')

class UserController {
  async create ({ auth, session, request, response }) {
    try {
      const data = request.only(['email', 'password', 'username'])
      await User.create(data)
      const user = await User.findBy('email', data.email)
      const dataUser = {
        user_name: user.username,
        user_id: user.id
      }
      await Profile.create(dataUser)
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
      const userProfile = await Database
        .table('users')
        .innerJoin('profiles', 'users.id', 'profiles.user_id')
        .where('email', email)
        .first()
      console.log('userProfile', userProfile)
      let accessToken = await auth.generate(user)
      Object.assign(user, accessToken)
      return response.status(200).json({"user": userProfile, "access_token": accessToken})
    } catch (error) {
      console.log('error', error);
      return response.status(400).json({ "error": error })
    }
  };

  signup ({ request, response , view }) {
    return view.render('signup')
  };

  async signout ({ response }) {
    try {
      return response.status(200).json({"message": "logout success" })
    } catch (error) {
      console.log('error', error)
      return response.status(400).json({ "error": error })
    }
  }

  async loginSocial({ request, ally, response, auth }) {
    try {
      console.log('vo dayyyyyyyyyyy')
      const { accessToken, typeSocial } = request.all();
      console.log('accessToken', accessToken)
      console.log('typeSocial', typeSocial)
      const res = await ally.driver(typeSocial).getUserByToken(accessToken);
      // console.log('res', res);
      // const user = await User.findBy('email', res.getEmail())
      // console.log('user', user)
      // if (user) {
      //   const userProfile = await User.query().with('profile').where('email', res.getEmail()).fetch();
      //   let accessToken = await auth.generate(user)
      //   return response.status(200).json({"user": userProfile, "access_token": accessToken});
      // }
      // // create user
      const userDetails = {
        email: res.getEmail(),
        username: res.getName()
      }
      // const userCreate = auth.login(userDetail)
      // console.log('userCreate', userCreate)
      const whereClause = {
        email: res.getEmail()
      };
      const user = await User.findOrCreate(whereClause, userDetails);
      let profileData = await Profile.findBy('user_id', user.id);
      if (!profileData) {
        profileData = await user.profile().create({ user_name: res.getName(), avatar: res.getAvatar() })
      }
      const inforUser = await user.profile().fetch();
      let token = await auth.generate(user)
      Object.assign(user, token)
      return response.status(200).json({"user": {inforUser, email: res.getEmail()}, "access_token": token });
    } catch (error) {
      console.log('error', error)
    }
  }
}

module.exports = UserController
