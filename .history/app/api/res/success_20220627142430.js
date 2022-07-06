module.exports = function resSucess(data) {
  var res = this.res;
  if
  res.json({
    data: data || [],
    msgError: msgError || 'Success',
  });
};
