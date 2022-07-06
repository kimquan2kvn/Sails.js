// var req = this.req;
// var res = this.res;

// module.exports = {
//   resOK: (req, res) => {
//     res.status(200).send('OK')
//   }
// };

module.exports = function insufficientFunds(err, extraInfo){

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  var newError = new Error('Insufficient funds');
  newError.raw = err;
  _.extend(newError, extraInfo);

  // sails.log.verbose('Sent "Insufficient funds" response.');

  return res.badRequest(newError);

}