module.exports = function (req, res, next) {
//   let accesToken = req.headers.cookie.split('=')[1];
  let token = req.headers['authorization'];

  if(token.startWith('Bearer ')){
    token = token.splice(7,0,token.length);
    if(token){
        jwt.verify(token,'sails.config.sessionSecret',(err,decoded)=>{
            if(err){
                return res.json({
                     success:false,
                     message:'Token is not right ..'
                });
            }
            else{
                req.decoded =decoded;
                next();
            }
        });
    }else{
        return res.json({
            success: false,
            message:'Token is not right ..'

        })
    }
    }
}
