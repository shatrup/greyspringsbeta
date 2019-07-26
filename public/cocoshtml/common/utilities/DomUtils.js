
var DomElement = function()
{
    this.dataList = {};
}

DomElement.prototype.setData = function(key, data)
{
    if (this.dataList == null)
    {
        delete this.dataList.key;
    }
    else
    {
        this.dataList[key] = data;
    }
}

DomElement.prototype.getData = function(key)
{
    if(key in this.dataList)
    {
        var result = this.dataList[key];
        return result;
    }

    return null;
}

var DomUtils = function()
{

}

DomUtils.getChildByTagRecursive = function(parent, nodeTag)
{

}

DomUtils.getChildrenByTagRecursive = function(parent, nodeTag)
{

}

DomUtils.getChildByTag = function(root, tag)
{

}

DomUtils.getChildenRecursive = function(node)
{

}

DomUtils.removeChildenRecursive = function(node)
{

}

DomUtils.removeChildrenRecursive = function(node, selector)
{

}

DomUtils.prototype.getSelector = function(node)
{    
    var emptyStr = "";
    if (node == null)
    {
        return emptyStr;
    }

    var data = DomUtils.prototype.getData(node, "DomElementDataType");
    if (data == null)
    {
        return emptyStr;
    }

    return data.selector;
}

DomUtils.prototype.setSelector = function(node, selector)
{    
    if (node == null)
    {
        return;
    }

    var data = DomUtils.prototype.getData(node, "DomElementDataType");
    if (data == null)
    {
        data = new DomElementDataType();
    }

    data.selector = selector;
    DomUtils.prototype.setData(node, "DomElementDataType", data);
}

DomUtils.prototype.querySelector = function(parent, selector)
{    
    if (parent == null)
    {
        return null;
    }

    var children = parent.getChildren();
    var nodeFound = null;
    for (var itr in children)
    {
        var childNode = children[itr];
        var domElementData = DomUtils.prototype.getData(childNode, "DomElementDataType");
        var domElementSelecterMatched = (domElementData != null && domElementData.selector == selector);
        if (domElementSelecterMatched)
        {
            nodeFound = childNode;
            return nodeFound;
        }
    }

    for (var itr in children)
    {
        var childNode = children[itr];
        nodeFound = DomUtils.prototype.querySelector(childNode, selector);
        if (nodeFound)
        {
            break;
        }
    }

    return nodeFound;
}

DomUtils.prototype.querySelectorAll = function(parent, selector)
{
    if (parent == null)
    {
        return null;
    }

    var childrenFound = Array();
    var children = parent.getChildren();
    for (var itr = 0, len = children.length; itr < len; itr++)
    {
        var childNode = children[itr];
        var domElementData = DomUtils.prototype.getData(childNode, "DomElementDataType");
        var domElementSelecterMatched = (domElementData != null && domElementData.selector == selector);
        if (domElementSelecterMatched)
        {
            childrenFound.push(childNode);
        }

        var nodesFound = DomUtils.prototype.querySelectorAll(childNode, selector);
        if (nodesFound.length < 1)
        {
            continue;
        }

        for (var itr in nodesFound)
        {
            childrenFound.push(itr);
        }
    }

    return childrenFound;
}

DomUtils.queryAttribute = function(parent, attrName, attrValue){
}

DomUtils.queryAttributeAll = function(parent, attrName, attrValue){
}

DomUtils.setAttribute = function(node, attrName, attrValue){
}

DomUtils.getAttribute = function(node, attrName){
}

DomUtils.prototype.setData = function(node, key, data)
{
    if (node == null)
    {
        return;
    }

    var domElement = node.getUserData();
    if (domElement == null)
    {
        domElement = new DomElement();
    }

    domElement.setData(key, data);
    node.setUserData(domElement);
}

DomUtils.prototype.getData = function(node, key)
{
    if (node == null)
    {
        return null;
    }

    var domElement = node.getUserData();
    if (domElement == null || (typeof domElement.getData === 'undefined'))
    {
        return null;
    }

    return domElement.getData(key);
}

DomUtils.setOpacity = function(object, opaque){
}

DomUtils.FadeOut = function(object){
}

DomUtils.deepSetColor = function(sprite, color){
}

DomUtils.particalExplosion = function(obj, particalImgUri){
}

DomUtils.textToSprite = function(text, alphabetSetSuffix){
}

DomUtils.FadeIn = function(object){
}

DomUtils.distance = function(node1, node2){
}

DomUtils.spriteOverlapPercentage = function(node1, node2){
}

DomUtils.spriteSrcOverlapPercentage = function(srcNode, DestNode){
}

DomUtils.rectOverlapPercentage = function(bb1, bb2){
}

