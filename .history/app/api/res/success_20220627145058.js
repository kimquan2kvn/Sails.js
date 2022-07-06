module.exports = function resSuccess(data) {
  var res = this.res;
  res.json({
    data: data || [],
  });
};
