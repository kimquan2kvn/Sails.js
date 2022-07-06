module.exports = function resOK(data, options) {
  var res = this.res;
  if(data) {
    return res.send({
      data: data || [],
      code: 0,
      msg : 'Sucess'
    });
  }
  else {
    res.send({
      code: 1,
      msg: 'Error'
    })
  }
};
