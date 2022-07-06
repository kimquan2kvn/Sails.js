/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  listStudent: function (req,res,next){
    try {
      if(req.data.role === 'admin'){
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
      if(req.data.role === 'user' || req.data.role === 'admin'){
        var namsinh_search = req.query.namsinh;
        var hoten_search = req.query.hoten;
        var tinh_search = req.query.tinh;
        var huyen_search = req.query.huyen;
        var xa_search = req.query.xa;
        await Student.find({
          where: {
            namsinh: namsinh_search,
            firstName:firstName_search,
            lastName:lastName_search,
            tinh:tinh_search,
            huyen:huyen_search,
            xa: xa_search,
          }
        }).then(data=>{
          res.json(data);
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

  createStudent:async function(req,res,next){
    try {
      if(req.data.role === 'admin') {
        let newStudent = {
          hoten: req.body.hoten,
          lop : req.body.lop,
          namsinh : req.body.namsinh,
          tinh :  req.body.tinh,
          huyen : req.body.huyen,
          xa : req.body.xa
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

  editStudent: async function(req,res,next){
    try {
      if(req.data.role === 'admin') {
        await Student.update({_id:req.data.id}).set({
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

  deleteStudent : async (req,res,next)=>{
    try{
      var idUser = req.params.id;
      if(req.data.role === 'admin'){
        let result= await Student.destroyOne({id : idUser});
        if(result){
          return res.status(200).json(        res.json({code: 0 , message: 'Success'});, data:result});
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

  upload: function (req, res) {
    req.file('avatar').upload({
      maxBytes: 10000000
    },function whenDone(err, upload) {
      if (err) {
        return res.serverError(err);
      }

      if (upload.length === 0){
        return res.badRequest('No file was uploaded');
      }

      var baseUrl = sails.config.custom.baseUrl;
      var userId = req.data.id;


      Users.update(userId, {

        // Generate a unique URL where the avatar can be downloaded.
        file: require('util').format('%s/user/avatar/%s', baseUrl, userId),

        // Grab the first file and use it's `fd` (file descriptor)
        // avatarFd: uploadedFiles[0].fd
      })
          .exec((err) => {
            if (err) {return res.serverError(err);}
            return res.ok();
          });
    });
  },

};

