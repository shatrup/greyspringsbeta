
var ArcheryActivityLayer = cc.LayerColor.extend({
    bgSprite:null,
    pageConitaner: null,
    header: null,
    backButton: null,
    layout: null,
    asset_arrow_format : "res/Resources/ipad/common/arrow_set1/archery_arrow_{0}.png",
    asset_object_format : "res/Resources/ipad/common/chrome/quiz/archery_{0}_on_tree_{1}.png",
    asset_object_hit_format : "res/Resources/ipad/common/chrome/quiz/archery_apple_on_ground_{0}.png",
    asset_object_hit_bullsEye1 : "res/Resources/ipad/common/chrome/quiz/archery_{0}_split_1.png",
    asset_object_hit_bullsEye2 : "res/Resources/ipad/common/chrome/quiz/archery_{0}_split_2.png",
    asset_background_format : "res/Resources/ipad/common/backgrounds/background_fullbleed/background_archery_{0}.png",
    asset_tree_format : "res/Resources/ipad/common/chrome/tree/tree_{0}_{1}.png",
    collisionCheckKey : "collision_check",

    arrowsLeft: 0,
    domUtils:  DomUtils,
    highScore: 0,
    
    Archery : (function () {

        Archery = function(){};

        Archery.prototype.currentSetIndex = 0;
        Archery.prototype.maxSetsAvailable = 9;
        Archery.prototype.setsPlayedIndex = 0;
        Archery.prototype.score = 0;
        
    })(),
    
    
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();        
        var size = cc.winSize;
        this.pageConitaner = new Div(size.width, size.height);
        this.pageConitaner.attr({
            x: size.width / 2,
            y: size.height / 2
        });   

        this.domUtils = new DomUtils();
        this.arrowsLeft = 12;
        this.objectScaleTypes = [1.25, 1.1, 1.0, 0.9, 0.85, 0.75 ];
        this.objectScale = this.objectScaleTypes[2]; 
        
        this.addChild(this.pageConitaner, 10000);
        var backButtonSp = new cc.Sprite(archeryActivity_Res.Back_Button);
        var backButtonSize = backButtonSp.getContentSize();
        this.backButton = new Div(backButtonSize.width, backButtonSize.height);
        this.backButton.addChildInCenter(backButtonSp);
        this.header = new Div(size.width, backButtonSize.height);
        this.header.addChildToLeft(this.backButton);
        this.backButton.setTouchEnable(true);
        this.backButton.setTargetUri("NavigateBack");
        this.pageConitaner.addChildToTop(this.header);
        
        if (Archery.prototype.setsPlayedIndex === 0)
        {
            Archery.prototype.score = 0;
        }

        this.loadView();
        var bgSoundUri = "res/Resources/audio_mid/homepage_music.mp3";
        cc.audioEngine.playMusic(bgSoundUri, true);
        var touchListener = new cc._EventListenerTouchAllAtOnce();
        touchListener.onTouchesBegan = this.onTouchesBegan;
        touchListener.onTouchesMoved = this.onTouchesMoved;
        touchListener.onTouchesEnded = this.onTouchesEnded;
		cc.eventManager.addListener(touchListener, this);
    },

    // acting as a destructor
    dust: function()
    {
        this.stopAllActions();
        this.unscheduleAllCallbacks();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.stopAllEffects();
    },

    loadView: function()
    {
        this.visOrigin = getVisibleOrigin();
        this.winSize = getVisibleSize();
        this.arrowSpeed = 300;
        this.minTargets = 3;
        this.maxTargets = 7;
        this.fruit = "apple";
        var arrowType = getRandomNumberWithinRange(0, 14) + 1;
        this.arrowImgUri = format(this.asset_arrow_format, arrowType.toString());
        var bgUri = "";
        var currentSetIndex = Archery.prototype.currentSetIndex;
        if (currentSetIndex === 0)
        {
            this.objectScale = this.objectScaleTypes[0];
            bgUri = format(this.asset_background_format, "2");
        }
        else if (currentSetIndex === 1) // speed up variation
        {
            this.objectScale = this.objectScaleTypes[0];
            this.arrowSpeed *= 1.1;
            bgUri = format(this.asset_background_format, "2");
        }
        else if (currentSetIndex === 2)
        {
            this.fruit = "apricot";
            this.objectScale = this.objectScaleTypes[1];
            bgUri = format(this.asset_background_format, "2");
        }
        else if (currentSetIndex === 3) // speed up variation
        {
            this.fruit = "avocado";
            this.objectScale = this.objectScaleTypes[0];
            this.arrowSpeed *= 1.2;
            bgUri = format(this.asset_background_format, "2");
            this.addTreeToScene(format(this.asset_tree_format, this.fruit, "1"));
        }
        else if (currentSetIndex === 4)
        {
            this.fruit = "apricot";
            this.objectScale = this.objectScaleTypes[1];
            bgUri = format(this.asset_background_format, "4");
            this.addTreeToScene(format(this.asset_tree_format, this.fruit, "1"));
        }
        else if (currentSetIndex === 5)
        {
            this.fruit = "avocado";
            bgUri = format(this.asset_background_format, "5");
            this.addTreeToScene(format(this.asset_tree_format, this.fruit, "1"));
        }
        else if (currentSetIndex === 6) // distance variation
        {
            this.fruit = "apricot";
            this.objectScale = this.objectScaleTypes[4];
            bgUri = format(this.asset_background_format, "4");
            this.addTreeToScene(format(this.asset_tree_format, this.fruit, "2"));
        }
        else if (currentSetIndex === 7) // distance variation
        {
            this.objectScale = this.objectScaleTypes[4];
            bgUri = format(this.asset_background_format, "5");
            this.addTreeToScene(format(this.asset_tree_format, this.fruit, "2"));
        }
        else // finish arrows variation
        {
            this.objectScale = this.objectScaleTypes[3];
            bgUri = format(this.asset_background_format, "3");
        }

        this.loadBackGround(bgUri);
        this.addTargetObjects();
        this.loadArrows();
        this.addChromeElements();

        cc.director.getScheduler().scheduleCallbackForTarget(this, this.updateTick, 0.05, cc.REPEAT_FOREVER);
        //this.schedule(this.updateTick, 0.05, collisionCheckKey);

        this.scheduleOnce(this.showCurrentScoreOnScoreBoard, 2.0, "scheduleScoreboardUpdateCallBack");

    },

    addTreeToScene: function(treeUri)
    {
        var tree = new cc.Sprite(treeUri);
        var posX = this.visOrigin.x + this.winSize.width*0.75;
        var posY = this.visOrigin.y + this.winSize.height / 2;
        tree.attr({
            x: posX,
            y: posY
        });
        this.addChild(tree, 1);
    },
    
    loadBackGround: function(bgUri)
    {
        var winSize = getVisibleSize();
        var Bg = new cc.Sprite(bgUri);
        Bg.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(Bg, 0);
    },

    getHighScore: function()
    {
        try{
            var highScore = parseInt(cc.sys.localStorage.getItem("archeryHighScore"), 10);
            if(isNaN(highScore))
            {
                highScore = 0;
            }
        }
        catch (e) {
            var warn = function () {
                cc.warn("Warning: localStorage isn't enabled. Please confirm browser cookie or privacy option");
            };
            sys.localStorage = {
                getItem : warn,
                setItem : warn,
                removeItem : warn,
                clear : warn
            };
        }

        
        return highScore;
    },

    setHighScore: function(highScore)
    {
        try{
            cc.sys.localStorage.setItem("archeryHighScore", highScore);
        }
        catch (e) {
            var warn = function () {
                cc.warn("Warning: localStorage isn't enabled. Please confirm browser cookie or privacy option");
            };
            sys.localStorage = {
                getItem : warn,
                setItem : warn,
                removeItem : warn,
                clear : warn
            };
        }
    },

    addTargetObjects: function()
    {
        var winSize = getVisibleSize();
        var contentAreaRectPosX = (winSize.width / 2) + this.visOrigin.x;
        var contentAreaRectPosY = this.visOrigin.y + this.winSize.height * 0.125;
        var contentAreaRectWidth = this.winSize.width * 0.5;
        var contentAreaRectHeight = this.winSize.height * 0.75;
        var nRows = 3;
        var nCols = 3;
        var contentAreaRect = new cc.Rect(contentAreaRectPosX, contentAreaRectPosY, contentAreaRectWidth, contentAreaRectHeight);
        this.layout = getLocationsFromRectInGrid(contentAreaRect, LayoutGrid.LayoutGrid_Symmetric_MxN, nRows, nCols);
        //showLayoutDebugGrid(layout, ColorPicker.EMARALD);

        this.loadMoreTargets();
    },
        
    loadArrows: function()
    {
        this.arrow = this.drawArrow();
        this.addChild(this.arrow, 50);
        this.moveArrow(this.arrow);
        --this.arrowsLeft;

        var marginXFactor = this.winSize.width*0.028;
        var marginY = -this.winSize.height*0.09375;
        for (var ii = 0; ii < this.arrowsLeft; ii++)
        {
            var arrow = new cc.Sprite(this.arrowImgUri);
            arrow.setRotation(-90);
            arrow.setPosition(cc.p(this.visOrigin.x + this.winSize.width*0.4 + marginXFactor * ii, marginY));
            var arrowSetSelector = format("arrowSet_{0}", (ii+1).toString());
            this.domUtils.setSelector(arrow, arrowSetSelector);
            this.addChild(arrow, 504);
        }
    },

    drawArrow: function()
    {
        var randomYPos = getRandomNumberWithinRange(30, this.winSize.height*0.8);
        var arrowX = (this.visOrigin.x + (this.winSize.width*0.15))*this.objectScale;
        var arrowY = this.visOrigin.y + randomYPos;
        var arrow = new cc.Sprite(this.arrowImgUri);
        arrow.setScale(this.objectScale);
        arrow.setPosition(cc.p(arrowX, arrowY));
        return arrow;
    },

    moveArrow: function(arrow)
    {
        var initialPos = arrow.getPosition();
        var upperPos = cc.p(initialPos.x, this.visOrigin.y + (this.winSize.height*0.90));
        var lowerPos = cc.p(initialPos.x, this.visOrigin.y + (this.winSize.height*0.05));
        var time1 = cc.pDistance(upperPos, initialPos) / this.arrowSpeed;
        var time2 = cc.pDistance(upperPos, lowerPos) / this.arrowSpeed;

        var moveUp1 = cc.MoveTo.create(time1, upperPos);
        var moveDown = cc.MoveTo.create(time2, lowerPos);
        var moveUp = cc.MoveTo.create(time2, upperPos);

        var moveUpDownAction = cc.Sequence.create(moveDown, moveUp);
        var repeatMove = cc.Repeat.create(moveUpDownAction, Math.pow(2,30));
        var moveAction = cc.Sequence.create(moveUp1, repeatMove);
        moveAction.setTag(1024);

        arrow.runAction(moveAction);
    },
    
    addChromeElements: function()
    {
        /*var backCallback = CC_CALLBACK_0(ArcheryActivityLayer.navigateCallback, this);
        var backButton = TouchableSprite.create(backCallback, true, SpriteTouchEffect.ButtonTouchEffect);
        backButton.setTexture("kindergarten8/buttons/back.png");
        var buttonSize = backButton.getContentSize();
        var buttonPos = cc.p(visOrigin.x + buttonSize.width / 2 + 10, visOrigin.y + winSize.height - buttonSize.height / 2 - 5);
        backButton.setPosition(buttonPos);
        this.addChild(backButton, Math.pow(2, 30));*/

        this.highScore = this.getHighScore();
        var labelFontSize = 10;
        var backgroundOpacity = 255;
        var labelBGColor = "ffffff";
        var fontColor = "3D00D7";
        var labelText = format("Hi-Score: {0}", this.highScore.toString());
        var scoreboard = this.createScoreLabel(labelText, archeryActivity_Res.asset_score_bg, backgroundOpacity, labelFontSize, fontColor);
        var scoreboardSize = scoreboard.getContentSize();
        var labelPos = cc.p(this.visOrigin.x + this.winSize.width - scoreboardSize.width / 2, this.visOrigin.y + scoreboardSize.height / 2);
        scoreboard.setPosition(labelPos);
        this.domUtils.setSelector(scoreboard, "scoreboard");
        this.addChild(scoreboard, Math.pow(2, 30));

        numberSet29Large['number_set29_large_' + chr]
        var dummyScoreDigit = new cc.Sprite(numberSet29Large['number_set29_large_0']);
        var scoreDiv = new Div(dummyScoreDigit.width, dummyScoreDigit.height);
        for (var ii = 0; ii < 3; ii++)
        {
            var digitimageUri = numberSet29Large['number_set29_large_' + (ii + 1)];
            var digitSprite = new cc.Sprite(digitimageUri);
            digitSprite.setColor("000000");
            var selector = format("digit_{0}", (ii + 1).toString());
            this.domUtils.setSelector(digitSprite, selector);
            scoreDiv.addChildToLeft(digitSprite);
        }

        var scoreLabel = this.domUtils.querySelector(scoreboard, "scoreLabel");
        scoreDiv.setPosition(scoreLabel.getPosition());
        scoreDiv.setVisible(false);
        this.domUtils.setSelector(scoreDiv, "scoreDiv");
        scoreboard.addChild(scoreDiv);
    },
    
    createScoreLabel: function(text, bg, bgOpacity, fontSize, fontColor)
    {
        var mixedSprite = cc.Sprite.create(bg);
        if (fontColor == "")
        {
            fontColor = "000000";
        }

        // label opacity, label color, label text color
        var scoreLabel = cc.LabelTTF.create(text, "Arial", fontSize.toString(), cc.TEXT_ALIGNMENT_CENTER);
        scoreLabel.setColor(parseHexColor(fontColor));
        this.domUtils.setSelector(scoreLabel, "scoreLabel");
        var pLabelSize = scoreLabel.getContentSize();
        var size = mixedSprite.getContentSize();
        scoreLabel.setPosition(cc.p(size.width / 2, size.height * 0.7));
        mixedSprite.addChild(scoreLabel);
        mixedSprite.setOpacity(bgOpacity);
        return mixedSprite;
    },

    showCurrentScoreOnScoreBoard: function()
    {
        var scoreboard = this.domUtils.querySelector(this, "scoreboard");
        var scoreLabel = this.domUtils.querySelector(scoreboard, "scoreLabel");
        scoreLabel.setVisible(false);
        var scoreDiv = this.domUtils.querySelector(scoreboard, "scoreDiv");
        scoreDiv.setVisible(true);
        this.updateScoreBoard();
    },

    updateScoreBoard: function()
    {
        var number = Archery.prototype.score;
        for (var ii = 0; ii < 3; ii++)
        {
            var selector = format("digit_{0}", (ii + 1).toString());
            var digitSprite = this.domUtils.querySelector(this, selector);
            var unit = Math.pow(10, 2 - ii);
            var digit = Math.floor(number / unit);
            number %= unit;
            var digitImageUri = numberSet29Large['number_set29_large_' + digit];
            digitSprite.setTexture(digitImageUri);
        }
    },

    navigateCallback: function()
    {
        /*Archery.prototype.currentSetIndex = Archery.prototype.maxSetsAvailable - 1;
        Archery.prototype.setsPlayedIndex = 0;
        cc.director.runScene(new HelloWorldScene());*/

        
        Archery.prototype.currentSetIndex = (Archery.prototype.currentSetIndex + 1) % Archery.prototype.maxSetsAvailable;
        cc.director.runScene(new ActivityBaseScene("appprotocol://page?id=ArcheryActivityLayer"));
    },

    replayActivity: function()
    {
        this.dust();
        var setsPlayedIndex = (Archery.prototype.setsPlayedIndex + 1) % Archery.prototype.maxSetsAvailable;
        Archery.prototype.setsPlayedIndex = setsPlayedIndex;
        if (setsPlayedIndex === 0)
        {
            this.navigateCallback();
        }
        else
        {
            //Navigator.reloadCurrentPage();
			Archery.prototype.currentSetIndex = (Archery.prototype.currentSetIndex + 1) % Archery.prototype.maxSetsAvailable;
            cc.director.runScene(new ActivityBaseScene("appprotocol://page?id=ArcheryActivityLayer"));
        }
    },

    shootArrow: function()
    {
        this.arrow.stopAllActions();
        var currentPos = this.arrow.getPosition();
        var finalPos = cc.p(this.visOrigin.x + this.winSize.width*1.5, currentPos.y);
        var speed = 1200;
        var time = cc.pDistance(currentPos, finalPos) / speed;
        var shoot = cc.MoveTo.create(time, finalPos);

        var reloadArrowCallback = cc.CallFunc.create(this.reloadArrow, this, false);
        var action = cc.Sequence.create(shoot, reloadArrowCallback);

        playAudioEffect(this, archeryActivity_Res.effect_whoosh);
        this.arrow.runAction(action);
    },

    onTouchesBegan: function(touches, event)
    {
        //cc.log("ArcheryActivityLayer::onTouchesBegan");
    },

    onTouchesEnded: function(touches, event)
    {
        //log("ArcheryActivityLayer::onTouchesEnded");
        var target = event.getCurrentTarget();
        target.shootArrow();
    },

    onTouchesMoved: function(touches, event)
    {
        //log("ArcheryActivityLayer::onTouchesMoved");
    },

    reloadArrow: function(ref, isHit)
    {
        if (Archery.prototype.currentSetIndex === Archery.prototype.maxSetsAvailable - 1)
        {
            if (this.arrowsLeft > 0)
            {
                this.arrow.stopAllActions();
                var arrowX = this.visOrigin.x + (this.winSize.width*0.15);
                var arrowY = this.arrow.getPositionY();
                this.arrow.setPosition(cc.p(arrowX, arrowY));
                this.moveArrow(this.arrow);

                if (!isHit)
                {
                    var arrowSetSelector = format("arrowSet_{0}", (this.arrowsLeft--).toString());
                    var dummyArrow = this.domUtils.querySelector(this, arrowSetSelector);
                    dummyArrow.setOpacity(0);
                }
            }
            else if (Archery.prototype.score > 0)
            {
                var effectCallback = cc.CallFunc.create(this.showSuccessfullEffect, this);
                var backCallback = cc.CallFunc.create(this.replayActivity, this);
                var delayInterval = 5.0;
                var delay = cc.DelayTime.create(delayInterval);
                var action = cc.Sequence.create(effectCallback, delay, backCallback);
                this.runAction(action);
            }
            else
            {
                var effectCallback = cc.CallFunc.create(this.showFailureEffect, this);
                var backCallback = cc.CallFunc.create(this.navigateCallback, this);
                var delayInterval = 4.0;
                var delay = cc.DelayTime.create(delayInterval);
                var action = cc.Sequence.create(effectCallback, delay, backCallback);
                this.runAction(action);
            }
        }
        else
        {
            if (this.targetsLeft === 0)
            {
                Archery.prototype.score += (this.arrowsLeft * 2);
                var effectCallback = cc.CallFunc.create(this.showSuccessfullEffect, this);
                var backCallback = cc.CallFunc.create(this.replayActivity, this);
                var delayInterval = 5.0;
                var delay = cc.DelayTime.create(delayInterval);
                var action = cc.Sequence.create(effectCallback, delay, backCallback);
                this.runAction(action);
            }
            else if (this.arrowsLeft > 0 && this.targetsLeft > 0)
            {
                this.arrow.stopAllActions();
                var arrowX = this.visOrigin.x + (this.winSize.width*0.15);
                var arrowY = this.arrow.getPositionY();
                this.arrow.setPosition(cc.p(arrowX, arrowY));
                this.moveArrow(this.arrow);

                var arrowSetSelector = format("arrowSet_{0}", (this.arrowsLeft--).toString());
                var dummyArrow = this.domUtils.querySelector(this, arrowSetSelector);
                dummyArrow.setOpacity(0);
            }
            else
            {
                var effectCallback = cc.CallFunc.create(this.showFailureEffect, this);
                var backCallback = cc.CallFunc.create(this.navigateCallback, this);
                var delayInterval = 4.0;
                var delay = cc.DelayTime.create(delayInterval);
                var action = cc.Sequence.create(effectCallback, delay, backCallback);
                this.runAction(action);
            }
        }
        
    },

    showSuccessfullEffect: function()
    {
        var successSprite = new cc.Sprite("res/Resources/ipad/common/backgrounds/background_fullbleed/archery_success_background.png");
        successSprite.setPosition(this.visOrigin.x + this.winSize.width / 2, this.visOrigin.y + this.winSize.height / 2);
        this.addChild(successSprite, 550);
        successSprite.setOpacity(0);
        var fadeIn = cc.FadeIn.create(2.0);
        successSprite.runAction(fadeIn);


        var snowEmitter = cc.ParticleSnow.create();
        snowEmitter.retain();
        successSprite.addChild(snowEmitter, Math.pow(2, 30));

        snowEmitter.setLife(4);
        snowEmitter.setLifeVar(1);
        snowEmitter.setTotalParticles(200);
        snowEmitter.setOpacity(255);
        snowEmitter.setLocalZOrder(1);
        snowEmitter.setStartSize(40.0);

        // gravity
        snowEmitter.setGravity(cc.p(0, -100));

        // speed of particles
        snowEmitter.setSpeed(200);
        snowEmitter.setSpeedVar(20);
        var emitterImgUri = format(this.asset_object_hit_format, "1");
        if (this.fruit === "apricot" || this.fruit === "avocado")
        {
            emitterImgUri = format(this.asset_object_format, this.fruit, "1");
        }

        snowEmitter.setEmissionRate(snowEmitter.getTotalParticles() / snowEmitter.getLife());
        var tex = cc.textureCache.addImage(emitterImgUri);
        snowEmitter.setTexture(tex);

        var s = this.winSize;
        if (snowEmitter != null)
        {
            snowEmitter.setPosition(cc.p(s.width / 2, s.height));
        }

        var objectAudioId = format("fruit_{0}", this.fruit);
        var audioEffect1Callback = cc.callFunc(playAudioEffect, this, archeryActivity_Res.alphabet_a);
        var audioEffect2Callback = cc.callFunc(playAudioEffect, this, archeryActivity_Res[objectAudioId]);
        var audioEffect3Callback = cc.callFunc(playAudioEffect, this, archeryActivity_Res.alphabet_phonic_a);

        var delayInterval = 0.7;
        var delay = cc.DelayTime.create(delayInterval);
        var audioPlayequence = null;
        audioPlayequence = cc.sequence(delay, audioEffect1Callback, delay, audioEffect2Callback);
        if (!(this.fruit === "avocado"))
        {
            audioPlayequence = cc.sequence(delay, audioEffect1Callback, delay, audioEffect3Callback, delay, audioEffect2Callback);
        }

        this.runAction(audioPlayequence);

        if(this.highScore < Archery.prototype.score)
        {
            this.setHighScore(Archery.prototype.score);
        }



    },

    showFailureEffect: function()
    {
        var failureSprite = new cc.Sprite("res/Resources/ipad/common/backgrounds/background_fullbleed/archery_failed_background.png");
        failureSprite.setPosition(this.visOrigin.x + this.winSize.width / 2, this.visOrigin.y + this.winSize.height / 2);
        this.addChild(failureSprite, 550);
        failureSprite.setOpacity(0);
        var fadeIn = cc.FadeIn.create(2.0);
        failureSprite.runAction(fadeIn);

        if(this.highScore < Archery.prototype.score)
        {
            this.setHighScore(Archery.prototype.score);
        }
    },

    updateTick: function()
    {
        this.detectCollision();
    },

    rectOverlapUsingWorldCoordinates: function(node1, node2)
    {
        var node1Anchor = node1.getAnchorPoint();
        var node2Anchor = node2.getAnchorPoint();
        node1.setAnchorPoint(cc.p(0, 0));
        node2.setAnchorPoint(cc.p(0, 0));
        var node1Pos = node1.getParent().convertToWorldSpace(cc.p(node1.getBoundingBox().x, node1.getBoundingBox().y));
        var node2Pos = node2.getParent().convertToWorldSpace(cc.p(node2.getBoundingBox().x, node2.getBoundingBox().y));
        var node1BoundingBox = node1.getBoundingBox();
        var node2BoundingBox = node2.getBoundingBox();
        var node1Rec = new cc.Rect(node1Pos.x, node1Pos.y, node1BoundingBox.width, node1BoundingBox.height);
        var node2Rec = new cc.Rect(node2Pos.x, node2Pos.y, node2BoundingBox.width, node2BoundingBox.height);
        var result = this.domUtils.rectSrcOverlapPercentage(node1Rec, node2Rec);
        node1.setAnchorPoint(node1Anchor);
        node2.setAnchorPoint(node2Anchor);
        return result;
    },

    detectCollision: function()
    {
        var targets = this.domUtils.querySelectorAll(this, "target");
        for (var ii in targets)
        {
            var target = targets[ii];
            if (target.getTag() === 5555)
            {
                continue;
            }

            var overlapPercentage = this.rectOverlapUsingWorldCoordinates(this.arrow, target);
            //log("OverlapPercentage %f", overlapPercentage);
            if (overlapPercentage < 40)
            {
                continue;
            }
            else
            {
                //log("target hit");
                var bullsEye = false;
                this.targetsLeft--;
                if (Archery.prototype.currentSetIndex === (Archery.prototype.maxSetsAvailable - 1) && this.targetsLeft === 0)
                {
                    this.loadMoreTargets();
                }

                this.arrow.stopAllActions();
                var arrowY = this.arrow.getPositionY();
                var targetY = target.getPositionY();
                var bullsEyeMargin = target.getContentSize().height*0.15;
                if (Math.abs(arrowY - targetY) <= bullsEyeMargin)
                {
                    bullsEye = true;
                    var bullsEyePoint = 3;
                    if (this.objectScale === this.objectScaleTypes[0])
                    {
                        bullsEyePoint = 2;
                    }
                    else if (this.objectScale === this.objectScaleTypes[1])
                    {
                        bullsEyePoint = 3;
                    }
                    else if (this.objectScale === this.objectScaleTypes[2])
                    {
                        bullsEyePoint = 4;
                    }
                    else if (this.objectScale === this.objectScaleTypes[3])
                    {
                        bullsEyePoint = 5;
                    }
                    else if (this.objectScale === this.objectScaleTypes[4])
                    {
                        bullsEyePoint = 6;
                    }
                    else if (this.objectScale === this.objectScaleTypes[5])
                    {
                        bullsEyePoint = 7;
                    }

                    Archery.prototype.score += bullsEyePoint;
                }
                else
                {
                    Archery.prototype.score++;
                }

                this.targetFallingAnimation(target, bullsEye);
                this.reloadArrow(this, true);
                this.updateScoreBoard();
            }
        }
    },

    targetFallingAnimation: function(targetSprite, bullsEye)
    {
        var initPos = targetSprite.getPosition();
        var finalPos = cc.p(initPos.x, this.visOrigin.y - this.winSize.height * 0.1);
        var targetFalling = cc.MoveTo.create(1.0, finalPos);

        if (bullsEye)
        {
            var imgUri1 = format(this.asset_object_hit_bullsEye1, this.fruit);
            var imgUri2 = format(this.asset_object_hit_bullsEye2, this.fruit);
            var targetSize = targetSprite.getContentSize();
            targetSprite.setTexture(imgUri1);
            var halfObject = new cc.Sprite(imgUri2);
            halfObject.setPosition(cc.p(targetSize.width*1.2, targetSize.height / 2));
            targetSprite.addChild(halfObject);
        }
        else if (this.fruit === "apricot" || this.fruit === "avocado")
        {
            var rotationAngle = 45.0;
            targetSprite.setRotation(rotationAngle);
        }
        else
        {
            var imgUri = format(this.asset_object_hit_format, (targetSprite.getTag() - 4000).toString());
            targetSprite.setTexture(imgUri);
        }

        targetSprite.runAction(targetFalling);
        targetSprite.setTag(5555);
        playAudioEffect(this, archeryActivity_Res.star_pop_out_1);
    },

    loadMoreTargets: function()
    {
        var availableLocs = this.layout.locations.length;
        if (this.maxTargets > availableLocs)
        {
            this.maxTargets = availableLocs;
        }

        this.targetsLeft = getRandomNumberWithinRange(this.minTargets, this.maxTargets + 1);
        var randomIndices = getNRandomNumbersV1(this.targetsLeft, 0, availableLocs);

        for (var ii = 0; ii < randomIndices.length; ii++)
        {
            var randomObj = getRandomNumberWithinRange(1, 3);
            if (this.fruit === "avocado")
            {
                randomObj = 1;
            }

            var objImgUri = format(this.asset_object_format, this.fruit, randomObj.toString());
            var obj = new cc.Sprite(objImgUri);
            obj.setPosition(this.layout.locations[randomIndices[ii]]);
            this.domUtils.setSelector(obj, "target");
            obj.setTag(4000 + randomObj);
            obj.setScale(this.objectScale);
            this.addChild(obj, 500);
        }
    }
    
});
