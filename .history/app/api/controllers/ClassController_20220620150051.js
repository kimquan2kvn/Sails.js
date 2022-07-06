/**
 * ClassController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createClass:async function(req,res,next){
    try {
      if(req.data.role === 'user' || req.data.role === 'admin') {
        let newClass = {
          name: req.body.name,
        };
        await Class.create(newClass);
        res.json('Create Class Success');
      }else {
        res.json('Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  editClass: async function(req,res,next) {
    try {
        var id = req.params.id;
        await Class.update({_id:id}).set({
            firstName: req.body.firstName,
        })
    } catch (error) {
        console.log(error);
    }
  } 
};