DomUtils.prototype.rectSrcOverlapPercentage = function(bb1, bb2)
{
    var intersectWidth = 0.0;
    var intersectHeight = 0.0;
    if (cc.rectGetMinX(bb1) > cc.rectGetMinX(bb2))
    {
        intersectWidth = cc.rectGetMaxX(bb2) - cc.rectGetMinX(bb1);
    }
    else
    {
        intersectWidth = cc.rectGetMaxX(bb1) - cc.rectGetMinX(bb2);
    }

    if (cc.rectGetMinY(bb1) > cc.rectGetMinY(bb2))
    {
        intersectHeight = cc.rectGetMaxY(bb2) - cc.rectGetMinY(bb1);
    }
    else
    {
        intersectHeight = cc.rectGetMaxY(bb1) - cc.rectGetMinY(bb2);
    }

    var intersectArea = intersectHeight * intersectWidth;
    intersectArea = intersectHeight < 0 || intersectWidth < 0 ? -(Math.abs(intersectArea)) : Math.abs(intersectArea);
    var bb1Area = (cc.rectGetMaxX(bb1) - cc.rectGetMinX(bb1)) * (cc.rectGetMaxY(bb1) - cc.rectGetMinY(bb1));
    var overlap = (100 * intersectArea) / bb1Area;
    return overlap;
}

DomUtils.createBackgroundNode = function(origin, height, width, color1, color2){
}

DomUtils.wrapNodeWithRectangle = function(node, colorStr, alpha, padding, pointSize){
}

DomUtils.unWrapNodeRectangle = function(node){
}

DomUtils.createSparkleAtPosition = function(position){
}

DomUtils.createFireworks = function(duration){
}

DomUtils.createRectangle = function(height, width, color, alpha){
}

DomUtils.duplicateSprite = function(sprite){
}

DomUtils.toAndFroEffect = function(sprite){
}

DomUtils.pendulamEffect = function(sprite, duration, rotateAngle){
}

DomUtils.upDownEffect = function(sprite, duration, jump){
}

DomUtils.boxMotion = function(sprite){
}

DomUtils.floatForeverMotion = function(sprite){
}

DomUtils.createLine = function(size, color){
}

DomUtils.switchNodeParent = function(node, newParent, zIndex){
}

DomUtils.playExplosionEffect = function(sprite){
}

DomUtils.prototype.getLocationFromTouches = function(touches)
{    
    var touch = touches[0];
    var location = touch.getLocationInView();
    //location = cc.director.convertToGL(location);
    return cc.p(location.x, location.y);
}

DomUtils.fadeTo = function(object, time, opacity){
}

DomUtils.prototype.glowEffect = function(sprite)
{
    var nRepeat = 16000;
    var duration = 1.5; // seconds
    var fadeIn = cc.FadeTo.create(duration, 200);
    var fadeOut = cc.FadeTo.create(duration, 255);
    var seq = cc.Sequence.create(fadeIn, fadeOut, NULL);
    var repeat = cc.Repeat.create(seq, nRepeat);
    sprite.runAction(repeat);
}

DomUtils.prototype.pulseEffect = function(sprite)
{
    var nRepeat = 16000;
    var originalScale = sprite.getScale();
    var scalefactor = 1.1;
    var duration = 0.5;
    var zoomin = cc.ScaleTo.create(duration, scalefactor * originalScale);
    var zoomout = cc.ScaleTo.create(duration, originalScale);
    var fadeIn = cc.FadeTo.create(duration, 200);
    var fadeOut = cc.FadeTo.create(duration, 255);
    var actionSequence1 = cc.Spawn.create(zoomin, fadeIn);
    var actionSequence2 = cc.Spawn.create(zoomout, fadeOut);
    var actionSequence = cc.Sequence.create(actionSequence1, actionSequence2);
    var repeat = cc.Repeat.create(actionSequence, nRepeat);
    repeat.setTag(1925);
    sprite.runAction(repeat);
}

DomUtils.showFlyingMessageOnNode = function(node, message){
}

DomUtils.prototype.isTouchInsideNode = function(node, touch, event)
{    
    var locationInNode = node.getParent().convertToNodeSpace(touch.getLocation());
    if (cc.rectContainsPoint(node.getBoundingBox(), locationInNode))
    {
        return true;
    }

    return false;
}

DomUtils.showSnowEffect = function(obj){
}

DomUtils.addFireFlyAnimation = function( node, fireFlyImgSrc){
}

DomUtils.addFloatingDropsAnimation = function( node, dropImgSrcFormat, noOfDrops){
}

DomUtils.addMusicNodeAnimation = function( node, fireFlyImgFormat){
}
