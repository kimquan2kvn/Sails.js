var req = this.req;
var res = this.res;

module.exports =  {
  resOK:function(data){
    if(data) {
      return res.send('OK');
    }
  }
};
