/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'PageController.home',
  '/users/login': 'PageController.login',
  '/users/register': 'PageController.register',



  'post /users/register': {
    controller: 'UsersController',
    action: 'register'
  },

  'post /users/login': {
    controller: 'UsersController',
    action: 'login'
  },

  'post /checkAuth':{
    controller: 'UsersController',
    action: 'checkAuth'
  },

  'get /listUsers': {
    controller:'UsersController',
    action: 'listUsers'
  },

  'post /createUsers': {
    controller:'UsersController',
    action: 'createUsers'
  },
  'post /editUsers/': {
    controller:'UsersController',
    action: 'editUsers'
  },

  'delete /users/:id': {
    controller: 'UsersController',
    action: 'deleteUsers'
  },

  'get /users/search': {
    controller: 'UsersController',
    action: 'search'
  },

  'post /users/upload': {
    controller: 'UsersController',
    action: 'upload'
  },

  'post /createClass': {
    controller:'ClassController',
    action: 'createClass'
  },
  'post /editClass/:id': {
    controller:'ClassController',
    action: 'editClass'
  },

  'delete /deleteClass/:id': {
    controller: 'ClassController',
    action: 'deleteClass'
  },



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // 'get /api/users': 'UsersController.login',
  // 'get /api/random-quote': 'QuoteController.getQuote',
  // 'get /api/protected/random-quote': 'QuoteController.getProtectedQuote'



};
