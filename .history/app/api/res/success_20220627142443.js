module.exports = function resSucess(data) {
  var res = this.res;
  if(data) {
    res.json({
        data: data || [],
        msgError: msgError || 'Success',
    });
  }

};
