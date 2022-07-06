module.exports = function resSucess(data) {
  var res = this.res;
res.json({
      data: data || [],
      msgError: msgError || 'Success',
    });
  } else {
    res.json({
      msgError: msgError || 'Error',
    });
  }
};
