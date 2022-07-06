/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  listStudent: function (req,res){
    try {
      if(req.data.role === 'teacher'){
        Student.find({},(err,student)=>{
          if(err){
            return res.json({code: 1 , message: 'Server Error'});
          }
          return res.json({code: 0 , message: 'Success', student:student});
        });
      }else {
        res.json({code: 1 , message:'Not permission!'});
      }
    } catch (error) {
      console.log(error);
    }
  },

  searchInfo: async function(req,res) {
    try {
      if(req.data.role === 'student' || req.data.role === 'teacher'){
        let {namsinh_search,hoten_search,tinh_search,huyen_search,xa_search}= req.query;
        await Student.find({
          where: {
            namsinh: namsinh_search,
            hoten: hoten_search,
            tinh:tinh_search,
            huyen:huyen_search,
            xa: xa_search,
          }
        }).then(data=>{
          res.json({code: 0, message: 'Success', data});
        }).catch(err=>{
          res.json(err);
        });
      }else{
        res.json({code: 1 , message:'Not permission!'});
      }
    } catch (error) {
      console.log(error);
    }
  },

  createStudent:async function(req,res){
    try {
      if(req.data.role === 'teacher') {
        const
        let newStudent = {
          hoten: req.body.hoten,
          lop : req.body.lop,
          namsinh : req.body.namsinh,
          tinh :  req.body.tinh,
          huyen : req.body.huyen,
          xa : req.body.xa,
          role: 'student'
        };
        await Student.create(newStudent);
        res.json({code: 0 , message: 'Success'});
      }
      else {
        res.json({code: 1 , message: 'Not permission!'});
      }
    } catch (error) {
      console.log(error);
    }
  },

  editStudent: async function(req,res){
    try {
      if(req.data.role === 'teacher') {
        var idStuden = req.params.id;
        await Student.updateOne({id:idStuden}).set({
          hoten: req.body.hoten,
          lop : req.body.lop,
          namsinh : req.body.namsinh,
          tinh :  req.body.tinh,
          huyen : req.body.huyen,
          xa : req.body.xa
        });
        res.json({code: 0 , message: 'Success'});
      }
      else {
        res.json({code: 1 , message: 'Not permission!'});
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteStudent : async (req,res)=>{
    try{
      var idStuden = req.params.id;
      if(req.data.role === 'teacher'){
        let result= await Student.destroyOne({_id : idStuden});
        if(result){
          return res.status(200).json({code: 0 , message: 'Success', student:result});
        }else{
          return res.status(404).json({code: 1 , message:'Data not found'});
        }
      }
      else{
        res.json({code: 1 , message: 'Not permission!'});
      }
    }catch(error){
      console.log(error);
    }
  },

  uploadAvatar: function (req, res) {
    var idStuden = req.params.id;
    req.file('avatar').upload({
      maxBytes: 10000000
    },function whenDone(err, upload) {
      if (err) {
        return res.serverError(err);
      }
      if (upload.length === 0){
        return res.json({code: 1 , message: 'No file was uploaded'});
      }
      var baseUrl = sails.config.custom.baseUrl;

      Student.update(idStuden, {
        file: require('util').format('%s/user/avatar/%s', baseUrl, idStuden),
      }) .exec((err) => {
        if (err) {return res.serverError(err);}
        res.json({code: 0 , message: 'Success'});
      });
    });
  },

};

