var jwt = require('jsonwebtoken');
module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token === null) {
      return res.sendStatus(401);
    }
    var id = jwt.verify(token,'sails.config.sessionSecret');
    var idUser= id._id;
    Users.findOne({_id:idUser}).then(data=>{
      if(data) {
        next();
      }else{
        res.json('Not permisson');
      }
    }).catch(err=>{
        console.log(err);
    });
  }catch (error) {
    res.status(500).json(error);
  }
};
