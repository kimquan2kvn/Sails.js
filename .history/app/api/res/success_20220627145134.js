module.exports = function resSuccess(data) {
  var res = this.res;
  if(data) {
    res.json({
      data: data || [],
      code: 0
    });
  }
  else {

  }
};
