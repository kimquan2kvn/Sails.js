module.exportst = {
    authorization:(req, res, next) => {
        const token = req.cookies.access_token;
        if (!token) {
            return res.sendStatus(403);
        }
        try {
            const data = jwt.verify(token, 'sails.config.sessionSecret');
            // Almost done
        }atch {
            return res.sendStatus(403);
        }
    },
}