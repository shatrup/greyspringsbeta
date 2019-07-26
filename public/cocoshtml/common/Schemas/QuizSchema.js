function AttributeSpriteSchema() {
    this.name = "";
    this.imgSrc = "";
    this.audioSrc = "";
    this.numberOfChildItems = 0;
    this.isAnOptionToChooseFrom = false;
    this.isDarkholeSprite = false;
    this.isShadowTypeSprite = false;
    this.fscale = 0;
    this.isTouchable = true;
    this.isSolution = false;
    this.peerSprites = [];
    this.referenceSprites = [];
    this.isDecorativeSet = false;
    this.sOptionSprite = false;
    this.isDraggable = false;
    this.hasDraggableBehavior = false;
    this.hasFloatingBehavior = false;
    this.hasScratchBehavior = false;
    this.hasShakableBehavior = false;
    this.hasFillBehaviour = false;
    this.hasReverseGravityEffect = false;
    this.bumpZIndexOnTouch = false; 
}

AttributeSpriteSchema.prototype = new DomElementDataType();

function QuizSetObjectDataSchema()
{
    this.objectId = "";
    this.name = "";
    this.text = "";
    this.shape = "";
    this.color = "";
    this.imgSrc = "";
    this.alphabet = "";
    this.senses = "";
    this.endalphabet = "";
    this.phonic = "";
    this.rhyme = "";
    this.x = 0;
    this.y = 0;
    this.h = 0;
    this.w = 0;
    this.zIndex = 0;
    this.noofframes = 0;
    this.frameformat = ""; 
}


function QuizSetDataSchema()
{
    this.id = "";
    this.type = "";
    this.title = "";
    this.bgImg = "";
    this.bgColor1 = "";
    this.bgColor2 = "";
    this.bgMusic = "";
    this.question = "";
    this.complexity = "";
    this.qsBgColor = "";
    this.objectSrc = "";
    this.includeObjectIds = [];
    this.excludeObjectIds = [];
    this.customKey1 = ""; // these are custom keys which can be given quiz specific meaning
    this.customKey2 = ""; // these are custom keys which can be given quiz specific meaning
    this.customKey3 = ""; // these are custom keys which can be given quiz specific meaning
    this.customKey4 = ""; // these are custom keys which can be given quiz specific meaning
    this.isFullBleed = false;
    this.objects = [];    
}

function QuizDataSchema()
{
    this.id = "";
    this.type = "";
    this.title = "";
    this.bgImg = "";
    this.bgColor1 = "";
    this.bgColor2 = "";
    this.bgMusic = "";
    this.question = "";
    this.complexity = "";
    this.qsBgColor = "";
    this.customKey1 = ""; // these are custom keys which can be given quiz specific meaning
    this.customKey2 = "";// these are custom keys which can be given quiz specific meaning
    this.customKey3 = "";// these are custom keys which can be given quiz specific meaning
    this.customKey4 = ""; // these are custom keys which can be given quiz specific meaning
    this.isFullBleed = false;
    this.isHintOnLeft = false;
    sets = [];    
}

function AvailableQuizTypeSetSchema()
{
    this.Quiz = "";
    this.Type = "";
    this.Subtype = "";
    this.Complexity = "";
    this.title = "";
    this.Locked = "";
    this.networkConstraint = false;
    this.setAvailabilityConstraint = false;
    this.SetCount = 0; 
    this.CurrentSetIndex = 0;
    this.Sets = [];
    this.uri = "";   
}

function AvailableQuizTypeDataSchema()
{
    quizzes = [];
}

function AttributeQuizSchema()
{
    this.getReferenceData =  function(quizPageData)
    {

    }
    this.getNonReferenceData = function(quizPageData)
    {

    }
    this.getDecorativeData = function(quizPageData){

    }

    this.question = "";
    this.bgImage = "";
    this.bgPattern = null;
    this.bgMusic = "";
    this.TitleBGColor ="";
    this.title = "";
    this.isHintsEnabled = false;
    this.showQuestionBubble = false;
    this.solutionObjectData = null;
    this.spritesData = [];
    this.colorBoardData = [];
    this.matchKeys = [];
};

