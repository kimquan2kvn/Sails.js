module.exports = {
  resOK: (req, res, message) => {
    res.json({
      code: 0,
      message: 'Success'
    })
  },
  resErr: (req, res) => {
    res.json({
      code: 1,
      message: 'Error'
    })
  }
};

