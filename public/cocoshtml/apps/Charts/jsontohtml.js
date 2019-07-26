function jsonToHtml (jsonPath, elementId) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200)
	{
	  var myObj = JSON.parse(this.responseText);
	  var htmlCode = generateHtml(myObj);
	  document.getElementById(elementId).innerHTML = htmlCode;
	}
  };
  xmlhttp.open("GET", jsonPath, true);
  xmlhttp.send();
};

function generateHtml(pData) {
	var self = this;
	var html = '';
	if("tileList" in pData) {
		var objList = Object.keys(pData.tileList);
		var nbr = objList.length;
		for(var i=0; i<nbr; i++) {
			if(i>0 && i%3 === 0.0)
			{
				html+= '<div class=\"clearfix\">';
				html+= '</div>';
			}

			var key = objList[i];
			var obj = pData.tileList[key];
			html+= '<div class=\"col-xs-4 chart-element-parent\" style=\"margin-bottom: 60px; \" onclick=\"play(\'./Resources/audio_mid/common/' + pData.type + '/' + obj.tileAudioId + '.mp3\')\">';
			html+= '<img src=\"./Resources/' + obj.imgUri +'\" class=\"img-responsive center-block\" alt=\"'+ obj.title +'\" title=\"'+ obj.title +'\">'
			html+= '<div class=\"col.xs.12 object-name\">';
			html+= '<h4 class=\"text-center\">' + obj.title + '</h4>'
			html+= '</div>';
			html+= '</div>';
		}
		//html+= '</ul>';
	}
	return html;
};