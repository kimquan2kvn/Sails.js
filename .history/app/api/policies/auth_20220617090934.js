module.exports = function (req, res, next) {
//   let accesToken = req.headers.cookie.split('=')[1];
    const authHeader = req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1]
    if(token == null)return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err)return res.sendStatus(403)
        req.user=user
        next()
    }
    )
};
