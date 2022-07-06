module.exportst = {
    co authorization = function(req, res, next){
        const token = req.cookies.access_token;
        if (!token) {
            return res.sendStatus(403);
        }
        try {
            const data = jwt.verify(token, 'sails.config.sessionSecret');
            // Almost done
        }catch {
            return res.sendStatus(403);
        }
    },
}