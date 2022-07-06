module.exports = {
    getQuote: function(req, res) {
        return res.json({ quote: sails.helpers.quoter() });
    },

    getProtectedQuote: function(req, res) {
        return res.json({ quote: sails.helpers.quoter() });
    }
};