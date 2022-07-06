module.exports = {
  home: function (req, res) {
    return res.view('pages/homepage');
  },

  login: function(req, res) {
    if (req.user) {return res.redirect('pages/home');}
    return res.view('pages/login');
  },

  register: function(req, res) {
    return res.view('pages/register');
  },

  profile: function(req, res) {
    return res.view('pages/profile');
  }
  createuser: function(req,res) {
    return res.view('pages/createuser')
  }
};
