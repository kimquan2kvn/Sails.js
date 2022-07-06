var req = this.req;
var res = this.res;
var sails =  req.

module.exports =  {
  
  resOK:function(data){
    if(data) {
      return res.json({
        data: data || [],
        code: 0,
        msg : 'Sucess'
      });
    }
  }

};
