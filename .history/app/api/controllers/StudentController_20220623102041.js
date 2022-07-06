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
        Users.find({},(err,user)=>{
          if(err){
            return res.serverError({
              success:false,
              message:'Server Error'
            });
          }
          return res.json({
            success:true,
            user:user
          });
        });
      }else {
        res.json('Not permission!');
      }
    } catch (error) {
      console.log(error);
    }
  },

  search: async function(req,res) {
    try {
      if(req.data.role === 'user' || req.data.role === 'admin'){
        var namsinh_search = req.query.namsinh;
        var firstName_search = req.query.firstName;
        var lastName_search= req.query.lastName;
        var tinh_search = req.query.tinh;
        var huyen_search = req.query.huyen;
        var xa_search = req.query.xa;
        await Users.find({
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
        res.json('Not permission!');
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

  editUsers: async function(req,res,next){
    try {
      await Users.update({_id:req.data.id}).set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email:req.body.email,
        lop : req.body.lop,
        namsinh : req.body.namsinh,
        tinh :  req.body.tinh,
        huyen : req.body.huyen,
        xa : req.body.xa
      });
      res.json('Edit Success');
    } catch (error) {
      console.log(error);
    }
  },

  deleteUsers : async (req,res,next)=>{
    try{
      var idUser = req.params.id;
      if(req.data.role === 'admin'){
        let result= await Users.destroyOne({id : idUser});
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

