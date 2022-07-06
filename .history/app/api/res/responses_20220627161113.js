module.exports = {
  resOK: (req, res, data) => {
    res.json({
      code: 0,
      message: 'Success',
      data: data
    })
  },
  resErr: (req, res,) => {
    res.json({
      code: 1,
      message: 'message'
    })
  }
};

