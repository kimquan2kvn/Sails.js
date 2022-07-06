/* eslint-disable callback-return */
var jwt = require('jsonwebtoken');
module.exports = 

const authasync function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null) {
      return res.sendStatus(401);
    }
    var id = jwt.verify(token,'sails.config.sessionSecret');
    var idUser= id._id;
    await Users.findOne({_id:idUser}).then(data=>{
      if(!data) {
        res.json('')
      }
      req.data = data;
      console.log(data);
      req.token = token;
    }).catch(err=>{
      console.log(err);
    });
  }catch(error) {
    res.redirect('users/login');
  }
};
