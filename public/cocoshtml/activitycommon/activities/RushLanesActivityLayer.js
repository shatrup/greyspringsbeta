
var RushLanesActivityLayer = cc.LayerColor.extend({
    bgSprite:null,
    pageConitaner: null,
    header: null,
    backButton: null,
    layout: null,
    asset_character_format: "res/Resources/ipad/common/chrome/quiz/walking_elephant_{0}.png",
    asset_background: "res/Resources/ipad/common/backgrounds/background_fullbleed/background_lime_green.png",
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
    laneIndex: 0, // 0 for left and 1 for right
    maxLanes: 2,
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

    lanePosX: [],
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
        this.livesLeft = this.maxLives - 1;
        this.score = 0;
        this.maxSpeed = 500.0;
        this.minSpeed = 200.0;
        this.speed = this.minSpeed;
        this.maxLanes = 2;
        this.laneIndex = 0;
        this.hurdleIndex = 0;
        this.nDigitsInScore = 6;
        this.increaseMode = true;
        this.isFinished = false;
        this.movingNodes.splice(0,this.movingNodes.length);
        this.lanePosX.splice(0,this.lanePosX.length);
        this.hurdles.splice(0,this.hurdles.length);
        this.timeoutMoveHurdle = null;
        
        this.addChild(this.pageConitaner, 10000);
        var backButtonSp = new cc.Sprite(rushLanesRes.Back_Button);
        var backButtonSize = backButtonSp.getContentSize();
        this.backButton = new Div(backButtonSize.width, backButtonSize.height);
        this.backButton.addChildInCenter(backButtonSp);
        this.header = new Div(size.width, backButtonSize.height);
        this.header.addChildToLeft(this.backButton);
        this.backButton.setTouchEnable(true);
        this.backButton.setTargetUri("NavigateBack");
        this.pageConitaner.addChildToTop(this.header);

        this.loadView();

        cc.audioEngine.playMusic(rushLanesRes.bgSoundUri);
        
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
        this.lanePosX.push(this.origin.x + this.visibleSize.width * 0.4);
        this.lanePosX.push(this.origin.x + this.visibleSize.width * 0.6);
        this.createAndAddRunnerNode();
        this.runningAnimation();
        this.addChromeElements();
        this.addHurdles();
        this.createBonusElements();
        this.addHearts();
        this.scheduleCollisionCheck();
        this.scheduleHurdleMove(1.0);

        //var scheduleScoreboardUpdateCallBack = cc.CallFunc.create(this.showCurrentScoreOnScoreBoard, this);
        this.scheduleOnce(this.showCurrentScoreOnScoreBoard, 2.0, "scheduleScoreboardUpdateCallBack");
    },

    createAndAddRunnerNode: function()
    {
        var runnerScale = 0.5;
        this.runner = new cc.Sprite(rushLanesRes.asset_character);
        this.runner.setScale(runnerScale);
        var runnerSize = this.runner.getContentSize();
        runnerSize.width *= runnerScale;
        runnerSize.height *= runnerScale;
        this.runnerX = this.lanePosX[this.laneIndex];
        this.runnerY = this.origin.y + (runnerSize.height / 2);
        this.runner.setPosition(cc.p(this.runnerX, this.runnerY));
        this.domUtils.setSelector(this.runner, "runner");
        this.addChild(this.runner, 500);
    },

    runningAnimation()
    {
        var noOfFrames = 2;
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
        var hurdleSet = this.parseHurdleSetJson(rushLanesRes.car_set1_x_large);
        var hurdlesList = hurdleSet.objectSrc;
        this.nHurdles = hurdlesList.length;
        shuffleArray(hurdlesList, hurdlesList.length);
        
        var hurdleImgItr = 0;
        var hurdlesListLength = hurdlesList.length;

        for (var ii = 0; ii < this.nHurdles; ii++)
        {
            var hurdleRWO = hurdlesList[hurdleImgItr];
            var hurdleX = this.lanePosX[ii % 2];
            var hurdleY = this.origin.y + (this.visibleSize.width * (1 + getRandomNumberWithinRange(120, 432)/1000));
            var hurdle = new cc.Sprite("res/Resources/ipad/" + hurdleRWO.imageUri);
            hurdle.setPosition(cc.p(hurdleX, hurdleY));
            var selector = format("hurdle_{0}", (ii + 1).toString());
            this.domUtils.setSelector(hurdle, selector);
            hurdle.setTag(789);
            this.addChild(hurdle, 400);            

            this.hurdles.push(hurdle);
            if (++hurdleImgItr === hurdlesListLength)
            {
                hurdleImgItr = 0;
            }
        }
    },

    scheduleHurdleMove: function(delay)
    {
        if (this.timeoutMoveHurdle !== null)
        {
            window.clearTimeout(this.timeoutMoveHurdle);
        }

        function callMoveHurdle() {
            this.moveHurdle();
        }

        var bindMoveHurdle = callMoveHurdle.bind(this);
        this.timeoutMoveHurdle = window.setTimeout(bindMoveHurdle, delay*1000);
    },

    moveHurdle: function()
    {
        this.score+=2;
        this.updateScoreBoard();
        var selector = format("hurdle_{0}", (this.hurdleIndex + 1).toString());
        var hurdle = this.domUtils.querySelector(this, selector);
        if (hurdle !== null)
        {
            var initialPos = hurdle.getPosition();
            var posX = initialPos.x;
            var posY = this.origin.y - getRandomNumberWithinRange(24, 240);
            var finalPos = cc.p(posX, posY);
            
            var probabilityForBonus = getRandomNumberWithinRange(0, 10);
            if (probabilityForBonus == 5)
            {
                this.showBonusElement(posX, posY);
            }
            else
            {
                var time = cc.pDistance(finalPos, initialPos) / this.speed;
                var moveDown = cc.MoveTo.create(time, finalPos);
                var moveUp = cc.MoveTo.create(0, initialPos);
                var resetHurdleCallback = cc.CallFunc.create(this.resetHurdle, this, hurdle);
    
                var moveAction = new cc.Sequence(moveDown, moveUp, resetHurdleCallback);
                hurdle.runAction(moveAction);
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
                this.speed += 2.0;
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
                this.speed -= 2.0;
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
        this.bonusX = this.lanePosX[getRandomNumberWithinRange(0, 2)];
		this.bonusY = this.origin.y + (this.visibleSize.height * (1 + getRandomNumberWithinRange(120, 432)/1000));

        this.bonusType1 = new cc.Sprite(rushLanesRes.asset_bonusType_1);
        var bonusPart2 = new cc.Sprite(rushLanesRes.asset_bonusType_1);
        this.bonusType1.addChild(bonusPart2);
        var bonusSize = bonusPart2.getContentSize();
        bonusPart2.setPosition(cc.p(bonusSize.width / 2, bonusSize.height));
        
        //this.bonusType1.setScale(2.0);
        this.bonusType1.setPosition(cc.p(this.bonusX, this.bonusY));
        this.domUtils.setSelector(this.bonusType1, "bonusType1");
        this.addChild(this.bonusType1, 400);

        this.bonusType2 = new cc.Sprite(rushLanesRes.asset_bonusType_2);
        this.bonusType2.setColor(parseHexColor("66bb6a"));
        this.bonusType2.setPosition(cc.p(this.bonusX, this.bonusY));
        this.bonusType2.setScale(0.9);
        this.domUtils.setSelector(this.bonusType2, "bonusType2");
        this.addChild(this.bonusType2, 400);
    },

    showBonusElement: function(posX, posY)
    {
        var initialPos = cc.p(this.bonusX, this.bonusY);
        var randomBonusType = getRandomNumberWithinRange(0, 10);

        if (randomBonusType < 6 && this.livesLeft < this.maxLives) // 60% probability
        {
            var finalPos = cc.p(this.bonusType1.getPositionX(), posY);
            var time = cc.pDistance(finalPos, initialPos) / this.speed;
            var moveDown = cc.MoveTo.create(time, finalPos);
            var moveUp = cc.MoveTo.create(0, initialPos);
            var moveBonus = new cc.Sequence(moveDown, moveUp);
            this.bonusType1.runAction(moveBonus);
        }
        else
        {
            var finalPos = cc.p(this.bonusType2.getPositionX(), posY);
            var time = cc.pDistance(finalPos, initialPos) / this.speed;
            var moveDown = cc.MoveTo.create(time, finalPos);
            var moveUp = cc.MoveTo.create(0, initialPos);
            var moveBonus = new cc.Sequence(moveDown, moveUp);
            this.bonusType2.runAction(moveBonus);
        }
    },

    shiftLane: function()
    {
        if (this.runner !== null && this.isFinished === false)
        {
            var shiftActionTag = 1234;
            var prevAction = this.runner.getActionByTag(shiftActionTag);
            if (prevAction !== null && prevAction.isDone() === false)
            {
                return;
            }

            this.laneIndex = (this.laneIndex + 1) % this.maxLanes;
            var duration = 0.4;
            var posX = this.lanePosX[this.laneIndex];
            var position = cc.p(posX, this.runnerY);
            var shift = cc.MoveTo.create(duration, position);
            shift.setTag(shiftActionTag);
            this.runner.runAction(shift);
        }
    },

    addHearts: function()
    {
        var scale = 0.8;
        var nRows = 1;
        var nCols = this.maxLives;
        var assetHeartStr = rushLanesRes.asset_heart;
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
            var heart = new cc.Sprite(rushLanesRes.asset_heart);
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

        cc.director.getScheduler().schedule(this.updateTick, this,  0.1, cc.REPEAT_FOREVER, 0, false, this.collisionCheckKey);
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
            playAudioEffect(rushLanesRes.sound_of_elephant);
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

            var audioEffect1Callback = cc.callFunc(playAudioEffect, this, rushLanesRes.alphabet_e);
            var audioEffect2Callback = cc.callFunc(playAudioEffect, this, rushLanesRes.alphabet_phonic_e);
            var audioEffect3Callback = cc.callFunc(playAudioEffect, this, rushLanesRes.animal_elephant);

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
        this.playAudioEffect(rushLanesRes.effect_car_horn);
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
        
        var replayButtonSp = new cc.Sprite(rushLanesRes.replayButtonUri);
        var replayButtonSize = replayButtonSp.getContentSize();
        var replayButton = new Div(replayButtonSize.width, replayButtonSize.height);
        replayButton.addChildInCenter(replayButtonSp);
        var replayButtonPos = cc.p(this.origin.x + this.visibleSize.width / 2 + replayButtonSize.width / 2, origin.y + this.visibleSize.height / 2 + replayButtonSize.height / 2);
        //replayButton.setPosition(replayButtonPos);
        this.pageConitaner.addChildInCenter(replayButton, Number.MAX_VALUE);
        replayButton.setTouchEnable(true);
        replayButton.setTargetUri("appprotocol://page?id=RushLanesActivityLayer");
        var rotate = new cc.RotateBy(1.0, -180);
        var repeatRotate = cc.Repeat.create(rotate, 100000);
        replayButtonSp.runAction(repeatRotate);
        this.domUtils.pulseEffect(replayButtonSp);
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

        var roadSprite = new cc.Sprite("res/Resources/ipad/common/backgrounds/background_fullbleed/background_road_top_view2.png");
        roadSprite.setPosition(cc.p(this.origin.x + this.visibleSize.width / 2, this.origin.y + this.visibleSize.height / 2));
        this.addChild(roadSprite, 2);

        var nParts = 5;
        var dummyPartSize = getSpriteDimensions(rushLanesRes.treeImgUri);

        var nRows = nParts + 1;
        var nCols = 1;
        var contentAreaRectWidth = dummyPartSize.width;
        var contentAreaRectHeight = this.visibleSize.height* 1.2 + dummyPartSize.height * 2;
        var contentAreaRectPosX = this.origin.x + this.visibleSize.width *0.25 - dummyPartSize.width / 2;
        var contentAreaRectPosY = this.origin.y - this.visibleSize.height * 0.1 - dummyPartSize.height;
        var contentAreaRect = new cc.Rect(contentAreaRectPosX, contentAreaRectPosY, contentAreaRectWidth, contentAreaRectHeight);
        this.backgroundPartsLayout = getLocationsFromRectInGrid(contentAreaRect, LayoutGrid.LayoutGrid_Symmetric_MxN, nRows, nCols);

        var locationRightX = this.origin.x + this.visibleSize.width*0.69 + dummyPartSize.width / 2;
		for (var ii = 0; ii < nParts; ii++)
        {
            var locationLeft = this.backgroundPartsLayout.locations[ii];
            var locationRight = cc.p(locationRightX, locationLeft.y);

            var leftSideTree = new cc.Sprite(rushLanesRes.treeImgUri);
            leftSideTree.setPosition(locationLeft);
            this.domUtils.setSelector(leftSideTree, "sideTree");
            this.addChild(leftSideTree, 10);
            var scaleLeft = getRandomNumberWithinRange(4, 10) / 10.0;
            leftSideTree.setScale(scaleLeft);

            var rightSideTree = new cc.Sprite(rushLanesRes.treeImgUri);
            rightSideTree.setPosition(locationRight);
            this.domUtils.setSelector(rightSideTree, "sideTree");
            this.addChild(rightSideTree, 10);
            var scaleRight = getRandomNumberWithinRange(4, 10) / 10.0;
            rightSideTree.setScale(scaleRight);
        }
        
        this.moveBgParts("sideTree", this.speed * 0.7);
    },

    moveBgParts: function(selector, speed)
    {
        var nParts = this.backgroundPartsLayout.locations.length;
        var parts = this.domUtils.querySelectorAll(this, selector);
        var bottomPosY = this.backgroundPartsLayout.locations[0].y;
        var topPosY = this.backgroundPartsLayout.locations[nParts - 1].y;
        for (var part in parts)
        {
            var currentPos = parts[part].getPosition();
            var bottomPos = cc.p(currentPos.x, bottomPosY);
            var topPos = cc.p(currentPos.x, topPosY);

            var time1 = cc.pDistance(bottomPos, currentPos) / speed;
            var time2 = 0;
            var time3 = cc.pDistance(topPos, bottomPos) / speed;

            var moveLeft1 = cc.MoveTo.create(time1, bottomPos);
            var moveRight = cc.MoveTo.create(time2, topPos);
            var moveLeft2 = cc.MoveTo.create(time3, bottomPos);

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
        var groundPartImg = rushLanesRes.road_devider;
        var roadDividerSize = getSpriteDimensions(groundPartImg);

        var nRows = nParts + 1;
        var nCols = 1;
        var contentAreaRectWidth = roadDividerSize.width;
        var contentAreaRectHeight = roadDividerSize.height * nParts * 1.5;
        var contentAreaRectPosX = this.origin.x + ((this.visibleSize.width - roadDividerSize.width) / 2);
        var contentAreaRectPosY = this.origin.y - roadDividerSize.height;
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
        var downPos = this.groundPartsLayout.locations[0];
        var upPos = this.groundPartsLayout.locations[nParts - 1];
        for (var itr in groundParts)
        {
            var part = groundParts[itr];
            var currentPos = part.getPosition();
            var time1 = cc.pDistance(downPos, currentPos) / this.speed;
            var time2 = 0;
            var time3 = cc.pDistance(upPos, downPos) / this.speed;

            var moveDown1 = cc.MoveTo.create(time1, downPos);
            var moveUp = cc.MoveTo.create(time2, upPos);
            var moveDown2 = cc.MoveTo.create(time3, downPos);

            var moveAction = cc.Sequence.create(moveUp, moveDown2);
            var repeatMove = cc.Repeat.create(moveAction, 100000);
            var moveRepeatAction = cc.Sequence.create(moveDown1, repeatMove);
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
        var scoreboard = this.createScoreLabel(labelText, rushLanesRes.asset_scoreboard, backgroundOpacity, labelFontSize, fontColor);
        var scoreboardSize = scoreboard.getContentSize();
        var labelPos = cc.p(this.origin.x + this.visibleSize.width - scoreboardSize.width / 2, this.origin.y + this.visibleSize.height - scoreboardSize.height * 0.45);
        scoreboard.setPosition(labelPos);
        this.domUtils.setSelector(scoreboard, "RushLanesScoreboard");
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
        var scoreboard = this.domUtils.querySelector(this, "RushLanesScoreboard");
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
            var highScore = parseInt(cc.sys.localStorage.getItem("RushLanesActivityHighScore"), 10);
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
            cc.sys.localStorage.setItem("RushLanesActivityHighScore", highScore);
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
		cc.director.runScene(new ActivityBaseScene("appprotocol://page?id=RushLanesActivityLayer"));
    },

    onTouchesBegan: function(touches, event)
    {
        //cc.log("BasketballActivityLayer::onTouchesBegan");
    },

    onTouchesEnded: function(touches, event)
    {
        //log("BasketballActivityLayer::onTouchesEnded");
        var target = event.getCurrentTarget();
        target.shiftLane();
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
