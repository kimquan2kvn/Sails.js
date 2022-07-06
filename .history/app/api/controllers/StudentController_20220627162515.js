/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { resOK, resErr } = require('../res/responses');

module.exports = {
  listStudent: function (req,res){
    try {
      if(req.data.role === 'teacher'){
        Student.find({teacher: req.data.id},(err,student)=>{
          if(err){
            return resErr(req,res,'Server Error');
          }
          return resOK(req,res,student);
        });
      }else {
        res.Err(req,res,'Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  searchInfo: async function(req,res) {
    try {
      if(req.data.role === 'student' || req.data.role === 'teacher'){
        let {name_search,classroom_search,city_search,district_search,village_search,birthday_search}= req.query;
        await Student.find({
          where: {
            birthday:birthday_search,
            classroom: classroom_search,
            name: name_search,
            city:city_search,
            district:district_search,
            village:village_search
          }
        }).then(data=>{
          res.json({code: 0, message: 'Success', data});
        }).catch(err=>{
          res.json(err);
        });
      }else{
        res.Err(req,res,'Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  createStudent:async function(req,res){
    try {
      let nameClass = req.params.nameClass;
      let classid = await Class.findOne({name: nameClass})
      if(req.data.role === 'teacher') {
        const{name,birthday,city,district,village} = req.body;
        let newStudent = {        
          teacher: req.data.id,
          classroom: classid.id,
          name: name,
          birthday : birthday,
          city :  city,
          district : district,
          village : village,
          role: 'student'
        };
        await Student.create(newStudent);
        res.json({code: 0 , message: 'Success'});
      }
      else {
        res.Err(req,res,'Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  editStudent: async function(req,res){
    try {
      if(req.data.role === 'teacher') {
        let studenId = req.params.id;
        Student.validParams(studenId);
        await Student.updateOne({id:studenId}).set({
          name: req.body.name,
          classroom : req.body.classroom,
          birthday : req.body.birthday,
          city :  req.body.city,
          district : req.body.district,
          village : req.body.village
        });
        res.json({code: 0 , message: 'Success'});
      }
      else {
        res.success();
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteStudent : async (req,res)=>{
    try{
      let studenId = req.params.id;
      Student.validParams(studenId);
      if(req.data.role === 'teacher'){
        let result= await Student.destroyOne({_id:studenId});
        if(result){
          return res.status(200).json({code: 0 , message: 'Success', student:result});
        }else{
          return res.status(404).json({code: 1 , message:'Data not found'});
        }
      }
      else{
        resErr(req,res,'Not permission!');
      }
    }catch(error){
      console.log(error);
    }
  },

  uploadAvatar: function (req, res) {
    let studenId = req.params.id;
    Student.validParams(studenId);
    req.file('file').upload({
      maxBytes: 10000000
    },function whenDone(err, upload) {
      if (err) {
        return res.serverError(err);
      }
      if (upload.length === 0){
        return res.json({code: 1 , message: 'No file was uploaded'});
      }
      var baseUrl = sails.config.custom.baseUrl;

      Student.update(studenId, {
        file: require('util').format('%s/user/avatar/%s', baseUrl, studenId),
      }) .exec((err) => {
        if (err) {return  resErr(req,res,err);}
        resOK(req,res,);
      });
    });
  },

};

