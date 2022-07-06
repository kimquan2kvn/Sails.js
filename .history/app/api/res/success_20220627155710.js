// var req = this.req;
// var res = this.res;

module.exports = {
  resOK: (req, res) => {
    console.log(res);
    res.status(200).send('OK')
  }
};

