module.exports = function resSuccess(data,msgError) {
  var res = this.res;
  res.json({
    data: data || [],
    msgError: msgError || 'Success',
  });
};
