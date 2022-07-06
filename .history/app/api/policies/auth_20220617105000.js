var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token === null) {
      return res.sendStatus(401);
    }
    var idUser = jwt.verify(token,'sails.config.sessionSecret');
    var id(idUser._id);
    Users.findOne({_id:idUser}, (_err,data)=>{
      if(data) {
        console.log(data);
      }else{
        res.json('Not permisson');
      }
    });
  }catch (error) {
    res.status(500).json(error);
  }
};
