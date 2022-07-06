/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  //   /***************************************************************************
  //   *                                                                          *
  //   * Default policy for all controllers and actions, unless overridden.       *
  //   * (`true` allows public access)                                            *
  //   *                                                                          *
  //   ***************************************************************************/

  //   // '*': true,

  UsersController: {
    checkAuth: ['auth'],
  },

  StudentController: {
    listStudent: ['auth'],
    createStudent: ['auth'],
    editUsers: ['auth'],
    deleteUsers: ['auth'],
    search:['auth'],
    upload:['auth'],
  },

  ClassController:{
    createClass:['auth'],
    editClass:['auth'],
    deleteClass:['auth'],
  },
};
