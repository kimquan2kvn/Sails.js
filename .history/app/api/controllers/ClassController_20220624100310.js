/**
 * ClassController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  createClass:async function(req,res,next){
    try {
      if(req.data.role === 'teacher') {
        let newClass = {
          name: req.body.name,
        };
        await Class.create(newClass);
        res.json({code: 0 , message: 'Success'});
      }else {
        res.json({code:1, message:'Not permission!'});
      }
    } catch (error) {
      console.log(error);
    }
  },

  editClass: async function(req,res) {
    try {
      var idClass = req.params.id;
      if( req.data.role === 'teacher') {       
        await Class.updateOne({id:idClass}).set({
          name: req.body.name,
        });
        res.json({code: 0 , message: 'Edit Success'});
      }
      else {
        res.json({code:1, message:'Not permission!'});
      }
    } catch (error) {
      console.log(error);
    }
  },


  deleteClass : async (req,res,next)=>{
    try{
      var idClass = req.params.id;
      var x= 1;
      
      x=1
      if(req.data.role === 'teacher'){
        let result = await Class.destroyOne({_id : idClass});
        if(result){
          return res.status(200).json({code: 0 , message:'Delete Success'});
        }else{
          return res.status(404).json({code:1, message:'Data not found'});
        }
      }
      else{
        res.json({code:1, message:'Not permission!'});

      }
    }catch(error){
      console.log(error);
    }
  },
};

