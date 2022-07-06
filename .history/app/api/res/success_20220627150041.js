module.exports = function resOk(data) {
  var res = this.res;
  if(data) {
    res.send({
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
