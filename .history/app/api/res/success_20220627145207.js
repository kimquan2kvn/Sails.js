module.exports = function resSuccess(data,msg) {
  var res = this.res;
  if(data) {
    res.json({
      data: data || [],
      code: 0
    });
  }
  else {
    res.json({
      code: 1
      
    })
  }
};
