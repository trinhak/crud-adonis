'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next, error) {
    if (error) {
      console.log('error', error)
      return response.redirect('/')
    } else {
      await next()
    }
  }
}

module.exports = ExceptionHandler
