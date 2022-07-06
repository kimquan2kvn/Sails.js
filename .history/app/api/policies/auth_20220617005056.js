module.exportst = {
    authenticateToken:(req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = req.cookies.access_token;
        if (!token) {
            return res.sendStatus(403);
        }
           const data = jwt.verify(token, 'sails.config.sessionSecret');
        
}