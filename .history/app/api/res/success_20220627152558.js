var req = this.req;


module.exports =  {
  
  resOK:function(data){
    if(data) {
      return res.json({
        data: data || [],
        code: 0,
        msg : 'Sucess'
      });
    }

};
