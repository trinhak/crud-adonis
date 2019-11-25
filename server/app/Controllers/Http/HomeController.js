'use strict'

class HomeController {
  index ({ request, response , view }) {
    try {
      console.log('vo day')
      return view.render('home');
    } catch (error) {
      return view.render('login')
    }
  }
}

module.exports = HomeController
