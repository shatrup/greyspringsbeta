function RealWorldSceneObjectSchema()
{
    this.objectId = "";
    this.parentId = "";
    this.name = "";
    this.imgSrc = "";
    this.musicSrc = "";
    this.color = "";
    this.rotate = 0.0;
    this.scale = 0.0;
    this.x = -1.0;
    this.y = -1.0;
    this.h = -1.0;
    this.w = -1.0;
    this.zIndex = 1;
    this.opacity = 0;
    this.visible= true;
    this.isFlipX = false;
    this.isFlipY = false;
    this.animationName = "";
    this.animationType = "";
    this.objectType = "";
    this.animationRepeatCount = 1;
    this.animationStartTime = 0;
    this.animationEndTime = 0;
    this.rhymeTimeLength = 0;
    this.attributes = {};
    this.components = [];
}

function RealWorldSceneSchema()
{
    this.id = "";
    this.name;
    this.bgImgSrc;
    this.bgMusicSrc;
    this.customKey1;
    this.customKey2;
    this.customKey3 = "";
    this.height = 0.0;
    this.width = 0.0;
    this.objectList = [];
}

function RealWorldStoreSchema()
{
    this.name = "";
    this.typesList = [];
}

function RealWorldObjectSchema()
{
    this.objectId = "";
    this.name = "";
    this.text = "";
    this.color = "";
    this.bgcolor = "";
    this.bgImg = "";
    this.colorcode = "";
    this.shape = "";
    this.imageUri = "";
    this.alphabet = "";
    this.senses = "";
    this.endalphabet = "";
    this.phonic = "";
    this.rhyme = "";
    this.w = 0.0;
    this.h = 0.0;
    this.x = 0.0;
    this.y = 0.0;
    this.noofframes = 0;
    this.frameformat = "";
    this.sizes = [];    
    pieces = []; // list of individual pieces of object. By combining all these we can form the original image
    this.audioId = "";
    attributes = {};
}

function RealWorldTypeSchema()
{
    this.name = "";
    this.suffix = "";
    this.type = "";
    this.objectSrc = "";
    objectList = [];
}

function RealWorldObjects()
{
    this.RealWorldObjectMetaInfo = "";
    this.typesList = [];
}

function DomElementDataType()
{
    this.attributes = {};
    this.selector = ""; // This can be used to search for nodes matching it
}