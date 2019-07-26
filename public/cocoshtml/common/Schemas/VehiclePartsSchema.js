function PartsList()
{
    this.objectId = "";
    this.name = "";
    this.imageUri = "";
    this.type = "";
    this.w = 0.0;
    this.h = 0.0;
    this.x = 0.0;
    this.y = 0.0;
    this.zorder = 0;
    this.animationType = [];
    this.frames = [];
    this.rotateBy = 0.0;
    this.frameInterval = 0.0;
    this.rotationAngle = 0,0;
    this.bounceX = 0.0;
    this.bounceY = 0.0;
    this.isShadow = false;
    this.flipX = false;
    this.flipY = false;
}

function VehiclePartsSchema()
{
    this.name = "";
    this.type = "";
    this.suffix = "";
    this.background = "";
    this.finishSoundEffect = "";
    this.flag = "";
    this.flagX = 0.0;
    this.flagY = 0.0;
    this.partsList = [];
}