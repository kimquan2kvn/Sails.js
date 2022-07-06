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
        }).populate('class').then(user=>{
          res.json(user);
        });
      }else {
        resErr(req,res,'Not permission!');
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
          resOK(req,res, data);
        }).catch(err=>{
          resErr(req,res,err);
        });
      }else{
        resErr(req,res,'Not permission!');
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
        Student.validStudent(name,birthday,city,district,village);
        let newStudent = {
          teacher: req.data.id,
          classroom: classid,
          name: name,
          birthday : birthday,
          city :  city,
          district : district,
          village : village,
          role: 'student'
        };
        console.log(typeof(classroom));
        await Student.create(newStudent);
        resOK(req,res);
      }
      else {
        resErr(req,res,'Not permission!');
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
        resOK(req,res);
      }
      else {
        resErr(req,res);
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
          return resOK(req,res, result);
        }else{
          return resErr(req,res,'Data not found');
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
        return resOK(req,res);
      }
      var baseUrl = sails.config.custom.baseUrl;

      Student.update(studenId, {
        file: require('util').format('%s/user/avatar/%s', baseUrl, studenId),
      }) .exec((err) => {
        if (err) {return  resErr(req,res,err);}
        resOK(req,res);
      });
    });
  },

  addClass: async function(req,res) {
    
    let studenId = req.params.id;
    Student.validParams(studenId);
    let classroom1 = req.body.classroom;
    let classid = await Class.findOne({name: classroom1});
    classroom

    await Studen.addToCollection(studenId,'classlists',)
    resOK(req,res);
  }
};

