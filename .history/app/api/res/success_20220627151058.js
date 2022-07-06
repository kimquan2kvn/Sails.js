module.exports = function resOK(data) {
  var res = this.res;
  if(data) {
    return res.jsonx({
      data: data || [],
      code: 0,
      msg : 'Sucess'
    });
  }
  else {
    return res.jsonx({
      code: 1,
      msg: 'Error'
    })
  }
};
