var RealWorldObjectMetaInfoStore = (function () {
    var singleton = null;
    var property_name = "name";
    var property_text = "text";
    var property_objectId = "objectId";
    var property_color = "color";
    var property_colorcode = "colorcode";
    var property_imageUri = "imageUri";
    var property_shape = "shape";
    var property_alphabet = "alphabet";
    var property_senses = "senses";
    var property_noofframes = "noofframes";
    var property_frameformat = "frameformat";
 
    function createInstance() {
        var object = new RealWorldObjectMetaInfoStore();
        return object;
    };

    RWO : (function () {

        RWO = function(){};

        RWO.prototype.instanceFlag = false;
        
    })();
    
    var objectMap = {};
    var setMap = {};
    var registeredSets = []; // we store registerd sets here, optimize loading sets by breaking them
    var nSpritesWithoutSize = 0;
    
    var loadTypeObjectsToObjectMap = function(typeData)
    {
        for (objectData in typeData)
        {
            if (objectData.w < 1 || objectData.h < 1)
            {
                // load image and get dimensions if not present in data
                var sprite = new cc.Sprite(objectData.imageUri);
                var size = sprite.getContentSize();
                objectData.w = size.width;
                objectData.h = size.height;
                this.nSpritesWithoutSize++;
            }

            this.objectMap[objectData.objectId] = objectData;
        }

        return true;
    }

    
    function initialize()
    {
        var request = "res/Resources/json/RealWorldObjectMetaInfo.json";
        var data = parseRealWorldObjectMetaInfoJson(request);
        if (data == null || data.typesList.length < 1)
        {
            return;
        }

        while(this.objectMap.length > 0)
        {
            this.objectMap.pop();
        }

        
        while(this.setMap.length > 0)
        {
            this.setMap.pop();
        }

        this.nSpritesWithoutSize = 0;
        for (itrjj in data.typesList)
        {
            var setData = itrjj;
            this.registeredSets.push(setData.name);
            if (setData.objectSrc == "")
            {
                this.setMap[itrjj.name] = itrjj;
                this.loadTypeObjectsToObjectMap(itrjj);
            }
        }
    }
 
    return {
        getInstance: function ()
        {
            if (!singleton)
            {
                singleton = createInstance();
				singleton.initialize();
				RealWorldObjectMetaInfoStore.prototype.instanceFlag = true;
            }
            
            return singleton;
        },

        parseRealWorldObjectMetaInfoJson: function(json)
        {
            var realWorldData = new RealWorldObjects();
			for (set in json.typesList)
			{
				var typeData = parseRealWorldObjectMetaInfoSetJson(set);
				realWorldData.typesList.push(typeData);
			}

			return realWorldData;
        },

        parseRealWorldObjectMetaInfoSetJson: function(json)
        {
            var jsonData = jsonToString(json);
			var set = JSON.parse(jsonData);
			var typeData = new RealWorldTypeSchema();
			typeData.name = set.name || "";
			typeData.type = set.type || "";
			typeData.suffix = set.suffix || "";
			typeData.objectSrc = set.objectSrc || "";
			for (object in set.attributes)
			{
				var worldObject = new RealWorldObjectSchema();
				worldObject.objectId = object.objectId || "";
				worldObject.name = object.name || "";
				worldObject.text = object.text || "";
				worldObject.color = object.color || "";
				worldObject.colorcode = object.colorcode || "";
				worldObject.audioId = object.audioId || "";
				worldObject.imageUri = object.imageUri || "";
				worldObject.alphabet = object.alphabet || "";
				worldObject.endalphabet = object.endalphabet || "";
				worldObject.bgImg = object.bgImg || "";
				worldObject.rhyme = object.rhyme || "";
				worldObject.phonic = object.phonic || "";
				worldObject.shape = object.shape || "";
				worldObject.senses = object.senses || "";
				worldObject.w = object.w || 0.0;
				worldObject.h = object.h || 0.0;
				worldObject.x = object.x || 0.0;
				worldObject.y = object.y || 0.0;
				worldObject.noofframes = object.noofframes || 0;
				worldObject.frameformat = object.frameformat || "";
				for (attributeItem in object.attributes)
				{
					var attributeName = attributeItem[name];
					var attributeValue = attributeItem[value];
					worldObject.attributes[attributeName] = attributeValue;
				}

				typeData.objectList.push(worldObject);
				delete object;
			}

			return typeData;
        },

        getObjectTypeFromId: function(Id)
		{
            var type = "";
            var index = Id.indexOf("_");
            if(index > 0)
            {
                type = Id.substring(0, index);
            }
            
			return type;
		},

        getNumberOfSpritesWithoutSize: function()
        {
            return nSpritesWithoutSize;
        }
    };
})();
 
function run() {
 
    var instance1 = RealWorldObjectMetaInfoStore.getInstance();
    var instance2 = RealWorldObjectMetaInfoStore.getInstance();
 
    alert("Same instance? " + (instance1 === instance2));  
}