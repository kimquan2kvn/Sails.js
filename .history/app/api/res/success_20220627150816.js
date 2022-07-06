
function resOK(data) {
  var res = this.res;
  if(data) {
    return res.json({
      data: data || [],
      code: 0,
      msg : 'Sucess'
    });
  }
  else {
    return res.json({
      code: 1,
      msg: 'Error'
    })
  }
}

module.exports = re

