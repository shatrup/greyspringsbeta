
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getLocationInGrid(origin, height, width, nRows, nCols){
  var M = nCols;
  var N = nRows;
  var stepX = width/M ; 
  var stepY = height/N;
  var startOffsetX = origin.x + stepX/2;
  var startOffsetY = origin.y + stepY/2;  
  var locationX = 0;
  var locationY = 0;  
  var locations = [];
  for (var yy = 0; yy < N; yy++)
  {
    locationX = startOffsetX;
    locationY = startOffsetY + yy * stepY;
    for (var xx = 0; xx < M; xx++)
    {
      locationX = startOffsetX + stepX * xx;
      var locY = locationY;
      var locX = locationX;
      var location = new cc.p(locX , locY);
      locations.push(location);
    }
  }  

  return locations;
}

function getRandomNumberWithinRange(start, end)
{
  var randVal = Math.random();
  var randNum = randVal * (end - start);
  var randResult = randNum  + start
  return Math.floor(randResult);
}

function getNRandomNumbersV1(count, start, end)
{
  var vec = [];
  
  if (count > (end - start))
  {
    //alert("GsLog:Utilities::WARNING:getNRandomNumbersV1: count is less than the provided range!");
    //alert("GsLog:Requested random count: %d, Range: %d", count, end - start);
    return vec;
  }

  while (vec.length < count)
  {
    var jsrand = getRandomNumberWithinRange(start, end);
    if (vec.indexOf(jsrand) == -1)
    {
      vec.push(jsrand);
    }
  }

  return vec;
}

function format(fmt, val)
{ 
  //console.log(fmt);
  var argumentsLength = arguments.length;  
  for (var i=1; i < argumentsLength; i++) //first argument is format
  {
  	var argKey = "{"+(i-1)+"}";
    var index = fmt.indexOf(argKey);
    if (index != -1)
    {
      fmt = fmt.replace(argKey, arguments[i]);
    }    
  }
  
  return fmt;
}

function strReplace(original, str1, str2)
{
  original = original.replace(str1, str2);
  return original 
}

function getCanonicalNameFromId(type, id)
{
  var token = "_";
  var str1 = type + token;
  var str2 = "";
  return strReplace(id, str1, str2);
}

function getCanonicalName(type, name)
{
  var token = "_";
  var str1 = type + token;
  var str2 = "";
  return strReplace(name, str1, str2);
}

function parseHexColor(colorStr)
{
  var cc3b = parseHexColor4B(colorStr + "ff");
  return new cc.Color(cc3b.r, cc3b.g, cc3b.b);
}

function parseHexColor4B(colorStr)
{
  var r = colorStr.substr(0, 2);
  var g = colorStr.substr(2, 2);
  var b = colorStr.substr(4, 2);
  var a = "ff";
  if (colorStr.length > 6)
  {
    a = colorStr.substr(6, 2);
  }

  var rInt = parseInt(r, 16);
  var gInt = parseInt(g, 16);
  var bInt = parseInt(b, 16);
  var aInt = parseInt(a, 16);

  return new cc.Color(rInt, gInt, bInt, aInt);
}

function getVisibleOrigin()
{
  return cc.view.getVisibleOrigin();
}

function getVisibleSize()
{
  return cc.view.getVisibleSize();
}

function shuffleArray(array, len)
{
  for (var i = len - 1; i >= 0; i--)
  {
    var j = 0 | (cc.rand() % (i + 1));
    var v = array[i];
    array[i] = array[j];
    array[j] = v;
  }
}

function jsonToString(json)
{  
  var jsonData = "";
  var request = new XMLHttpRequest();
  request.open('GET', json, false);
  request.send(null);
  if (request.status == 200)
  {
      jsonData =  request.responseText;
  }

  return jsonData;
}

function playAudioEffect(ref, audioId)
{
  if(audioId === undefined)
  {
    audioId = ref;
  }
  
  cc.audioEngine.playEffect(audioId);
}

function getSpriteDimensions(uri)
{
  var sprite = new cc.Sprite(uri);
  sprite.retain();
  var size = sprite.getContentSize();
  sprite.release();
  return size;
}