
var HurdleJumpActivityLayer = cc.LayerColor.extend({
    bgSprite:null,
    pageConitaner: null,
    header: null,
    backButton: null,
    layout: null,
    asset_character_format: "res/Resources/ipad/common/scenes/scene200/rws200_dog_walking_frame_{0}.png",
    asset_background: "res/Resources/ipad/common/scenes/scene200/rws200_background_sky.png",
    collisionCheckKey: "hurdle_check",
    numberSetFormat: "number_set29_large_{0}",

    domUtils:  DomUtils,
    maxLives: 7,
    livesLeft: 0,
    nHurdles: 0,
    score: 0,
    hurdleIndex: 0,
    highScore: 0,
    nDigitsInScore: 0,
    runnerX: 0.0,
    runnerY: 0.0,
    bonusX: 0.0,
    bonusY: 0.0,
    speed: 0.0,
    maxSpeed: 0.0,
    minSpeed: 0.0,
    increaseMode: false,
    isFinished: false,

    runner: null,
    bonusType1: null,
    bonusType2: null,

    hurdles: [],
    movingNodes: [],
    timeoutMoveHurdle: null,
    
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
        this.maxLives = 7;
        this.livesLeft = this.maxLives - 2;
        this.score = 0;
        this.maxSpeed = 700.0;
        this.minSpeed = 400.0;
        this.speed = this.minSpeed;
        this.nHurdles = 11;
        this.hurdleIndex = 0;
        this.nDigitsInScore = 6;
        this.increaseMode = true;
        this.isFinished = false;
        this.movingNodes.splice(0,this.movingNodes.length);
        this.timeoutMoveHurdle = null;
        
        this.addChild(this.pageConitaner, 10000);
        var backButtonSp = new cc.Sprite(hurdleJumpRes.Back_Button);
        var backButtonSize = backButtonSp.getContentSize();
        this.backButton = new Div(backButtonSize.width, backButtonSize.height);
        this.backButton.addChildInCenter(backButtonSp);
        this.header = new Div(size.width, backButtonSize.height);
        this.header.addChildToLeft(this.backButton);
        this.backButton.setTouchEnable(true);
        this.backButton.setTargetUri("NavigateBack");
        this.pageConitaner.addChildToTop(this.header);

        this.loadView();

        var bgSoundUri = "res/Resources/audio_mid/common/music/casual/bensound_buddy.mp3";
        cc.audioEngine.playMusic(bgSoundUri);
        
        var touchListener = new cc._EventListenerTouchAllAtOnce();
        touchListener.onTouchesBegan = this.onTouchesBegan;
        touchListener.onTouchesMoved = this.onTouchesMoved;
        touchListener.onTouchesEnded = this.onTouchesEnded;
		cc.eventManager.addListener(touchListener, this);
    },

    // acting as a destructor
    dust: function()
    {
        if (this.highScore < this.score)
        {
            this.setHighScore(this.score);
        }

        this.stopAllActions();
        this.unscheduleAllCallbacks();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.stopAllEffects();
        if (this.timeoutMoveHurdle !== null)
        {
            window.clearTimeout(this.timeoutMoveHurdle);
        }
    },

    loadView: function()
    {
        this.origin = getVisibleOrigin();
        this.visibleSize = getVisibleSize();

        this.loadBackGround(this.asset_background);
        this.createMovingGround();
        this.createAndAddRunnerNode();
        this.runningAnimation();
        this.addChromeElements();
        this.hurdles.splice(0,this.hurdles.length);
        this.addHurdles();
        this.createBonusElements();
        this.addHearts();
        this.scheduleCollisionCheck();
        this.scheduleHurdleMove(2.5);

        //var scheduleScoreboardUpdateCallBack = cc.CallFunc.create(this.showCurrentScoreOnScoreBoard, this);
        this.scheduleOnce(this.showCurrentScoreOnScoreBoard, 2.0, "scheduleScoreboardUpdateCallBack");
    },

    createAndAddRunnerNode: function()
    {
        this.runner = new cc.Sprite(hurdleJumpRes.asset_character);
        var runnerSize = this.runner.getContentSize();
        this.runnerX = this.origin.x + this.visibleSize.width * 0.12;
        this.runnerY = this.origin.y + this.visibleSize.height * 0.10 + (runnerSize.height / 2);
        this.runner.setPosition(cc.p(this.runnerX, this.runnerY));
        this.runner.setScale(0.9);
        this.domUtils.setSelector(this.runner, "runner");
        this.addChild(this.runner, 500);
    },

    runningAnimation()
    {
        var noOfFrames = 4;
        var runnerAnimation = cc.Animation.create();
        for (var ii = 1; ii < noOfFrames; ii++)
        {
            var frame = format(this.asset_character_format, (ii).toString());
            runnerAnimation.addSpriteFrameWithFile(frame);
        }

        for (var ii = noOfFrames; ii > 0; ii--)
        {
            var frame = format(this.asset_character_format, (ii).toString());
            runnerAnimation.addSpriteFrameWithFile(frame);
        }

        runnerAnimation.setDelayPerUnit(0.1);
        runnerAnimation.setRestoreOriginalFrame(false);
        runnerAnimation.setLoops(100000);
        var runnerAnimAction = cc.Animate.create(runnerAnimation);
        runnerAnimAction.setTag(4096);
        this.runner.runAction(runnerAnimAction);
        this.movingNodes.push(this.runner);
    },

    addHurdles: function()
    {
        var excludeObjectIds = [ "hurdle_set1_x_large_cactus_3" ];
        //var hurdleSet = RealWorldObjectMetaInfoStore.getInstance().getSetWithoutObjectIds("hurdle_set1_x_large", excludeObjectIds);
        var hurdleSet = this.parseHurdleSetJson(hurdleJumpRes.hurdle_set1_x_large);
        var hurdlesList = hurdleSet.objectSrc;
        shuffleArray(hurdlesList, hurdlesList.length);
        
        var hurdleImgItr = 0;
        var hurdlesListLength = hurdlesList.length;

        for (var ii = 0; ii < this.nHurdles; ii++)
        {
            var hurdleRWO = hurdlesList[hurdleImgItr];
            var hurdleX = this.origin.x + (this.visibleSize.width * (1 + getRandomNumberWithinRange(88, 317)/1000));
            var hurdleY = this.runnerY*0.7;
            var hurdle = new cc.Sprite("res/Resources/ipad/" + hurdleRWO.imageUri);
            hurdle.setPosition(cc.p(hurdleX, hurdleY));
            var selector = format("hurdle_{0}", (ii + 1).toString());
            this.domUtils.setSelector(hurdle, selector);
            hurdle.setTag(789);
            this.addChild(hurdle, 600);

            var attributes = hurdleRWO.attributes;
            for(var itr in attributes)
            {
                var attribute = attributes[itr];
                if (attribute.name === "animationType" && attribute.value === "rotate")
                {
                    hurdle.setOpacity(0);
                    hurdle.setCascadeColorEnabled(false);
                    var hurdleSize = hurdle.getContentSize();
    
                    var hurdleChild = new cc.Sprite("res/Resources/ipad/" + hurdleRWO.imageUri);
                    hurdleChild.setPosition(cc.p(hurdleSize.width / 2, hurdleSize.height / 2));
                    var rotate = cc.RotateBy.create(1.0, -60.0);
                    var repeatRotate = cc.Repeat.create(rotate, 100000);
                    hurdleChild.runAction(repeatRotate);
                    hurdle.addChild(hurdleChild);
                }
            }
            

            this.hurdles.push(hurdle);
            if (++hurdleImgItr === hurdlesListLength)
            {
                hurdleImgItr = 0;
            }
        }
    },

    scheduleHurdleMove: function(delay)
    {
        //var scheduleHurdleCallBack = cc.CallFunc.create(this.moveHurdle, this);
        if (this.timeoutMoveHurdle !== null)
        {
            window.clearTimeout(this.timeoutMoveHurdle);
        }

        var hurdleKey = format("hurdleKey{0}", (this.hurdleIndex).toString());
        function callMoveHurdle() {
            this.moveHurdle();
        }

        var bindMoveHurdle = callMoveHurdle.bind(this);
        this.timeoutMoveHurdle = window.setTimeout(bindMoveHurdle, delay*1000);
        
        //this.scheduleOnce(this.moveHurdle, delay, hurdleKey);
    },

    moveHurdle: function()
    {
        var selector = format("hurdle_{0}", (this.hurdleIndex + 1).toString());
        var hurdle = this.domUtils.querySelector(this, selector);
        if (hurdle !== null)
        {
            var initialPos = hurdle.getPosition();
            var posX = this.origin.x - getRandomNumberWithinRange(10, 100);
            var posY = initialPos.y;
            var finalPos = cc.p(posX, posY);
            var time = cc.pDistance(finalPos, initialPos) / this.speed;
            var moveLeft = cc.MoveTo.create(time, finalPos);
            var moveRight = cc.MoveTo.create(0, initialPos);
            var resetHurdleCallback = cc.CallFunc.create(this.resetHurdle, this, hurdle);

            var moveAction = new cc.Sequence(moveLeft, moveRight, resetHurdleCallback);
            hurdle.runAction(moveAction);
            var probabilityForBonus = getRandomNumberWithinRange(0, 10);
            if (probabilityForBonus === 5)
            {
                this.showBonusElement(posX, posY);
            }

            this.changeHurdleSpeed();
        }

        this.hurdleIndex = (this.hurdleIndex + 1) % this.nHurdles;
        var randomeDelay = getRandomNumberWithinRange(250, 350) / 100.0;
        this.scheduleHurdleMove(randomeDelay);
    },

    changeHurdleSpeed: function()
    {
        if (this.increaseMode)
        {
            if (this.speed < this.maxSpeed)
            {
                this.speed += 5.0;
            }
            else
            {
                this.increaseMode = false;
            }
        }

        if (!this.increaseMode)
        {
            if (this.speed > this.minSpeed)
            {
                this.speed -= 5.0;
            }
            else
            {
                this.increaseMode = true;
            }
        }
    },

    resetHurdle: function(hurdle)
    {
        hurdle.setTag(789);
    },

    createBonusElements: function()
    {
        this.bonusX = this.origin.x + (this.visibleSize.width * (1 + getRandomNumberWithinRange(35, 106)/1000));
        this.bonusY = this.runnerY + this.visibleSize.height * 0.15;

        this.bonusType1 = new cc.Sprite(hurdleJumpRes.asset_bonusType_1);
        //this.bonusType1.setScale(2.0f);
        this.bonusType1.setPosition(cc.p(this.bonusX, this.bonusY));
        this.domUtils.setSelector(this.bonusType1, "bonusType1");
        this.addChild(this.bonusType1, 600);

        this.bonusType2 = new cc.Sprite(hurdleJumpRes.asset_bonusType_2);
        this.bonusType2.setColor(parseHexColor("66bb6a"));
        this.bonusType2.setPosition(cc.p(this.bonusX, this.bonusY));
        //this.bonusType2.setScale(0.9f);
        this.domUtils.setSelector(this.bonusType2, "bonusType2");
        this.addChild(this.bonusType2, 600);
    },

    showBonusElement: function(posX, posY)
    {
        var initialPos = cc.p(this.bonusX, this.bonusY);
        var finalPos = cc.p(posX, this.bonusY);
        var time = cc.pDistance(finalPos, initialPos) / this.speed;
        var moveLeft = cc.MoveTo.create(time, finalPos);
        var moveRight = cc.MoveTo.create(0, initialPos);
        var moveBonus = new cc.Sequence(moveLeft, moveRight);

        var randomBonusType = getRandomNumberWithinRange(0, 10);
        if (randomBonusType < 6 && this.livesLeft < this.maxLives) // 60% probability
        {
            this.bonusType1.runAction(moveBonus);
        }
        else
        {
            this.bonusType2.runAction(moveBonus);
        }
    },

    jumpRunner: function()
    {
        if (this.runner !== null && this.isFinished === false && this.runner.getName() !== "jumping")
        {
            var jumpActionTag = 1234;
            var prevAction = this.runner.getActionByTag(jumpActionTag);
            if (prevAction !== null && prevAction.isDone() === false)
            {
                return;
            }

            var index = this.movingNodes.indexOf(this.runner);
            if (index !== -1)// -1 means the element was not found
            {
                this.runner.stopActionByTag(4096);
                this.movingNodes.splice(index, 1);
            }
            
            var duration = 0.9;
            var position = cc.p(this.runnerX, this.runnerY);
            var height = this.visibleSize.height * 0.37;
            var jumps = 1;
            var jump = new cc.JumpTo(duration, position, height, jumps);
            jump.setTag(jumpActionTag);

            var runningAnimationCallback = cc.CallFunc.create(this.runningAnimation, this);
            var jumpFinishCallback = cc.CallFunc.create(this.jumpFinish, this);
            var jumpSeq = new cc.Sequence(jump, jumpFinishCallback, runningAnimationCallback);
            this.runner.setName("jumping");
            this.runner.runAction(jumpSeq);

            this.score += 3;
            this.updateScoreBoard();
        }
    },

    jumpFinish: function()
    {
        this.runner.setName("running");
    },

    addHearts: function()
    {
        var nRows = 1;
        var nCols = this.maxLives;
        var assetHeartStr = hurdleJumpRes.asset_heart;
        var dummySize = getSpriteDimensions(assetHeartStr);
        var rectWidth = dummySize.width * nCols;
        var rectHeight = dummySize.height;
        var rectPosX = this.origin.x + this.visibleSize.width - rectWidth*1.05;
        var rectPosY = this.origin.y + this.visibleSize.height*0.8;
        var rect = new cc.Rect(rectPosX, rectPosY, rectWidth, rectHeight);
        var livesLayout = getLocationsFromRectInGrid(rect, LayoutGrid.LayoutGrid_Symmetric_MxN, nRows, nCols);

        var consumedLives = this.maxLives - this.livesLeft;
        for (var ii = 0; ii < this.maxLives; ii++)
        {
            var heart = new cc.Sprite(hurdleJumpRes.asset_heart);
            heart.setPosition(livesLayout.locations[ii]);
            var heartSetSelector = format("heartSet_{0}", (this.maxLives - ii).toString());
            this.domUtils.setSelector(heart, heartSetSelector);
            this.addChild(heart, 504);
            if (ii < consumedLives)
            {
                heart.setOpacity(0);
            }
        }
    },

    scheduleCollisionCheck: function()
    {
        if (cc.director.getScheduler().isScheduled(this.collisionCheckKey, this))
        {
            return;
        }

        cc.director.getScheduler().schedule(this.updateTick, this,  0.05, cc.REPEAT_FOREVER, 0, false, this.collisionCheckKey);
    },

    unscheduleCollisionCheck: function()
    {
        cc.director.getScheduler().unschedule(this.collisionCheckKey, this);
    },
    
    updateTick: function()
    {
        this.detectHurdleCollision();
        this.detectBonusCollection();
    },

    hurdleOverlapUsingWorldCoordinates: function(node1, node2)
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

    detectHurdleCollision: function()
    {
        for (var itr in this.hurdles)
        {
            var hurdle = this.hurdles[itr];
            if (hurdle.getTag() === 987)
            {
                return;
            }

            var overlapPercentage = this.hurdleOverlapUsingWorldCoordinates(this.runner, hurdle);
            if (overlapPercentage < 10)
            {
                continue;
            }
            else
            {
                //log("runner hit");
                hurdle.setTag(987);
                this.runnerHit();
            }
        }
    },

    detectBonusCollection()
    {
        var overlapPercentage = this.hurdleOverlapUsingWorldCoordinates(this.runner, this.bonusType1);
        if (overlapPercentage > 5)
        {
            //log("bonusType1 collected");
            playAudioEffect(hurdleJumpRes.sound_of_dog);
            this.bonusType1.stopAllActions();
            this.bonusType1.setPosition(this.bonusX, this.bonusY);
            this.score += 5;
            this.updateScoreBoard();
            var heartSetSelector = format("heartSet_{0}", (++this.livesLeft).toString());
            var heart = this.domUtils.querySelector(this, heartSetSelector);
            if (heart != null)
            {
                var fadeIn = new cc.FadeIn(1.0);
                heart.runAction(fadeIn);
            }

            return;
        }

        overlapPercentage = this.hurdleOverlapUsingWorldCoordinates(this.runner, this.bonusType2);
        if (overlapPercentage > 5)
        {

            var audioEffect1Callback = cc.callFunc(playAudioEffect, this, hurdleJumpRes.alphabet_d);
            var audioEffect2Callback = cc.callFunc(playAudioEffect, this, hurdleJumpRes.alphabet_phonic_d);
            var audioEffect3Callback = cc.callFunc(playAudioEffect, this, hurdleJumpRes.animal_dog);

            var delayInterval1 = 0.7;
            var delay1 = cc.DelayTime.create(delayInterval1);
            var audioPlayequence = new cc.Sequence(audioEffect1Callback, delay1, audioEffect2Callback, delay1, audioEffect3Callback);
            this.runAction(audioPlayequence);
            //log("bonusType2 collected");
            this.bonusType2.stopAllActions();
            this.bonusType2.setPosition(this.bonusX, this.bonusY);
            this.score += 5;
            this.updateScoreBoard();
            return;
        }
    },

    playAudioEffect: function(audioEffectId)
    {
        playAudioEffect(this, audioEffectId);
    },

    runnerHit: function()
    {
        this.playAudioEffect(hurdleJumpRes.effect_drop);
        this.particalExplosion(this.runner);


        var fadeOut = new cc.FadeOut(0.2);
        var fadeIn = new cc.FadeIn(0.2);
        var fadeAction = new cc.Sequence(fadeOut, fadeIn);
        var repeatFade = new cc.Repeat(fadeAction, 2);
        this.runner.runAction(repeatFade);

        var heartSetSelector = format("heartSet_{0}", (this.livesLeft--).toString());
        var heart = this.domUtils.querySelector(this, heartSetSelector);
        if (heart != null)
        {
            var fadeOut = new cc.FadeOut(1.0);
            heart.runAction(fadeOut);
        }
        
        if (this.livesLeft <= 0)
        {
            if (this.timeoutMoveHurdle !== null)
            {
                window.clearTimeout(this.timeoutMoveHurdle);
            }

            this.callComplete();
        }
    },

    callComplete: function()
    {
        this.isFinished = true;
        this.unscheduleAllCallbacks();
        for (var node in this.movingNodes)
        {
            this.movingNodes[node].stopAllActions();
        }
        
        var noOfFrames = 2;
        var runnerAnimation = cc.Animation.create();
        for (var ii = 0; ii < noOfFrames; ii++)
        {
            var frame = format("res/Resources/ipad/common/scenes/scene200/rws200_dog_with_bone_{0}.png", (ii + 1).toString());
            runnerAnimation.addSpriteFrameWithFile(frame);
        }

        runnerAnimation.setDelayPerUnit(0.3);
        runnerAnimation.setRestoreOriginalFrame(false);
        runnerAnimation.setLoops(100000);
        var runnerAnimAction = cc.Animate.create(runnerAnimation);
        this.runner.runAction(runnerAnimAction);
        this.runner.setZOrder(Number.MAX_VALUE);

        var replayButtonSp = new cc.Sprite(hurdleJumpRes.replayButtonUri);
        var replayButtonSize = replayButtonSp.getContentSize();
        var replayButton = new Div(replayButtonSize.width, replayButtonSize.height);
        replayButton.addChildInCenter(replayButtonSp);
        var replayButtonPos = cc.p(this.origin.x + this.visibleSize.width / 2 + replayButtonSize.width / 2, origin.y + this.visibleSize.height / 2 + replayButtonSize.height / 2);
        //replayButton.setPosition(replayButtonPos);
        this.pageConitaner.addChildInCenter(replayButton, Number.MAX_VALUE);
        replayButton.setTouchEnable(true);
        replayButton.setTargetUri("appprotocol://page?id=HurdleJumpActivityLayer");
        var rotate = new cc.RotateBy(1.0, -180);
        var repeatRotate = cc.Repeat.create(rotate, 100000);
        replayButtonSp.runAction(repeatRotate);
        this.domUtils.pulseEffect(replayButtonSp);
        
        /*var replayButtonUri = "StoryApps/SwooshTime/chrome/button/button_replay.png";
        var replayCallback = cc.callFunc(this.replayActivity, this);
        var replayButton = TouchableSprite.create(replayCallback, true, SpriteTouchEffect.ButtonTouchEffect);
        replayButton.setTexture(replayButtonUri);
        var buttonSize = replayButton.getContentSize();
        var buttonPos = cc.p(this.origin.x + this.visibleSize.width / 2 + buttonSize.width / 2, origin.y + this.visibleSize.height / 2 + buttonSize.height / 2);
        replayButton.setPosition(buttonPos);
        this.addChild(replayButton, Number.MAX_VALUE);
        replayButton.setOpacity(0);
        replayButton.setCascadeOpacityEnabled(false);

        var dummyButton = new cc.Sprite(replayButtonUri);
        dummyButton.setPosition(cc.p(buttonSize.width / 2, buttonSize.height / 2));
        replayButton.addChild(dummyButton);
        var rotate = new cc.RotateBy(1.0, -180);
        var repeatRotate = cc.RepeatForever.create(rotate);
        dummyButton.runAction(repeatRotate);
        this.domUtils.pulseEffect(dummyButton);*/
    },

    particalExplosion(node)
    {
        var imagePath = "res/Resources/ipad/common/chrome/quiz/cross_set_0.png";
        var m_emitter = new cc.ParticleFlower();
        m_emitter.setDuration(0.3);
        m_emitter.setEmissionRate(50.0);
        m_emitter.setSpeed(200.0);
        m_emitter.setScale(0.8);
        m_emitter.setLife(1.0);
        var tex = cc.textureCache.addImage(imagePath);
        m_emitter.setTexture(tex);
        m_emitter.setPosition(node.getPosition());
        this.addChild(m_emitter, Number.MAX_VALUE);
    },
    
    loadBackGround: function(bgUri)
    {
        var visibleSize = getVisibleSize();
        var Bg = new cc.Sprite(bgUri);
        Bg.attr({
            x: visibleSize.width / 2,
            y: visibleSize.height / 2
        });
        this.addChild(Bg, 1);

        var nParts = 2;
        var dummyPartSize = visibleSize;//Bg.getContentSize();

        var nRows = 1;
        var nCols = nParts + 1;
        var contentAreaRectWidth = dummyPartSize.width * nParts * 1.5;
        var contentAreaRectHeight = dummyPartSize.height;
        var contentAreaRectPosX = this.origin.x - dummyPartSize.width;
        var contentAreaRectPosY = this.origin.y;
        var contentAreaRect = new cc.Rect(contentAreaRectPosX, contentAreaRectPosY, contentAreaRectWidth, contentAreaRectHeight);
        this.backgroundPartsLayout = getLocationsFromRectInGrid(contentAreaRect, LayoutGrid.LayoutGrid_Symmetric_MxN, nRows, nCols);

        for (var ii = 0; ii < 2; ii++)
        {
            var location = this.backgroundPartsLayout.locations[ii + 1];
            var backBushUri = format("res/Resources/ipad/common/scenes/scene200/rws200_back_bush_{0}.png", (ii + 1).toString());
            var backBushPart = new cc.Sprite(backBushUri);
            this.domUtils.setSelector(backBushPart, "backBush");
            backBushPart.setPosition(location);
            this.addChild(backBushPart, 10);
            
            /*auto dogHouse = Sprite::create("res/Resources/ipad/common/scenes/scene200/rws200_dog_house_2.png");
            dogHouse.setPosition(cc.p(this.visibleSize.width*0.27, this.visibleSize.height*0.4));
            backBushPart.addChild(dogHouse);*/

            var mountainUri = format("res/Resources/ipad/common/scenes/scene200/rws200_mountain_{0}.png", (ii + 1).toString());
            var mountainPart = new cc.Sprite(mountainUri);
            this.domUtils.setSelector(mountainPart, "mountain");
            mountainPart.setPosition(location);
            this.addChild(mountainPart, 5);

            var frontBushUri = format("res/Resources/ipad/common/scenes/scene200/rws200_front_bush_{0}.png", (ii + 1).toString());
            var frontBushPart = new cc.Sprite(frontBushUri);
            this.domUtils.setSelector(frontBushPart, "frontBush");
            frontBushPart.setPosition(location);
            this.addChild(frontBushPart, 800);
        }
        
        this.moveBgParts("backBush", this.speed * 0.7);
        this.moveBgParts("mountain", this.speed * 0.3);
        this.moveBgParts("frontBush", this.speed);
    },

    moveBgParts: function(selector, speed)
    {
        var nParts = this.backgroundPartsLayout.locations.length;
        var parts = this.domUtils.querySelectorAll(this, selector);
        var leftPos = this.backgroundPartsLayout.locations[0];
        var rightPos = this.backgroundPartsLayout.locations[nParts - 1];
        for (var part in parts)
        {
            var currentPos = parts[part].getPosition();
            var time1 = cc.pDistance(leftPos, currentPos) / speed;
            var time2 = 0;
            var time3 = cc.pDistance(rightPos, leftPos) / speed;

            var moveLeft1 = cc.MoveTo.create(time1, leftPos);
            var moveRight = cc.MoveTo.create(time2, rightPos);
            var moveLeft2 = cc.MoveTo.create(time3, leftPos);

            var moveAction = cc.Sequence.create(moveRight, moveLeft2);
            var repeatMove = cc.Repeat.create(moveAction, 100000);
            var moveRepeatAction = cc.Sequence.create(moveLeft1, repeatMove);
            moveRepeatAction.setTag(2048);

            parts[part].runAction(moveRepeatAction);
            this.movingNodes.push(parts[part]);
        }
    },

    createMovingGround: function()
    {
        var nParts = 2;
        var groundPartImg = hurdleJumpRes.asset_rws200_road;
        var dummygroundPartSize = getSpriteDimensions(groundPartImg);

        var nRows = 1;
        var nCols = nParts + 1;
        var contentAreaRectWidth = dummygroundPartSize.width * nParts * 1.5;
        var contentAreaRectHeight = dummygroundPartSize.height;
        var contentAreaRectPosX = this.origin.x -dummygroundPartSize.width;
        var contentAreaRectPosY = this.origin.y;
        var contentAreaRect = new cc.Rect(contentAreaRectPosX, contentAreaRectPosY, contentAreaRectWidth, contentAreaRectHeight);
        this.groundPartsLayout = getLocationsFromRectInGrid(contentAreaRect, LayoutGrid.LayoutGrid_Symmetric_MxN, nRows, nCols);

        for (var ii = 0; ii < nParts; ii++)
        {
            var groundPart = new cc.Sprite(groundPartImg);
            this.domUtils.setSelector(groundPart, "groundPart");
            groundPart.setPosition(this.groundPartsLayout.locations[ii + 1]);
            this.addChild(groundPart, 100);
        }

        this.moveGround();
    },

    moveGround: function()
    {
        var nParts = this.groundPartsLayout.locations.length;
        var groundParts = this.domUtils.querySelectorAll(this, "groundPart");
        var leftPos = this.groundPartsLayout.locations[0];
        var rightPos = this.groundPartsLayout.locations[nParts - 1];
        for (var itr in groundParts)
        {
            var part = groundParts[itr];
            var currentPos = part.getPosition();
            var time1 = cc.pDistance(leftPos, currentPos) / this.speed;
            var time2 = 0;
            var time3 = cc.pDistance(rightPos, leftPos) / this.speed;

            var moveLeft1 = cc.MoveTo.create(time1, leftPos);
            var moveRight = cc.MoveTo.create(time2, rightPos);
            var moveLeft2 = cc.MoveTo.create(time3, leftPos);

            var moveAction = cc.Sequence.create(moveRight, moveLeft2);
            var repeatMove = cc.Repeat.create(moveAction, 100000);
            var moveRepeatAction = cc.Sequence.create(moveLeft1, repeatMove);
            moveRepeatAction.setTag(1024);

            part.runAction(moveRepeatAction);
            this.movingNodes.push(part);
        }
    },

    addChromeElements: function()
    {
        /*var backCallback = cc.callFunc(this.navigateCallback, this);
        var backButton = TouchableSprite.create(backCallback, true, SpriteTouchEffect.ButtonTouchEffect);
        backButton.setTexture("res/Resources/ipad/kindergarten8/buttons/back.png");
        var buttonSize = backButton.getContentSize();
        var buttonPos = Vec2(origin.x + buttonSize.width / 2 + 10, origin.y + visibleSize.height - buttonSize.height / 2 - 5);
        backButton.setPosition(buttonPos);
        this.addChild(backButton, Number.MAX_VALUE);*/

        this.highScore = this.getHighScore();
        var labelFontSize = 30;
        var backgroundOpacity = 255;
        var labelBGColor = "ffffff";
        var fontColor = "FFFF00";
        var labelText = format("Hi-Score: {0}", (this.highScore).toString());
        var scoreboard = this.createScoreLabel(labelText, hurdleJumpRes.asset_scoreboard, backgroundOpacity, labelFontSize, fontColor);
        var scoreboardSize = scoreboard.getContentSize();
        var labelPos = cc.p(this.origin.x + this.visibleSize.width - scoreboardSize.width / 2, this.origin.y + this.visibleSize.height - scoreboardSize.height * 0.45);
        scoreboard.setPosition(labelPos);
        this.domUtils.setSelector(scoreboard, "HurdleJumpScoreboard");
        this.addChild(scoreboard, Number.MAX_VALUE);

        var dummyScoreDigit = new cc.Sprite(numberSet29Large['number_set29_large_0']);
        var digitSize = dummyScoreDigit.getContentSize();
        var scoreDiv = new Div(digitSize.width* this.nDigitsInScore, digitSize.height);
        for (var ii = 0; ii < this.nDigitsInScore; ii++)
        {
            var numberRWObjId = format(this.numberSetFormat, (ii + 1).toString());
            var digitImageUri = numberSet29Large[numberRWObjId];
            var digitSprite = new cc.Sprite(digitImageUri);
            digitSprite.setColor(cc.color.YELLOW);
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
        var mixedSprite = new cc.Sprite(bg);
        if (fontColor == "")
        {
            fontColor = "000000";
        }

        // label opacity, label color, label text color
        var scoreLabel = cc.LabelTTF.create(text, "Arial", fontSize.toString(), cc.TEXT_ALIGNMENT_CENTER);
        scoreLabel.setColor(parseHexColor(fontColor));
        this.domUtils.setSelector(scoreLabel, "scoreLabel");
        var size = mixedSprite.getContentSize();
        scoreLabel.setPosition(cc.p(size.width / 2, size.height * 0.32));
        mixedSprite.addChild(scoreLabel);
        mixedSprite.setOpacity(bgOpacity);
        return mixedSprite;
    },

    showCurrentScoreOnScoreBoard: function()
    {
        var scoreboard = this.domUtils.querySelector(this, "HurdleJumpScoreboard");
        var scoreLabel = this.domUtils.querySelector(scoreboard, "scoreLabel");
        scoreLabel.setVisible(false);
        var scoreDiv = this.domUtils.querySelector(scoreboard, "scoreDiv");
        scoreDiv.setVisible(true);
        this.updateScoreBoard();
    },

    updateScoreBoard: function()
    {
        var number = this.score;
        for (var ii = 0; ii < this.nDigitsInScore; ii++)
        {
            var selector = format("digit_{0}", (ii + 1).toString());
            var digitSprite = this.domUtils.querySelector(this, selector);
            var unit = Math.pow(10, this.nDigitsInScore - 1 - ii);
            var digit = Math.floor(number / unit);
            number %= unit;
            var digitImageUri = numberSet29Large['number_set29_large_' + digit.toString()];
            digitSprite.setTexture(digitImageUri);
        }
    },

    getHighScore: function()
    {
        try{
            var highScore = parseInt(cc.sys.localStorage.getItem("HurdleJumpActivityHighScore"), 10);
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
            cc.sys.localStorage.setItem("HurdleJumpActivityHighScore", highScore);
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

    navigateCallback: function()
    {
        cc.director.runScene(new HelloWorldScene());
    },

    replayActivity: function()
    {
        this.dust();
        
        //Navigator.reloadCurrentPage();
		cc.director.runScene(new ActivityBaseScene("appprotocol://page?id=HurdleJumpActivityLayer"));
    },

    onTouchesBegan: function(touches, event)
    {
        //cc.log("BasketballActivityLayer::onTouchesBegan");
    },

    onTouchesEnded: function(touches, event)
    {
        //log("BasketballActivityLayer::onTouchesEnded");
        var target = event.getCurrentTarget();
        target.jumpRunner();
    },

    onTouchesMoved: function(touches, event)
    {
        //log("BasketballActivityLayer::onTouchesMoved");
    },

    parseHurdleSetJson: function(json)
    {
        var jsonData = jsonToString(json);
        var set = JSON.parse(jsonData);
        var typeData = new RealWorldTypeSchema();
        typeData.name = set.name || "";
        typeData.type = set.type || "";
        typeData.suffix = set.suffix || "";
        typeData.objectSrc = set.objectList || "";
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
});
