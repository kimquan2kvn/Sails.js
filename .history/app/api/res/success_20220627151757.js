module.exports = function resOK(data) {
  var req = this.req;
  var res = this.res;
  var sails = req._sails;
  if(data) {
    sails.log.silly('res.suce() :: Sending 200 ("OK") response');
    // return res.json({
    //   data: data || [],
    //   code: 0,
    //   msg : 'Sucess'
    // });
  }
  else {
    return res.json({
      code: 1,
      msg: 'Error'
    });
  }
};
