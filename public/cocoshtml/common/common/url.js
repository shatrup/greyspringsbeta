function Url(uri)
{
    this.urlParams = {};
    this.decodeAndInitializeProperties(uri)
}

Url.prototype.getParam = function(param)
{
    return this.urlParams["id"];
}

Url.prototype.decodeAndInitializeProperties = function(uri)
{
  if (uri.length == 0)
  {
    return true;
  }

  var prmstr = uri.split("?")[1];  
  this.urlParams = this.transformToAssocArray(prmstr);
}

Url.prototype.transformToAssocArray = function ( prmstr ) {
  var params = {};
  var prmarr = prmstr.split("&");
  for ( var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
  }
  return params;
}