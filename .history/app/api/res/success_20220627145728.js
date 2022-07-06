module.exports = function resSuccess(data) {
  var res = this.res;
  if(data) {
    res.send({
      data: data || [],
      code: 0,
      msg : 'Sucess'
    });
  }
  else {
    res.json({
      code: 1,
      msg: 'Error'
    })
  }
};
