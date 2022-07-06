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
      if(req.data.role === 'user' || req.data.role === 'admin') {
        var id = req.params.id;
        await Class.update({_id:id}).set({
          name: req.body.name,
        });
      }
      else {
        res.json('Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },


  deleteClass : async (req,res,next)=>{
    try{
      var idClass = req.params.id;
      if(req.data.role === 'admin'){
        let result= await Users.destroyOne({id : idClass});
        if(result){
          return res.status(200).json({message:'Delete Success', success:true, data:result});
        }else{
          return res.status(404).json({success:false, message:'Data not found'});
        }
      }
      else{
        res.json('Not permission');
      }

    }catch(error){
      console.log(error);
    }
  },
};

