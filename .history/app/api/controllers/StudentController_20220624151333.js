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
        res.json({code: 1 , message:'Not permission!'});
      }
    } catch (error) {
      console.log(error);
    }
  },

  createStudent:async function(req,res){
    try {
      let idClass = req.params.idClass
      let  = await Class.findOne({id: idClass}).
      console.log(rs);
      if(req.data.role === 'teacher') {
        const{name,classroom,birthday,city,district,village} = req.body;
        let newStudent = {
          name: name,
          classroom: classroom,
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
        res.json({code: 1 , message: 'Not permission!'});
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
        res.json({code: 1 , message: 'Not permission!'});
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
        res.json({code: 1 , message: 'Not permission!'});
      }
    }catch(error){
      console.log(error);
    }
  },

  uploadAvatar: function (req, res) {
    let studenId = req.params.id;
    Student.validParams(studenId);
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

      Student.update(studenId, {
        file: require('util').format('%s/user/avatar/%s', baseUrl, studenId),
      }) .exec((err) => {
        if (err) {return res.serverError(err);}
        res.json({code: 0 , message: 'Success'});
      });
    });
  },

};

