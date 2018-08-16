;(function(global, undefined){
	"use strict"
    var _global,
        EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        },
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        }
    }
    function randomHexColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)
    }
    function TextFlow (option) {
        this.wrap = document.getElementById(option.wrap)
        this.flowClock = document.getElementsByClassName(option.flowClock)
        this.scale = option.scale
        this.iTimer = option.iTimer
        this.isRandomBackgroundColor = option.isRandomBackgroundColor
        this.isRandomColor = option.isRandomColor
        this.finishTime = {
            min: +Math.min.apply(null, option.finishTime.split(/[,-\s]/g)),
            max: +Math.max.apply(null, option.finishTime.split(/[,-\s]/g))
        }
        this.direction = option.direction
        this.isPause = option.isPause
        this.contentWidth = this.wrap.offsetWidth
        this.contentHeight = this.wrap.offsetHeight
        this.circlePoint = {
            x: this.contentWidth / 2,
            y: this.contentHeight / 2
        }
        this._init()
    }
    TextFlow.prototype._init = function () {
        for (var i = 0; i < this.flowClock.length; i++) {
            var flowClockItem = this.flowClock[i]
            flowClockItem.pause = 1
            flowClockItem.time = null
            this._initialize(flowClockItem)
            if (this.isPause) {
                EventUtil.addHandler(flowClockItem, 'mouseover', function () {
                    this.pause = 0
                })
                EventUtil.addHandler(flowClockItem, 'mouseout', function () {
                    this.pause = 1
                })
            }
        }
        this._startRun()
    }
    TextFlow.prototype._initialize = function (flowClockItem) {
        var scale = Math.random() * this.scale + 1
        var iTimer = parseInt(Math.random() * this.iTimer)
        var finishTime = parseInt(Math.random() * this.finishTime.max + this.finishTime.min)
        var contentWidth = this.contentWidth
        var contentHeight = this.contentHeight
        flowClockItem.direction = this.direction[parseInt(Math.random() * this.direction.length)]
        // console.log('看看这是啥东西direction', obj.direction)
        flowClockItem.pause = 0
        flowClockItem.style.fontSize = 18 * scale + 'px'
        if (flowClockItem.direction === 'top') {
            var iLeft = parseInt(Math.random() * contentWidth)
            if (iLeft - flowClockItem.offsetWidth > 0) {
                flowClockItem.initLeft = iLeft - flowClockItem.offsetWidth
                flowClockItem.initTop = - flowClockItem.offsetHeight
            } else {
                flowClockItem.initLeft = iLeft
                flowClockItem.initTop = - flowClockItem.offsetHeight
            }
            flowClockItem.centerCoordinatesY = - flowClockItem.offsetHeight / 2
            flowClockItem.centerCoordinatesX = flowClockItem.initLeft + flowClockItem.offsetWidth / 2
        } else if (flowClockItem.direction === 'bottom') {
            var iLeft = parseInt(Math.random() * contentWidth)
            if (iLeft - flowClockItem.offsetWidth > 0) {
                flowClockItem.initLeft = iLeft - flowClockItem.offsetWidth
                flowClockItem.initTop = contentHeight
            } else {
                flowClockItem.initLeft = iLeft
                flowClockItem.initTop = contentHeight
            }
            flowClockItem.centerCoordinatesY = contentHeight + flowClockItem.offsetHeight / 2
            flowClockItem.centerCoordinatesX = flowClockItem.initLeft + flowClockItem.offsetWidth / 2
        } else if (flowClockItem.direction === 'left') {
            var iTop = parseInt(Math.random() * contentHeight)
            if (iTop - flowClockItem.offsetHeight > 0) {
                flowClockItem.initLeft = - flowClockItem.offsetWidth
                flowClockItem.initTop = iTop - flowClockItem.offsetHeight
            } else {
                flowClockItem.initLeft = - flowClockItem.offsetWidth
                flowClockItem.initTop = iTop
            }
            flowClockItem.centerCoordinatesY = flowClockItem.initTop + flowClockItem.offsetHeight / 2
            flowClockItem.centerCoordinatesX = -flowClockItem.initLeft / 2
        } else {
            var iTop = parseInt(Math.random() * contentHeight)
            if (iTop - flowClockItem.offsetHeight > 0) {
                flowClockItem.initLeft = contentWidth
                flowClockItem.initTop = iTop - flowClockItem.offsetHeight
            } else {
                flowClockItem.initLeft = contentWidth
                flowClockItem.initTop = iTop
            }
            //当初始化的方向是在矩形右边的时候 矩形中间的坐标为 （contentWidth + obj.offsetWidth/2, obj.initTop + obj.offsetHeight / 2）
            flowClockItem.centerCoordinatesY = flowClockItem.initTop + flowClockItem.offsetHeight / 2
            flowClockItem.centerCoordinatesX = contentWidth + flowClockItem.offsetWidth / 2
        }
        flowClockItem.style.left = flowClockItem.initLeft + 'px'
        flowClockItem.style.top = flowClockItem.initTop + 'px'
        if (this.isRandomBackgroundColor) {
            flowClockItem.style.backgroundColor = randomHexColor()
        }
        if (this.isRandomColor) {
            flowClockItem.style.color = randomHexColor()
        }
        clearTimeout(flowClockItem.time)
        flowClockItem.time = setTimeout(function () {
            flowClockItem.pause = 1
        }, iTimer)
        // flowClockItem.pause = 1
        flowClockItem.distanceX = Math.abs(this.circlePoint.x - flowClockItem.centerCoordinatesX)
        flowClockItem.ispeedX = flowClockItem.distanceX / (20 * finishTime) // X轴速度
        flowClockItem.distanceY = Math.abs(this.circlePoint.y - flowClockItem.centerCoordinatesY)
        flowClockItem.ispeedY = flowClockItem.distanceY / (20 * finishTime) // Y轴速度
    }
    TextFlow.prototype._startRun = function() {
        var _this = this
        setInterval(function() {
            for (var i = 0; i < _this.flowClock.length; i++) {
                var flowClockItem = _this.flowClock[i]
                if (flowClockItem.pause) {
                    _this._doRun(flowClockItem)
                }
            }
        }, 50)
    }
    TextFlow.prototype._doRun = function (flowClockItem) {
            if (this._isArriveDestination(flowClockItem)) {
                this._initialize(flowClockItem)
            }
    }
    TextFlow.prototype._isArriveDestination = function (flowClockItem) {
        if (flowClockItem.direction === 'top') {
            if (flowClockItem.distanceX <= 0 && flowClockItem.distanceY <= 0) {
                return true
            } else {
                flowClockItem.style.left = flowClockItem.centerCoordinatesX > this.circlePoint.x ? (flowClockItem.offsetLeft - flowClockItem.ispeedX + 'px') : (flowClockItem.offsetLeft + flowClockItem.ispeedX + 'px')
                // 有可能中心点在圆心左边或者右边
                flowClockItem.style.top = flowClockItem.offsetTop + flowClockItem.ispeedY + 'px'
                flowClockItem.distanceX = flowClockItem.distanceX - flowClockItem.ispeedX
                flowClockItem.distanceY = flowClockItem.distanceY - flowClockItem.ispeedY
                return false
            }
        } else if (flowClockItem.direction === 'bottom') {
            if (flowClockItem.distanceX <= 0 && flowClockItem.distanceY <= 0) {
                return true
            } else {
                flowClockItem.style.left = flowClockItem.centerCoordinatesX > this.circlePoint.x ? (flowClockItem.offsetLeft - flowClockItem.ispeedX + 'px') : (flowClockItem.offsetLeft + flowClockItem.ispeedX + 'px')
                flowClockItem.style.top = flowClockItem.offsetTop - flowClockItem.ispeedY + 'px'
                flowClockItem.distanceX = flowClockItem.distanceX - flowClockItem.ispeedX
                flowClockItem.distanceY = flowClockItem.distanceY - flowClockItem.ispeedY
                return false
            }
        } else if (flowClockItem.direction === 'left') {
            if (flowClockItem.distanceX <= 0 && flowClockItem.distanceY <= 0) {
                return true
            } else {
                flowClockItem.style.left = flowClockItem.offsetLeft + flowClockItem.ispeedX + 'px'
                flowClockItem.style.top = flowClockItem.centerCoordinatesY > this.circlePoint.y ? (flowClockItem.offsetTop - flowClockItem.ispeedY + 'px') : (flowClockItem.offsetTop + flowClockItem.ispeedY + 'px')
                // 有可能中心点在圆心上面或者下面
                flowClockItem.distanceX = flowClockItem.distanceX - flowClockItem.ispeedX
                flowClockItem.distanceY = flowClockItem.distanceY - flowClockItem.ispeedY
                return false
            }
        } else {
            if (flowClockItem.distanceX <= 0 && flowClockItem.distanceY <= 0) {
                return true
            } else {
                flowClockItem.style.left = flowClockItem.offsetLeft - flowClockItem.ispeedX + 'px'
                flowClockItem.style.top = flowClockItem.centerCoordinatesY > this.circlePoint.y ? (flowClockItem.offsetTop - flowClockItem.ispeedY + 'px') : (flowClockItem.offsetTop + flowClockItem.ispeedY + 'px')
                flowClockItem.distanceX = flowClockItem.distanceX - flowClockItem.ispeedX
                flowClockItem.distanceY = flowClockItem.distanceY - flowClockItem.ispeedY
                return false
            }
        }
    }
    TextFlow.DEFAULTS = {
        wrap: 'text-clock-container',
        flowClock: 'text-clock',
        scale: 1,
        iTimer: 1500,
        finishTime: '4-8', // 4 - 8, 4,8 4 8
        direction: ['top', 'bottom', 'left', 'right'],
        isPause: true,
        isRandomBackgroundColor: false,
        isRandomColor: false
    }

    function textFlow (option) {
        var options = Object.assign({}, TextFlow.DEFAULTS, typeof option && option)
        new TextFlow(options)
    }
	_global = (function(){ return this || (0, eval)('this')}())
    if (typeof module !== "undefined" && module.exports) {
        module.exports = textFlow
    } else if (typeof define === "function" && define.amd) {
        define(function(){return textFlow})
    } else {
        !('textFlow' in _global) && (_global.textFlow = textFlow)
    }
}())