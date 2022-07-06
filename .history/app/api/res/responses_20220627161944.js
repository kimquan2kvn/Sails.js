module.exports = {
  resOK: (req, res, data) => {
    res.json({
      code: 0,
      message: 'Success',
    })
  },

  resErr: (req, res, data) => {
    res.json({
      code: 1,
      message: 'Error',
      data: data
    })
  }
};

