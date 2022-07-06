/**
 * ClassController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Student = require("../models/Student");

module.exports = {
  listClass: async (req, res) => {
    try{
      await Student.
      const classList = await Class.find().populate('students');
      res.status(200).send(classList);
    }catch(err ) {
      console.log(err);
    }
  },

  createClass:async function(req,res){
    try {
      if(req.data.role === 'teacher') {
        let newClass = {
          name: req.body.name,
        };
        await Class.create(newClass);
        res.json({code: 0 , message: 'Success'});
      }else {
        res.json({code: 1, message:'Not permission!'});
      }
    } catch (error) {
      console.log(error);
    }
  },

  editClass: async function(req,res) {
    try {
      let classID = req.params.id;
      Class.validParams(classID);
      if( req.data.role === 'teacher') {       
        await Class.updateOne({id:classID}).set({
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


  deleteClass : async (req,res)=>{
    try{
      let classID = req.params.id;
      Class.validParams(classID);
      if(req.data.role === 'teacher'){
        let result = await Class.destroyOne({_id : classID});
        if(result){
          return res.status(200).json({code: 0 , message:'Delete Success'});
        }else{
          return res.status(404).json({code: 1, message:'Data not found'});
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

