/* eslint-disable callback-return */
var jwt = require('jsonwebtoken');
module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token1= authHeader && authHeader.split(' ')[1];
    const token2 = req.cookies.token.split('=')[1];
    console.log(token2);
    if(token1 === null) {
      return res.sendStatus(401);
    }
    var id = jwt.verify(token1,'sails.config.sessionSecret');
    if(id) {
      next();
    }
    // var idUser= id._id;
    // await Users.findOne({_id:idUser}).then(data=>{
    //   if(data){
    //     // eslint-disable-next-line callback-return
    //     next();
    //   }else{
    //     res.json('Not permisson');
    //   }
    // }).catch(err=>{
    //   console.log(err);
    // });
  }catch(error) {
    console.log(error);
  }
};
