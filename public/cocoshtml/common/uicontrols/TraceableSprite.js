var TraceableSprite = cc.Sprite.extend({


    ctor: function (filename)
		{
			this.registerTouchHandlers();
		},

		createTraceableSprite: function(filename, fScale)
		{
			var ret = new TraceableSprite(filename);
			var image = new cc.Image();
			image.initWithImageFile(filename);
			var tex = new cc.Texture2D();
			tex.initWithImage(image);
			if (ret && ret.initWithTexture(tex))
			{
				ret.autorelease();
			}
			else
			{
				CC_SAFE_DELETE(ret);
			}
			ret.filename = filename;
			ret.image = image;
			ret.convertToTraceableSprite(fScale);
			ret.texture = tex;
			return ret;
		},

		/*createTraceableSprite: function(filename, savedPoints) 
		{
			var ret = new TraceableSprite(filename);
			if (ret && ret.initWithFile(filename))
			{
				ret.autorelease(); 
			}
			else
			{
				CC_SAFE_DELETE(ret);  
			}

			ret.filename = filename;
			ret.convertToTraceableSprite(1.0); 
			ret.savedPoints = savedPoints;
			return ret;
		},*/

		convertToTraceableSprite: function(fScale)
		{
			this.setDefaultParameters(fScale);
			this.constructCanvasAndBrushes();
		},

		constructCanvasAndBrushes: function()
		{
			var size = this.getContentSize(); 
			this.canvas = cc.RenderTexture.create(size.width, size.height);
			this.canvas.setAnchorPoint(cc.p(0.5, 0.5));   
			this.canvas.setAutoDraw(false); 
			this.canvas.setPosition(cc.p(size.width / 2, size.height / 2));
			this.canvas.retain(); 
			this.addChild(this.canvas, 4000);
			var f = { GL_ZERO, GL_ONE_MINUS_SRC_ALPHA };
			for (var ii = 0; ii < this.brushCount; ii++)
			{
				var dummyBrush = new cc.Sprite(this.brushImagePath);
				dummyBrush.retain();
				this.brushes.push(dummyBrush);
			}

			this.brushIterator = this.brushes[0];
		},

		setDefaultParameters: function(fScale)
		{
			this.isFreeHandTraceActive = false;
			this.isGuidingHandEnabled = false;
			this.setScale(fScale);
			this.presentIndex = 1;
			this.isInActive = true;
			this.stdBackWindow = 9;
			this.stdFrontWindow = 30;
			this.brushCount = 2000;
			this.isPointMatcherActive = false;
			this.variableBackWindow = this.stdBackWindow;
			this.allowedDeviation = 7;
			this.isPatternBeingMatched = false;
			this.smoothingNumber = 4;
			this.isScratchingActive = false;
			this.allowedSlip = 1.3;
			this.pointDistanceStore = NULL;
			this.distanceStore = NULL;
			this.backPointControlForSmoothness = 6;
			this.correctImagePointStoreIndex = -1;
			this.isTrainingActive = false;
			this.matchRatio = 0.95;
			this.allowedDeviationBuffer = 10;
			this.restoreIndex = 0;
			this.brushImagePath = "common/chrome/quiz/brush_2.png";
			this.brushImageScale = 1.0;
		},

		getNearestIndex: function(currLoc, presentIndex, localMatchPoint) 
		{
			var up = presentIndex + this.stdFrontWindow; 
			var down = presentIndex - this.variableBackWindow; 
			var index = -1;
			var dist;
			var minDist = Math.pow(2, 30);
			var ii;
			down = MAX(down, 0);
			up = MIN(up, (savedPoints.size() - 1));
			var itUp = this.savedPoints[0] + up; 
			var it = this.savedPoints[0] + down;
			ii = down;
			for (it; it < itUp; it++)
			{
				dist = calculateDistance(currLoc, it);
				if (minDist > dist)
				{
					minDist = dist;
					index = ii;
					localMatchPoint = it;
				}

				ii++;
			}

			if (minDist < this.allowedDeviation)
			{
				if (this.correctImagePointStoreIndex < this.scratchedPathPoints.length)
				{
					this.correctImagePointStoreIndex = this.scratchedPathPoints.length - 1;
					this.restoreIndex = index;
				}

				return index;
			}
			else if (minDist < this.allowedDeviationBuffer)
			{
				this._eventDispatcher.dispatchCustomEvent(this.deviatedWithinLimit);
				return index;
			}
			else if (minDist > this.allowedDeviationBuffer)
			{
				this.isPatternBeingMatched = false;
				this._eventDispatcher.dispatchCustomEvent(this.outOfallowedDeviationLimit);
				return -1;
			}

			return -1;
		},

		getScaledTraceableSprite: function(fScale)  
		{
			var localSavedPoints = this.savedPoints;
			var localFilename = this.filename;
			this.canvas.release();
			this.release();
			var sprite = createTraceableSprite(localFilename, fScale);
			sprite.savedPoints = localSavedPoints;
			return sprite;
		},


		registerTouchHandlers: function()
		{
			var touchListener = EventListenerTouchOneByOne.create();
			//touchListener.setSwallowTouches(true); 
            var touchListener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    
				var location = touch.getLocation();
				var locationInNode = this.convertToNodeSpace(location);
				var s = this.getContentSize()* this.getScale(); 
				var rect = new cc.Rect(0, 0, s.width, s.height);
				if (rect.containsPoint(locationInNode))
				{
					this.onTouchesBeganExtended(locationInNode); 
					return true;
				}

				return false;
                },
    
                onTouchMoved: function(touch, event)
                {
                    var location = touch.getLocation();
                    var locationInNode = this.convertToNodeSpace(location);
                    var s = this.getContentSize()* this.getScale();
                    var rect = new cc.Rect(0, 0, s.width, s.height);
                    if (rect.containsPoint(locationInNode))
                    {
                        this.onTouchesMovedExtended(locationInNode);
                    }
                },
    
                onTouchEnded : function(touch, event)
                {
                    this._eventDispatcher.dispatchCustomEvent(this.touchEnd);
                    var location = touch.getLocation();
                    var locationInNode = this.convertToNodeSpace(location);
                    /*Size s = this.getContentSize()* this.getScale();
                    Rect rect = Rect(0, 0, s.width, s.height);
                    if (rect.containsPoint(locationInNode))
                    {
                        this.onTouchesEndedExtended(locationInNode);
                    }*/
                    this.onTouchesEndedExtended(locationInNode);
                }
            });

            cc.eventManager.addListener(touchListener, this);
		},

		onTouchesBeganExtended: function(posInTraceableSprite)
		{
			this._eventDispatcher.dispatchCustomEvent(this.touchStart);
			this.touchIntervalPoints.clear();
			this.brushIterator = this.brushes.begin();
			this.touchIntervalPoints.push_back(posInTraceableSprite);
			this.onTouchesMovedExtended(posInTraceableSprite);
		},


		onTouchesMovedExtended: function(posInTraceableSprite)
		{
			var outOfLimitEventSleepTime = 10;
			if (this.isTrainingActive) 
			{
				var nearestSafePoint = this.getNearestPointInSequence(posInTraceableSprite, this.imagePointsForSaving);
				if (this.savedPoints.size() == 0 || this.savedPoints.size() > 0 && this.calculateDistance(this.savedPoints.back(), nearestSafePoint) > 0.15)
				{
					this.putColor(nearestSafePoint, false); 
					this.savedPoints.push_back(nearestSafePoint);
				}
			}
			else if (this.isScratchingActive) 
			{
				this.smoothCurve(posInTraceableSprite);
				this.touchIntervalPoints.push_back(posInTraceableSprite);
			}
			else if (this.isPointMatcherActive || this.isFreeHandTraceActive)
			{
				var localMatchPoint;
				var nearestPointIndex = this.getNearestIndex(posInTraceableSprite, this.presentIndex, localMatchPoint); 
				if (nearestPointIndex == -1)
				{
					if (this.isFreeHandTraceActive)
					{
						this.restoreSprite();
						this.touchIntervalPoints.clear();
						this.presentIndex = MAX(this.restoreIndex,0);
						//Sleep(outOfLimitEventSleepTime);
					}
					else if (this.isGuidingHandEnabled)
					{
						this.showGuiderHand();
					}

					return;
				}
				else if (nearestPointIndex >= this.presentIndex)
				{
					this.presentIndex = nearestPointIndex;
					this.variableBackWindow = this.stdBackWindow;
					if (this.isPatternBeingMatched == false)
					{
						this.isPatternBeingMatched = true;
						this._eventDispatcher.dispatchCustomEvent(this.patternMatchReturned);
					}
				}
				else
				{
					this.variableBackWindow--;
				}

				if (this.isFreeHandTraceActive)
				{
					if (this.touchIntervalPoints.size() > 1)
					{
						this.smoothCurve(posInTraceableSprite);
					}
					this.touchIntervalPoints.push_back(posInTraceableSprite);
				}
				else
				{

					if (this.touchIntervalPoints.size() > 1)
					{
						this.smoothCurve(localMatchPoint);
					}
					else if (this.touchIntervalPoints.size() == 1) //for putting a single point
					{
						log("just one point");
						this.putColor(posInTraceableSprite, false);
					}

					this.touchIntervalPoints.push_back(localMatchPoint);
				}
			}
		},

		// can place an animation here to guide the kid to start from particular position only
		showGuiderHand: function()
		{
			if (this.restoreIndex >= this.savedPoints.length - this.allowedDeviation)
			{
				this._eventDispatcher.dispatchCustomEvent(this.patternMatched, this);
			}
			else if (this.restoreIndex >= 0)
			{ 
				var brush = new cc.Sprite("common/chrome/quiz/hand_1.png");
				brush.setAnchorPoint(Vec2(0.0, 1.0));
                var maxDeviation = this.restoreIndex + this.allowedDeviation;
                var maxSavedPoints = this.savedPoints.size() - 1;
                brush.setPosition(this.savedPoints[Math.min(maxDeviation, maxSavedPoints)]);
				DomUtils.setSelector(brush, "guiderHand");
				this.addChild(brush, 5000);
				var animationDuration = 1.0;
				var finalOpacityForAnimation = 0; //To make the hand disappear
				var delayTime = cc.delayTime.create(animationDuration);
				var callBackRemoveGuiderHand = cc.CallFunc.create(this.removeGuiderHand, this);
				var handDisappear = cc.FadeTo.create(animationDuration, finalOpacityForAnimation);
				var moveAndDisappear = cc.Sequence.create(handDisappear, delayTime, callBackRemoveGuiderHand, NULL);
				brush.runAction(moveAndDisappear);
			}
		},

		removeGuiderHand: function()
		{
			var guiderHand = DomUtils.querySelector(this, "guiderHand");
			guiderHand.removeFromParentAndCleanup(true);
		},

		onTouchesEndedExtended: function(locationInNode)
		{
			if (!this.isFreeHandTraceActive && !this.isPointMatcherActive)
			{
				return;
			}

			if (this.restoreIndex >= this.savedPoints.length - this.allowedDeviation)
			{
				this._eventDispatcher.dispatchCustomEvent(this.patternMatched, this);
				return;
			}

			var ratio = this.presentIndex / this.savedPoints.length;
			if (ratio < this.matchRatio)
			{
				return;
			}

			if (this.isPatternBeingMatched)
			{
				this._eventDispatcher.dispatchCustomEvent(this.patternMatched, this);
			}
			else
			{
				this._eventDispatcher.dispatchCustomEvent(this.outOfallowedDeviationLimit);
			}
		},

		getFileNameFromPath: function(name)
		{
			var requiredName = "";
			var ii = name.length - 1;
			while (name[ii--] != '.'){}
			for (ii; name[ii] != '/'; ii--)
			{
				requiredName += name[ii];
			}
			reverse(requiredName.begin(), requiredName.end());
			return requiredName;
		},

		finishTraining: function()
		{
			var minRequiredSavedPoints = 2;
			var dirName = "training_data";
			// to be called from the quiz 
			typedef struct
			{
				var x, y;
			} PointData;

			PointData newFileData;

			if (this.savedPoints.size() < minRequiredSavedPoints)
			{
				return false;
			}

			//this.writePointsInImage(this.image);
			var charaterName = this.getFileNameFromPath(this.filename);
			var destFilePath = cocos2d.FileUtils.getWritablePath() + dirName + string("/") + charaterName + string(".json");
			
			
			var jsonDataLog = "{\"points\":[";
			var fmt = "";
			for (var it in this.savedPoints)
			{
				newFileData.x = this.savedPoints[it].x;
				newFileData.y = this.savedPoints[it].y;

				
				if (it.equals(this.savedPoints.end() - 1))
				{
					fmt = string("{\"x\": {0}, \"y\": {1}}");
				}
				else
				{
					fmt = string("{\"x\": {0}, \"y\": {1}},");
				}
				
				jsonDataLog += format(fmt, to_string(it.x), to_string(it.y));
			}

			jsonDataLog += string("]}");
			log(jsonDataLog.c_str());

			//this.image.saveToFile(destFilePath, false);
			return true;
		},

		getStartingPointForBezier: function(newPoint, currentSlip, lastPoint)
		{
			var ii = 0;
			var startingPoint;
			var dist = Math.pow(2, 30);
			var dummyDist;
			var it;
			for (it = this.touchIntervalPoints.rbegin() + 1; it != this.touchIntervalPoints.rend() && ii < this.backPointControlForSmoothness; it++) //back point control = 6 .. till 5 points u can use to make a smooth curve
			{
				ii++;
				dummyDist = this.calculateDistance(it, lastPoint);
				var difference = Math.abs(dummyDist - currentSlip);
				if (dist > difference)
				{
					dist = difference;
					startingPoint = it;
				}
			}

			return startingPoint;
		},

		smoothCurve: function(newPoint) 
		{
			var lastPointDistanceLimit = 0.5;
			var minPointsRequiredForBezier = 2;
			var controlDist = Math.pow(2, 30);
			var lastPoint = this.touchIntervalPoints.back();
			var currentSlip = this.calculateDistance(newPoint, lastPoint);
			this.canvas.begin();
			//this.putColor(newPoint, true);
			this.brushIterator = this.brushes.begin();
			this.scratchedPathPoints.push_back(newPoint);
			if (this.touchIntervalPoints.size() > minPointsRequiredForBezier && currentSlip > this.allowedSlip) 
			{
				var startPoint = this.getStartingPointForBezier(newPoint, currentSlip, lastPoint);  
				var pixelControlCoefficientPerPixel = 1.0 / (cc.director.getContentScaleFactor()); 
				var dt = 1 / (pixelControlCoefficientPerPixel * currentSlip);
				var bezierC;
				var brushesSize = this.brushes.size();
				bezierC.controlPoint_1 = startPoint;
				bezierC.controlPoint_2 = lastPoint;
				bezierC.endPosition = newPoint;
				var maxBrushRequired = 1.0 / dt;
				// extra buffer to resolve the boundary case of 1 brush already being used 
				maxBrushRequired += 5;
				if (maxBrushRequired > this.brushes.length)
				{
					var currentBrushCount = this.brushes.length;
					while (currentBrushCount < maxBrushRequired)
					{
						var extraBrush = new cc.Sprite(this.brushImagePath);
						extraBrush.retain();
						this.brushes.push(extraBrush);
						currentBrushCount++;
					}
				}

				for (var tt = 1; controlDist > lastPointDistanceLimit && tt > 0; tt -= dt)
				{
					controlDist = this.markPosition(tt, bezierC);
				}
			}

			this.canvas.end();
		},

		markPosition: function(t, bezierC)
		{
			// starting point
			var P0 = bezierC.controlPoint_1;
			// 1 control point
			var P1 = bezierC.controlPoint_2;
			// end point
			var P2 = bezierC.endPosition;
			var smoothingPoint = this.getBezierPoint(t, P0, P1, P2);
			(this.brushIterator).setPosition(smoothingPoint);
			var currentActiveColor4B = ColorPicker.getColor();
			var currentActiveColor3B = Color3B(currentActiveColor4B);
			(this.brushIterator).setColor(currentActiveColor3B);
			(this.brushIterator).setScale(this.brushImageScale);
			(this.brushIterator).visit();
			this.brushIterator++;
			this.scratchedPathPoints.push_back(smoothingPoint);
			return this.calculateDistance(smoothingPoint, P1);
		},

		getNearestPointInSequence: function(givenPoint, givenSequecne)
		{
			var dummyPoint;
			var it;
            var dist;
            var D = Math.pow(2, 30);
			for (var it in givenSequecne)
			{
				dist = TraceableSprite.calculateDistance(givenSequecne[it], givenPoint);
				if (D > dist)
				{
					D = dist;
					dummyPoint = it;
				}
			}

			return dummyPoint;
		},

		getBezierPoint: function(t, point1, point2, point3)
		{
			var p;
			p.x = pow((1 - t), 2) * point1.x + 2 * t * (1 - t) * point2.x + pow(t, 2) * point3.x; 
			p.y = pow((1 - t), 2) * point1.y + 2 * t * (1 - t) * point2.y + pow(t, 2) * point3.y;
			return p;
		},


		getDTWCoefficient: function()
		{
			var resultValue;
			this.scratchedPathPoints = this.deleteClosePointsInSequence(this.scratchedPathPoints);
			this.testAnglePoints = this.convertToAngleSequence(this.scratchedPathPoints);
			this.savedAnglePoints = this.convertToAngleSequence(this.savedPoints);
			var min = 10000;
			for (var jj = -50; jj <= 50; jj += 25)
			{
				for (var ii = -150; ii < 150; ii += 25)
				{
					resultValue = this.computeDTWValue(this.testAnglePoints, this.shiftSequence(this.savedAnglePoints, ii, jj));
					if (min > resultValue)
					{
						min = resultValue;
					}
				}
			}
			// value is 7.5 for the characters 
			log(min);
			return min;
		},

		computeDTWValue: function(test, train)
		{
			var nn = train.size();
			var mm = test.size();
			this.pointDistanceStore = createMatrix(test, train);
			if (this.distanceStore == NULL)
			{
				this.distanceStore = new(nothrow) float*[mm + 1];

				var memoryPool = new (nothrow)float[(nn + 1)*(mm + 1)];
				var poolStep = 0;
				for (var ii = 0; ii < mm + 1; ii++)
				{
					this.distanceStore[ii] = &memoryPool[poolStep];
					poolStep += nn + 1;
				}
			}

			for (var ii = 0; ii < (mm + 1); ii++)
			{
				this.distanceStore[ii][0] = Math.pow(2, 30);
			}

			for (var ii = 0; ii < (nn + 1); ii++)
			{
				this.distanceStore[0][ii] = Math.pow(2, 30);
			}

			this.distanceStore[0][0] = 0;
			return this.DTW(mm, nn) / (mm + nn);
		},

		DTW: function(mm, nn)
		{
			var min;
			for (var ii = 1; ii <= mm; ii++)
			{
				var rowDataPtr = this.distanceStore[ii];
				var bottomRowPtr = this.distanceStore[ii - 1];
				var pointDistancePtr = this.pointDistanceStore[ii - 1];
				for (var jj = 1; jj <= nn; jj++)
				{
					var currentVal = pointDistancePtr++;
					var leftVal = rowDataPtr;
					var bottomLeftVal = bottomRowPtr++;
					var bottomVal = bottomRowPtr;
					var valueToAdd = leftVal;
					min = leftVal;
					if (bottomVal < leftVal)
					{
						min = bottomVal;
					}

					valueToAdd = min;
					if (bottomLeftVal <= min)
					{
						valueToAdd = bottomLeftVal;
					}

					rowDataPtr++;
					rowDataPtr = currentVal + valueToAdd;
				}
			}
			return this.distanceStore[mm][nn];
		},

		createMatrix: function(M, N)
		{
			var pointDistances;
			var sizeN = N.length;
			var sizeM = M.length;
			if (this.pointDistanceStore == NULL)
			{
				pointDistances = new (nothrow) float*[M.length];
				var memoryPool = new (nothrow)float[M.size()*N.length];
				var poolStep = 0;

				for (var ii = 0; ii < M.size(); ii++)
				{
					pointDistances[ii] = &memoryPool[poolStep];
					poolStep += sizeN;
				}
			}
			else
			{
				pointDistances = this.pointDistanceStore;
			}

            var mPtr[3];
            var nPtr[3];
			for (var ii = 0; ii < 3; ii++)
			{
				mPtr[ii] = new float[sizeM];
				nPtr[ii] = new float[sizeN];
			}

			var kk = 0;
			for (var mIns : M)
			{
				mPtr[0][kk] = mIns.x;
				mPtr[1][kk] = mIns.y;
				mPtr[2][kk++] = mIns.z;
			}

			kk = 0;
			for (var nIns : N)
			{
				nPtr[0][kk] = nIns.x;
				nPtr[1][kk] = nIns.y;
				nPtr[2][kk] = nIns.z;
				kk++;
			}

			for (var ii = 0; ii < sizeM; ii++)
			{
				for (var jj = 0; jj < sizeN; jj++)
				{
					var mIns = Vec3(mPtr[0][ii], mPtr[1][ii], mPtr[2][ii]);
					var nIns = Vec3(nPtr[0][jj], nPtr[1][jj], nPtr[2][jj]);
					pointDistances[ii][jj] = this.calculateAngleDistance(mIns, nIns);
				}
			}

			for (var ii = 0; ii < 3; ii++)
			{
				delete mPtr[ii];
				delete nPtr[ii];
			}

			return pointDistances;
		},

		getPointsFromImageTrain: function(image, fScale) 
		{
			float contentScaleF = Director::getInstance().getContentScaleFactor();
			vector<Vec2> dummy;
			auto imgData = image.getData();
			auto imgW = image.getWidth();
			auto imgH = image.getHeight();
			int bytesPerPixel;
			if (image.hasAlpha()) 
			{
				bytesPerPixel = 4;
			}

			else
			{
				bytesPerPixel = 3;
			}

			for (unsigned int yy = 0; yy < imgH; yy += 1)
			{
				for (unsigned int xx = 0; xx < imgW; xx += 1)
				{
					unsigned char* ptr = (unsigned char*)(imgData + (yy * imgW + xx)*bytesPerPixel);
					if (ptr[0] != 0)
					{
						dummy.push_back(Vec2(xx, imgH - yy));
					}
				}
			}

			dummy = this.scaleSequenceX(dummy, (1 / contentScaleF / fScale)); 
			return dummy;
		},

		putColor: function(point, isCanvasEnabled)
		{
			var currentActiveColor4B = ColorPicker.getColor();
			var stepIncrease = 100;
			if (this.brushIterator == this.brushes.end()) 
			{
				for (var ii = 0; ii < stepIncrease; ii++)
				{
					var extraBrush = new cc.Sprite(this.brushImagePath);
					var currentActiveColor3B = Color3B(currentActiveColor4B);
					extraBrush.setColor(currentActiveColor3B);
					extraBrush.retain();
					this.brushes.push_back(extraBrush);
				}
				this.brushIterator = this.brushes.begin() + (this.brushes.size() - stepIncrease - 1);
			}

			if (!isCanvasEnabled)
			{
				this.canvas.begin();
			}

			(*this.brushIterator).setPosition(point);
			(*this.brushIterator).setColor(Color3B(currentActiveColor4B));
			(*this.brushIterator).setScale(this.brushImageScale);
			(*this.brushIterator).visit();
			this.brushIterator++;

			if (!isCanvasEnabled)
			{
				this.canvas.end();
			}
		},

		convertToAngleSequence: function(sequence)
		{
			var dummy;
			var oldLoc;
			var angle;
			dummy.reserve(sequence.size());
			dummy.push_back(Vec3(sequence[0].x, sequence[0].y, 0));
			var it;
			for (it = sequence.begin() + 1; it < sequence.end(); it++)
			{
				oldLoc = Vec2(dummy.back().x, dummy.back().y);
				angle = this.getAngle(oldLoc, *it) / 10;
				dummy.push_back(Vec3(it.x, it.y, angle));
			}
			return dummy;
		},

		restoreSprite: function()
		{
			this.canvas.removeFromParent();
			this.canvas.release();
			var size = this.getContentSize();
			this.canvas = RenderTexture::create(size.width, size.height);
			this.canvas.setAnchorPoint(Vec2(0.5, 0.5));
			this.canvas.setAutoDraw(false);
			this.canvas.setPosition(Vec2(size.width / 2, size.height / 2));
			this.canvas.retain();
			this.addChild(this.canvas, 400000);
			vector<Vec2>::iterator it;
			this.canvas.begin();
			for (it = this.scratchedPathPoints.begin(); this.correctImagePointStoreIndex >= 0 && it < this.scratchedPathPoints.begin() + this.correctImagePointStoreIndex; it++)
			{
				this.putColor(*it, true);
			}

			// removing the stored out of first deviation points
			this.scratchedPathPoints.erase(it, this.scratchedPathPoints.end());
			if (this.restoreIndex >= 0)
			{
				// can place a animation here at these coordinates to guide the kid to start from here only 
				var brush = new cc.Sprite("common/chrome/quiz/circle_small_0.png");
				brush.retain();
				brush.setPosition(this.savedPoints[this.restoreIndex]);
				brush.visit();
				brush.release();
			}
			this.canvas.end();
		},

		deleteClosePointsInSequence: function(points)
		{
			var closeDistancePointLimit = 0.15;
			var dummy;
			vector<Vec2> ::const_iterator it = points.begin();
			dummy.push_back(*it);
			it++;
			for (it; it < points.end(); it++)
			{
				if (this.calculateDistance(*it, dummy.back()) > closeDistancePointLimit)
				{
					dummy.push_back(*it);
				}
			}
			return dummy;
		},


		refreshCanvas: function()
		{
			this.canvas.removeFromParent();
			this.canvas.release();
			var size = this.getContentSize();
			this.canvas = RenderTexture::create(size.width, size.height);
			this.canvas.setAnchorPoint(Vec2(0.5, 0.5));
			this.canvas.setAutoDraw(false);
			this.canvas.setPosition(Vec2(size.width / 2, size.height / 2));
			this.canvas.retain();
			this.addChild(this.canvas, 40000);
		},



		createDirectory: function(dirname)
		{
			var path = cocos2d::FileUtils::getInstance().getWritablePath() + string("/") + dirname;

			var ret = false;
            ret = cocos2d::FileUtils::getInstance().createDirectory(path);
			return ret;
		},

		getPosInSprite: function(touchPosition)
		{
			var touchInWorld = this.getParent().convertToWorldSpace(touchPosition);
			var posInTraceableSprite = this.convertToNodeSpace(touchInWorld);
			return posInTraceableSprite;
		},

		calculateDistance: function(pointOne, pointTwo)
		{
			var scaleDistance = 2; 
			var a = (pointOne.x - pointTwo.x)*(pointOne.x - pointTwo.x);
			var b = (pointOne.y - pointTwo.y)*(pointOne.y - pointTwo.y);
			var result = sqrt(a + b);
			return result;
		},


		float TraceableSprite::calculateAngleDistance(const Vec3 &pointOne, const Vec3 &pointTwo)
		{
			float a = (pointOne.x - pointTwo.x)*(pointOne.x - pointTwo.x);
			float b = (pointOne.y - pointTwo.y)*(pointOne.y - pointTwo.y);
			float c = (pointOne.z - pointTwo.z)*(pointOne.z - pointTwo.z);
			float result = sqrt(a + b + c);
			return result;
		},


		vector<Vec2> TraceableSprite::scaleSequenceX(const vector<Vec2> &inputSequence, float factor)
		{
			vector<Vec2> dummy;
			dummy.reserve(inputSequence.size());
			float tempX, tempY;
			vector<Vec2>::const_iterator it;
			for (it = inputSequence.begin(); it < inputSequence.end(); it++)
			{
				tempX = it.x * factor;
				tempY = it.y * factor;
				dummy.push_back(Vec2(tempX, tempY));
			}

			return dummy;
		},

		vector<Vec3> TraceableSprite::shiftSequence(const vector<Vec3> &inputSequence, float marginX, float marginY)
		{
			float tempX, tempY;
			vector<Vec3> dummy;
			dummy.reserve(inputSequence.size());
			for (vector<Vec3> ::const_iterator it = inputSequence.begin(); it < inputSequence.end(); it++)
			{
				tempX = it.x + marginX;
				tempY = it.y + marginY;
				dummy.push_back(Vec3(tempX, tempY, it.z));
			}

			return dummy;
		},

		setBackPointControlForSmoothness: function(input)
		{
			this.backPointControlForSmoothness = input;
		},

		setSmoothingNumber: function(input)
		{
			this.smoothingNumber = input;
		},

		setallowedDeviation: function(input)
		{
			this.allowedDeviation = input;
		},

		setAllowedSlip: function(input)
		{
			this.allowedSlip = input;
		},

		setallowedDeviationBuffer: function(input)
		{
			this.allowedDeviationBuffer = input;
		},

		setBrushCount: function(input)
		{
			this.brushCount = input;
		},

		setFrontWindow: function(input)
		{
			this.stdFrontWindow = input;
		},

		void TraceableSprite::setBackWindow(int input)
		{
			this.stdBackWindow = input;
		},

		void TraceableSprite::setScratching(bool input)
		{
			this.isScratchingActive = input;
		},

		void TraceableSprite::setVariableBackWindow(int input)
		{
			this.variableBackWindow = input;
		},

		void TraceableSprite::setMatchRatio(float input)
		{
			this.matchRatio = input;
		},

		void TraceableSprite::changeBoundRatio(float input)
		{
			this.boundRatio = input;
		},

		void TraceableSprite::setTestingActive()
		{
			typedef struct
			{
				float x, y;
			}PointData;

			const string dirName = "training_data";
			string characterName = this.getFileNameFromPath(this.filename);

			if (this.savedPoints.size() < 5)
			{

				string path = "json/tracing_data/" + characterName + string(".json");
				ssize_t aa = 0;
				log("path %s", path.c_str());
				path = FileUtils::getInstance().fullPathForFilename(path);
				log("full path %s", path.c_str());

				Query* query = new Query();
				query.uri = path;
				query.responseParser = (void*)(JsonParser)(&TraceableSprite::parseTrainingDataJson);
				auto responseSchema = (ResponseSchema*)DataController::getInstance().RequestV2(query);
				delete query;
				auto pointsData = (TrainingDataFileSchema*)responseSchema.responseObject;
				for (size_t itr = 0; itr < pointsData.points.size(); itr++)
				{
					auto point = pointsData.points.at(itr);
					this.savedPoints.push_back(Vec2(point.x, point.y));
				}
				
				//this.savedPoints = this.getPointsFromImageTest(this.image, this.getScale());
			}
			this.isFreeHandTraceActive = true;
			this.brushIterator = this.brushes.begin();
			this.isTrainingActive = false;
			this.isPointMatcherActive = false;
		},

		void* TraceableSprite::parseTrainingDataJson(CSJsonDictionary& json)
		{
			TrainingDataFileSchema* tracingData = new TrainingDataFileSchema();
			auto pointSetsCount = json.getArrayItemCount("points");
			for (int i = 0; i < pointSetsCount; i++)
			{
				auto PointSets = json.getSubItemFromArray("points", i);
				auto pointData = new TrainingDataPointsSchema();
				pointData.x = PointSets.getItemDoubleValue("x", 0);
				pointData.y = PointSets.getItemDoubleValue("y", 0);
				tracingData.points.push_back(pointData);
				delete PointSets;
			}

			return tracingData;
		},

		void TraceableSprite::setTrainingActive()
		{
			this.imagePointsForSaving = this.getPointsFromImageTrain(this.image, this.getScale());
			this.savedPoints.clear(); 
			this.isFreeHandTraceActive = false;
			this.isTrainingActive = true;
			this.isPointMatcherActive = false;
			this.brushIterator = this.brushes.begin();
		},

		setInActive: function()
		{
			this.isFreeHandTraceActive = false;
			this.isTrainingActive = false;
		},

		setPointMatcherActive: function()
		{
			this.isPointMatcherActive = true;
			this.isTrainingActive = false;
			this.isFreeHandTraceActive = false;
		},

		TraceableSprite::~TraceableSprite()
		{
			this.canvas.release();
			var it;
			for (it = this.brushes.begin(); it < this.brushes.end(); it++)
			{
				it.release();
			}

			this.image.release();
			this.texture.release();
			if (this.pointDistanceStore != NULL)
			{
				delete this.pointDistanceStore;
				delete this.distanceStore;
			}
			// how to delete this image 
		},

		getAngle: function(oldLoc, newLoc)
		{
			var angle = atan2(newLoc.y - oldLoc.y, newLoc.x - oldLoc.x);
			angle = (float)angle * 180 / M_PI;
			return angle;
		},

		getxyFromColor: function(input)
		{
			int xx, yy;
			xx = (input.r << 4) + (input.g >> 4);
			yy = input.b + ((input.g &~(15 << 4)) << 8);
			return Vec2(xx, yy);
		},

		getColorFromxy: function(input)
		{
			var rr, gg, bb;
			var xx, yy;
			xx = input.x;
			yy = input.y;
			rr = xx >> 4;
			gg = ((xx &~(255 << 4)) << 4) + (yy >> 8);
			bb = yy &~(255 << 8);
			return cc.Color3B(rr, gg, bb);
		},

		writePointsInImage: function(image)
		{
			auto imgData = image.getData();
			auto imgW = image.getWidth();
			auto imgH = image.getHeight();
			int bytesPerPixel;
			vector<Vec2> ::iterator it;
			it = this.savedPoints.begin();
			Color3B pixelColor;
			if (image.hasAlpha())
			{
				bytesPerPixel = 4;
			}

			else
			{
				bytesPerPixel = 3;
			}

			for (unsigned int xx = 0; xx < imgW; xx += 1)
			{
				for (unsigned int yy = 0; yy < imgH; yy += 1)
				{

					if (true)// vector condition here 
					{
						unsigned char* ptr = (unsigned char*)(imgData + (yy * imgW + xx)*bytesPerPixel);
						//pixelColor = this.getColorFromxy(*it);
						ptr[0] = 220;//pixelColor.r;
						ptr[1] = 230;//pixelColor.b;
						ptr[2] = 245;// pixelColor.g;
						ptr[3] = 200;
						//it++;
					}
					else
					{
						break;
					}
				}
			}
		},

		getImageData: function()
		{
			if (this.image != NULL)
			{
				return this.image;
			}

			this.image = new Image();
			image.initWithImageFile(this.filename);
			return this.image;
		},

		getPointsFromImageTest: function(image, fScale)
		{
			var dummy;
			var imgData = image.getData();
			var imgW = image.getWidth();
			var imgH = image.getHeight();
			var bytesPerPixel;
			var pixelColor;
			var encodedLocation;
			if (image.hasAlpha())
			{
				bytesPerPixel = 4;
			}

			else
			{
				bytesPerPixel = 3;
			}

			for (var xx = 0; xx < imgW; xx += 1)
			{
				for (var yy = 0; yy < imgH; yy += 1)
				{
					unsigned char* ptr = (unsigned char*)(imgData + (yy * imgW + xx)*bytesPerPixel);
					if (ptr[0] == 0 && ptr[1] == 0 && ptr[2] == 0)
					{
						return dummy;
					}
					pixelColor = Color3B(ptr[0], ptr[1], ptr[2]);
					encodedLocation = this.getxyFromColor(pixelColor);
					dummy.push_back(encodedLocation);
				}
			}
            
            return dummy;
		}

});