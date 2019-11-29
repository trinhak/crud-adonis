'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.post('users/upload', 'UserController.upload')

Route.get('home', 'HomeController.index').middleware('auth')
Route.post('upload', 'UploadController.upload')

Route.group(() => {
  Route.get('signup', 'UserController.signup')
  Route.post('create', 'UserController.create')
  Route.post('login', 'UserController.login')
  Route.post('signout', 'UserController.signout').middleware(['auth'])
}).prefix('users')

Route.group(() => {
  Route.get('categories', 'PostController.getCategories')
  Route.post('create', 'PostController.create')
  Route.get('get-post-by-userId', 'PostController.getPostByUserId')
}).prefix('posts')
  .middleware(['auth'])
