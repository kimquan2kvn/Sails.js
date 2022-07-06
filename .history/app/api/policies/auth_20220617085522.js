module.exports = function (req, res, next) {
//   let accesToken = req.headers.cookie.split('=')[1];
  let token = req.headers['authorization'];

  if(token.startWith('Bearer ')){
    token = token.splice(7,0,token.length);
  }
};
