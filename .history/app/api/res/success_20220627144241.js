module.exports = function ressuccess(data,msgError) {
  var res = this.res;
  res.json({
    data: data || [],
    msgError: msgError || 'Success',
  });
};
