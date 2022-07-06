module.exports = function resSuccess(data) {
  var res = this.res;
  if
  res.json({
    data: data || [],
  });
};
