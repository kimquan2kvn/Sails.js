module.exports = function resSucess(data,msgError) {
  var res = this.res;
  res.json({
    data: data || [],
    msgError: msgError || 'Success',
  });
};
