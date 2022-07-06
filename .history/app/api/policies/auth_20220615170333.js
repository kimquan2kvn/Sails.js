module.export = {
    try {
        const authorization = (req, res, next) => {
            const token = req.cookies.access_token;
            if (!token) {
              return res.sendStatus(403);
            }
            try {
              const data = jwt.verify(token, "YOUR_SECRET_KEY");
              // Almost done
            } catch {
              return res.sendStatus(403);
            }
          };
    } catch () {
        
    }
}