let separatorOfId = '+';

function register(name, prototype) {
	customElements.define(name, prototype);
}



function GetHtml()
{
	var dom = _parser.parseFromString(document.documentElement.innerHTML, "text/html");

	var container_of_elements = dom.getElementById("container_of_elements");
	container_of_elements.removeAttribute("style");

	var canvasContainer = dom.body.getElementsByClassName("canvas-container")[0];
	canvasContainer.parentNode.removeChild(canvasContainer);

	var editorCanvas = document.createElement("canvas");
	editorCanvas.id = "editor_canvas";
	dom.body.appendChild(editorCanvas);

	var matchQuad = dom.getElementById('match-quad');
	matchQuad.classList.remove('invisible', 'visible', 'untriggered', 'triggered');
	matchQuad.classList.add('invisible');
	matchQuad.style.top = '';
	matchQuad.style.left = '';
	matchQuad.style.width = '';
	matchQuad.style.height = '';

	return  "<!DOCTYPE html>\n" +
		"<html>\n" + dom.documentElement.innerHTML + "\n</html>";
}

function ChangeTheme(name)
{
	var styles = document.head.getElementsByTagName("link");
	var curLink;

	for(var i = 0; i < styles.length; i++)
	{
		var href = styles[i].getAttribute("href");
		if(href.indexOf("/styles/Themes/") !== -1 && href.indexOf("/Styles/Themes/old/") === -1 && href.indexOf("/styles/Themes/default.css") === -1)
		{
			curLink = styles[i];
			break;
		}
	}

	var link = document.createElement("link");
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.onload = OnThemeChanged;
	// link.href = "./Styles/Themes/" + name + ".css";
	let curLinkHref = curLink.getAttribute('href')
	//Temp themes for achim
	if (['white_theme','gazprom_theme'].includes(name)) name = 'achim_white_theme';
	else if (['abyss_theme','black_theme'].includes(name)) name = 'achim_theme';

	link.href = curLinkHref.substring(0,curLinkHref.lastIndexOf('/')+1)  + name + ".css";
	document.head.insertBefore(link, curLink);

	let oldThemes = ['white_theme','gazprom_theme','abyss_theme','black_theme'];
	if (!oldThemes.includes(name)) {
		document.head.removeChild(curLink);
	}
}

function OnThemeChanged()
{
	let elements = mv_getSimpleElements();
	for (let elem of elements){
		elem.elem.OnThemeChanged();
	}
	MV_OnThemeChanged();
}

function GetCurrentThemeStyle(name)
{
	if (!_rootThemeStyles) {_rootThemeStyles=getComputedStyle(document.body);}
	return _rootThemeStyles.getPropertyValue(name);
}

function EnableAnimation(enable)
{
	_containerOfElements.setAttribute("animation", enable);
}

function GetZoom()
{
	return _zoom;
}



function SetMinZoom(minZoom)
{
	_minZoom = Math.min(0.25, minZoom);
}


function SetZoom(zoom)
{
	var point = {
		x: document.documentElement.clientWidth / 2,
		y: document.documentElement.clientHeight / 2
	}

	SetZoomToPoint(point, zoom);
}


function SetZoomToPoint(point, zoom)
{
	_zoom = zoom;
	if (_zoom < _minZoom)
		_zoom = _minZoom;

	var maxZoom = _minZoom * 10;
	if (maxZoom < 5)
		maxZoom = 5;

	if (_zoom > maxZoom)
		_zoom = maxZoom;

	_canvas.zoomToPoint({x: point.x, y: point.y}, _zoom);
	_updateContainerOfElements();
}


function SetCanvasPosition(x, y)
{
	_canvas.viewportTransform[4] = - x * _zoom + document.documentElement.clientWidth / 2;
	_canvas.viewportTransform[5] = - y * _zoom + document.documentElement.clientHeight / 2;

	_updateContainerOfElements();
}

function CenterViewAtObject(target)
{
	if (target instanceof SimpleElement)
		target = target.markup;

	var bounding = target.getBoundingClientRect()

	var x = (bounding.left + bounding.right) / 2;
	var y = (bounding.top + bounding.bottom) / 2;

	var p2 = fabric.util.transformPoint({x:x, y:y}, fabric.util.invertTransform(_canvas.viewportTransform));

	SetCanvasPosition(p2.x, p2.y);
}

var styleSheets = {};

var elements = {};

var _rootThemeStyles;

var _containerOfElements;
var _canvasContainer;
var _canvas;

var _highlight;


var _isAutoZoom = false;
var _zoom = 1;
var _minZoom = 0.4;
var _parser = new DOMParser();

var _drag = false;
var _dragStart;
var _dragEnd;



function GetElement(id)
{
	return elements[id];
}

window.onload = function()
{

	_rootThemeStyles = getComputedStyle(document.body);

	_containerOfElements = document.getElementById("container_of_elements");

	var images = document.getElementsByTagName("img");
	for (var i = 0; i < images.length; i++)
	{
		var img = images[i];
		img.ondragstart = function() { return false; };
	}

	_editorInitialize();


	var children = [];
	for(var i = 0; i < _containerOfElements.childElementCount; i++)
		children.push(_containerOfElements.children[i]);

	for(var i = 0; i < children.length; i++)
		_loadElement(children[i]);

	EnableAnimation(false);

	//Highlight lines
	let lines = document.querySelectorAll(['line[class]', 'circle[class]', 'polyline[class]', 'path[class]'/*, 'g[class]'*/]) //TODO:рассмотреть вопрос селектора для линий в группе
	for (const line of lines) {
		let showTooltip = _.debounce(showLineTooltip,600);
		let closeTooltip = _.debounce(showLineTooltip,500);
		line.addEventListener('mouseenter',(e)=>{_.debounce(highlightLines,100)(line); showTooltip(e, line, 'showTooltip')});
		line.addEventListener('mousemove',(e)=>{_.debounce(highlightLines,100)(line); showTooltip(e, line, 'showTooltip')});
		line.addEventListener('mouseleave',(e)=>{_.debounce(unHighlightLines,100)(line); closeTooltip(e, line, 'closeTooltip')});
	}

	//TODO BEGIN
	//MV_OnLoad();
	DebugRefresh();
	//TODO END
};
// let pipesToTooltip = [{classes:['p2','p3','or'], text: 'Truba'}];

//Пример данных для отображения подсказки на трубах
// let pipesToTooltip = {
// 	'p1': 'Truba 1',
// 	'p2': 'KGSS 2 ТРУБА Длинна 12м Диаметр 50см',
// 	'p2 p3 or': 'Truba'
// }
function showLineTooltip(e,elem, state){
	if (typeof pipesToTooltip === 'undefined') return;
	function findId(classes) {
		// classes = classes.filter((e)=>{return e!=="highlight-line"})
		// for (let pipe of pipesToTooltip){
		// 	if (pipe.classes.filter((e)=>{return !classes.includes(e)}).length===0) return pipe;
		// }
		classes = classes.replace(' highlight-line','');
		if (pipesToTooltip.hasOwnProperty(classes)) return pipesToTooltip[classes];
		return false;
	}
	if (state!=='showTooltip'){SimpleElement.prototype._DispatchEvent('closeTooltip');}
	let pipe = findId(elem.classList.value);
	if (pipe){
		SimpleElement.prototype._DispatchEvent('showTooltip',{text: pipe}, e);
	}
	else{
		SimpleElement.prototype._DispatchEvent('closeTooltip');
	}
}

function highlightLines(elem) {
	function contains(where, what){
		for(let i=0; i<what.length; i++){
			if(where.indexOf(what[i]) == -1) return false;
		}
		return true;
	}
	let classes = [...elem.classList];
	let elemsToHighlight = new Set();
	for (const c of classes) {
		if (c in ['or', 'and']) continue;
		let elems = document.querySelectorAll(`.${c}`);
		elemsToHighlight = new Set([...elemsToHighlight].concat(...elems));
	}
	for (const element of elemsToHighlight) {
		if (contains([...element.classList], classes))
			element.classList.add('highlight-line')
	}
}
function unHighlightLines(elem) {
	function contains(where, what){
		for(let i=0; i<what.length; i++){
			if(where.indexOf(what[i]) == -1) return false;
		}
		return true;
	}
	let classes = elem.classList;
	let elemsToHighlight = new Set();
	for (const c of classes) {
		if (c in ['or', 'and']) continue;
		let elems = document.querySelectorAll(`.${c}`);
		elemsToHighlight =new Set([...elemsToHighlight].concat(...elems));
	}
	for (const element of elemsToHighlight) {
		if (contains([...element.classList], classes))
			element.classList.remove('highlight-line')
	}
}

function _loadElement(div) {
	div.style.visibility = "visible";
}


function _editorInitialize()
{
	_canvas = new fabric.Canvas('editor_canvas');

	_canvasContainer = document.getElementsByClassName("canvas-container")[0];

	_canvasContainer.style.display = 'none';
	_canvas.stopContextMenu = true;
	_canvas.notAllowedCursor = null;
	_canvas.uniScaleTransform = true;

	_canvas.selectionColor = GetCurrentThemeStyle('--editor-selectionColor');
	_canvas.selectionBorderColor = GetCurrentThemeStyle('--editor-selectionBorderColor');


	fabric.Object.prototype.cornerSize = 8;
	fabric.Object.prototype.borderOpacityWhenMoving = 0.6;
	fabric.Object.prototype.borderScaleFactor = 1.2;
	fabric.Object.prototype.minScaleLimit = 0.1;
	//fabric.Object.prototype.borderDashArray = [16, 25];
	//fabric.Object.prototype.cornerStrokeColor = GetCurrentThemeStyle('--editor-selectionColor');
	//fabric.Object.prototype.strokeLineCap= "square";

	//fabric.Object.prototype.stroke = GetCurrentThemeStyle('--editor-selectionColor');
	//fabric.Object.prototype.strokeLineJoin = "round";

	fabric.Object.prototype.strokeWidth = 1;
	fabric.Object.prototype.strokeDashArray = [10, 5];

	fabric.Object.prototype.borderColor = fabric.Object.prototype.cornerColor = GetCurrentThemeStyle('--editor-borderColor');
	fabric.Object.prototype.transparentCorners = false;

	var _selectionChangeTimeStamp;

	document.body.addEventListener('mouseup', _onMouseUp);
	document.body.addEventListener('mousedown', _onMouseDownEvent);
	document.body.addEventListener('mousemove', _onMouseMove);

	document.body.addEventListener('wheel', _onMouseWheel, {passive : false});

	window.addEventListener('resize', _resizeCanvas);
	_resizeCanvas();

	//var _sss=setTimeout(function() {_resizeCanvas();}, 500);

	function _resizeCanvas()
	{
		_canvas.setWidth(document.documentElement.clientWidth);
		_canvas.setHeight(document.documentElement.clientHeight);

		_autoZoom();
	}
}


function HighlightElements(on)
{
	if(_highlight == on)
		return;
	_highlight = on;

	_canvas.forEachObject(function(o) {
		o.set({stroke : (on ? GetCurrentThemeStyle('--editor-highlightColor') : null)});
	});
	_canvas.requestRenderAll();
}


var _onMouseWheel = function(event)
{
	if (!event.altKey)
		return;

	var point = {
		x: event.x,
		y: event.y
	};

	var precision = (event.shiftKey) ? 4 : 1;
	var zoom = _canvas.getZoom() * (1 - event.deltaY / (750 * precision));

	if (Math.abs(1 - zoom) < (0.1 / precision))
		zoom = 1;
	else if (Math.abs(0.5 - zoom) < (0.05 / precision))
		zoom = 0.5;
	else if (Math.abs(2 - zoom) < (0.2 / precision))
		zoom = 2;

	SetAutoZoom(false);

	SetZoomToPoint(point, zoom);
	event.preventDefault();
	event.stopPropagation();
};


var _onMouseDownEvent = function(event)
{
	if (event.which != 3)
		return;


	_dragStart = {
		x: event.x,
		y: event.y
	}
	_canvas.forEachObject(function(o) {
		o.selectable = false;
	});
	_dragStart = fabric.util.transformPoint(_dragStart, fabric.util.invertTransform(_canvas.viewportTransform));

	_canvas.selection = false;
	_canvas.requestRenderAll();
	_drag = true;
};


var _onMouseMove = function(event)
{
	if (_drag)
	{
		_dragEnd = {
			x: event.x,
			y: event.y
		};

		_dragStart = fabric.util.transformPoint(_dragStart, _canvas.viewportTransform);

		var dx = _dragEnd.x - _dragStart.x;
		var dy = _dragEnd.y - _dragStart.y;

		SetAutoZoom(false);

		_canvas.viewportTransform[4] += dx;
		_canvas.viewportTransform[5] += dy;

		_updateContainerOfElements();
		_dragStart = fabric.util.transformPoint(_dragEnd, fabric.util.invertTransform(_canvas.viewportTransform));

	}
};


var _onMouseUp = function(event)
{
	if (event.which != 3)
		return;


	_canvas.forEachObject(function(o) {
		o.selectable = true;
		o.setCoords();
	});
	_canvas.requestRenderAll();
	_canvas.selection = true;
	_drag = false;
};


function MV_SetViewportTransform(matrix)
{
	_canvas.viewportTransform = matrix;
	SetZoom(_canvas.viewportTransform[0]);
	_updateContainerOfElements();
}

function _updateContainerOfElements()
{
	_containerOfElements.style.transform = "matrix(" + _canvas.viewportTransform.toString() + ")";
	_canvas.requestRenderAll();

	_canvas.forEachObject(function(o) {
		o.setCoords();
	});

	var keys = Object.keys(elements);
	for(var i = 0; i < keys.length; i++)
	{
		var e = elements[keys[i]];
		e.OnMainContainerTransformed();
	}

	MV_OnViewportTransformUpdate(_canvas.viewportTransform);
}



var __shiftKeyDown;
Object.defineProperty(this, "_shiftKeyDown", {

	get: function() {
		return __shiftKeyDown;
	},
	set: function(value) {
		if(__shiftKeyDown == value || _canvas == undefined)
			return;

		__shiftKeyDown = value;
		_canvas.forEachObject(function(rect) {
			rect.snapAngle = __shiftKeyDown ? 15 : 0;
			rect.lockUniScaling = __shiftKeyDown;
		});
		var activeObj = _canvas.getActiveObject();
		if (activeObj && activeObj.type === "activeSelection")
		{
			activeObj.snapAngle = __shiftKeyDown ? 15 : 0;
			activeObj.lockUniScaling = __shiftKeyDown;

		}

		_canvas.requestRenderAll();
		//_canvas.uniScaleTransform = !__shiftKeyDown;
		//console.log(__shiftKeyDown);
	},
	configurable: false
});


//var _shiftKeyDown = false;
window.addEventListener('keydown', function(e)
{
	//console.log(e);
	_shiftKeyDown = e.shiftKey;

	if (e.key === 'A' && e.ctrlKey)
	{
		ResetZoom();
	}

});


window.onfocus  = function()
{
	_shiftKeyDown = false;
	MV_OnFocus();
	//console.log('On focus');
};

window.onblur  = function()
{
	_shiftKeyDown = false;
	MV_OnBlur();
	//console.log('Lost focus');
};

window.onclick  = function()
{
	MV_OnClick();
	//console.log("onclick");
};

window.addEventListener('keyup', function(e)
{
	_shiftKeyDown = e.shiftKey;

	if(e.code == "Space")
	{
		HighlightElements(false);
	}
});

var _autoZoomTimer;

function _autoZoom()
{
	if(_isAutoZoom == false)
		return;

	if(_autoZoomTimer) clearTimeout(_autoZoomTimer);

	_autoZoomTimer = setTimeout(function(e){
		if(!_isAutoZoom) return;
		_resetZoom();
	},50);

}


function ResetZoom()
{
	_lockSetAutoZoom = true;

	_resetZoom();

	_lockSetAutoZoom = false;

	SetAutoZoom(true);
}

var _lockSetAutoZoom;

var _autoZoomTimer2;

function SetAutoZoom(auto)
{
	if(_isAutoZoom == auto || _lockSetAutoZoom)
		return;

	_isAutoZoom = auto;
	if(!_isAutoZoom)
	{
		_containerOfElements.setAttribute("isAutoZoom", _isAutoZoom);
	}
	else
	{
		if(_autoZoomTimer2) clearTimeout(_autoZoomTimer2);
		_autoZoomTimer2 = setTimeout(function()
		{
			_containerOfElements.setAttribute("isAutoZoom", _isAutoZoom);
		},10);
	}

	MV_OnAutoZoomChanged(_isAutoZoom);
}



function _resetZoom()
{
	var currentScale = 1;
	var currentX = 0;
	var currentY = 0;

	if (_containerOfElements.style.transform !== '')
	{
		var t = _containerOfElements.style.transform.slice(7, -1).split(', ');
		currentScale = parseFloat(t[0]);
		currentX = parseFloat(t[4]);
		currentY = parseFloat(t[5]);
	}

	var rectsArray = Array.from(_containerOfElements.querySelectorAll('.simple_element'), function(v) {
		return v.getBoundingClientRect();
	});

	if(rectsArray.length == 0)
		return;

	var topMost = defineOffsetMost(rectsArray, 'top') ;
	var rightMost = defineOffsetMost(rectsArray, 'right');
	var botMost = defineOffsetMost(rectsArray, 'bottom');
	var leftMost = defineOffsetMost(rectsArray, 'left');

	var contOfElsRect = _containerOfElements.getBoundingClientRect();

	var _x = ((rightMost - leftMost) / 2 + leftMost - contOfElsRect.left) / currentScale;
	var _y = ((topMost - botMost) / 2 + botMost - contOfElsRect.top) / currentScale - 20;

	var cW = document.documentElement.clientWidth;
	var cH = document.documentElement.clientHeight;

	var newZoom =  Math.min( cW / ((rightMost - leftMost) / currentScale) , cH / (( botMost - topMost) / currentScale + 20));

	SetMinZoom(newZoom * 0.6)
	SetZoom(newZoom);
	SetCanvasPosition(_x, _y);
	/*
	//sss
	if (!isReqursive)
	{
		var _sss=setTimeout(function(e){_resetZoom(true);},1000);
	}*/


	function defineOffsetMost(a, mode)
	{
		switch (mode)
		{
			case 'top':
				var temp = a[0].top;
				a.forEach(function (x) {
					temp = Math.min(x.top, temp);
				});
				return temp;
			case 'left':
				var temp = a[0].left;
				a.forEach(function (x) {
					temp = Math.min(x.left , temp);
				});
				return temp;
			case 'right':
				var temp = a[0].right;
				a.forEach(function (x) {
					temp = Math.max(x.right, temp);
				});
				return temp;
			case 'bottom':
				var temp = a[0].bottom;
				a.forEach(function (x) {
					temp = Math.max(x.bottom, temp);
				});
				return temp;
		}
	}
}

var Type = Object.freeze({
	String: {name: "String", id: 0},
	Numeric: {name: "Numeric", id: 1},
	Array: {name: "Array", id: 2},
	Color: {name: "Color", id: 3},
	Mnemo: {name: "Mnemo", id: 4}
});


var Description = function(type, caption)
{
	this.type = type;
	this.caption = caption;
};

var Parameter = function(type, caption)
{
	this.description = Object.freeze(new Description(type, caption));
	this.value = undefined;
	/*
	TODO
		this.attributes = {
			toString : "asd",
			appearance : "0"
		}
	*/
	this.overrideToString = undefined;
	this.time = 0;
	this.state = 0;
	this.unit = undefined;
	this.isConnected = false;
	this.appearance = undefined;

	this.toString = function()
	{
		if (this.overrideToString == undefined)
			return this.value == undefined ? '' : this.value.toString();
		else
			return this.overrideToString.toString();
	}
};


var StaticParameter = function(type, caption)
{
	this.description = Object.freeze(new Description(type, caption));
	this.value = undefined;

	function toString()
	{
		return this.value.toString();
	}
};


let _lockSetData;

function LockSetData()
{
	_lockSetData = true;
}

function UnlockSetData()
{
	_lockSetData = false;
}

let _echo;

function Echo(id, parameter)
{
	if (id == undefined)
	{
		_echo = undefined;
		return;
	}

	_echo =
		{
			id : id,
			parameter : parameter
		}
}

_linesStates = {};
function _updateLines(id, value){
	const inclusivePick = (obj, ...keys) => Object.fromEntries(
		keys.map(key => [key, obj[key]])
	);
	const omit = (obj, ...keys) => Object.fromEntries(
		Object.entries(obj)
			.filter(([key]) => !keys.includes(key))
	);
	function getSimpleLines(id){
		let lines = document.getElementsByClassName(id);
		let simpleLines = [];
		if (id!=='hide'){
			for (let line of lines) {
				let classes = line.classList;
				if (!classes.contains('or') && !classes.contains('and')) {
					simpleLines.push(line)
				}
			}
		}
		return simpleLines;
	}
	function getComplexLines(id){
		let lines = document.getElementsByClassName(id);
		let complexLines = [];
		for (let line of lines) {
			let classes = line.classList;
			if (classes.contains('or') || classes.contains('and')) {
				complexLines.push(line)
			}
		}
		return complexLines;
	}
	let v = value;
	if (value === undefined) v = 1;
	_linesStates[id] = v;
	let excludeKeys = ['or','and','hide'];
	let complexLines = getComplexLines(id);
	let simpleLines = getSimpleLines(id);
	for (let line of simpleLines){
		let classes = line.classList;
		_linesStates[id] == 1 ? classes.remove('hide') : classes.add('hide');
	}
	for (let line of complexLines){
		let classes = line.classList;
		let states = []
		let classesFiltered = [...classes].filter((elem)=>{return !excludeKeys.includes(elem)});
		states = inclusivePick(_linesStates,...classesFiltered);
		states = Object.values(states).map((elem)=>{if (elem === undefined) return 1; else return elem});
		if (classes.contains('or')){
			states.some((elem)=>{return elem==1}) ? classes.remove('hide') : classes.add('hide');
		}
		else {
			states.every((elem)=>{return elem==1}) ? classes.remove('hide') : classes.add('hide');
		}
	}
}

function SetData(data)
{
	if (data.parameter != undefined && _echo != undefined && data.id == _echo.id && data.parameter == _echo.parameter)
		console.log(data);

	if (_lockSetData)
		return;


	if (data.simpleElementId !=undefined && data.simpleElementId!=="")
		// var obj = elements[data.simpleElementId];

		if (typeof data.simpleElementId === 'object'){
			var obj = undefined;
		}
		else{
			let re = new RegExp('^p[0-9]', 'i');
			if (re.test(data.simpleElementId)){
				_updateLines(data.simpleElementId, data.value)
				return 0;
			}
			else {
				let simpleElementId = data.simpleElementId.toString();
				if (simpleElementId.includes(separatorOfId)){
					let id = simpleElementId;
					let len = id.split(separatorOfId).length;
					var obj = document.getElementById(id.split(separatorOfId,1)[0]);
					if (obj !== null){
						let i = 0;
						let tempIdArr = id.split(separatorOfId);
						while(i<(len-1)){
							let tempId = tempIdArr[++i];
							obj = obj.shadowRoot.getElementById(tempId);
							if (!obj) return -1;
						}
					}
				}else
					var obj = document.getElementById(simpleElementId);
			}
		}
	else
	if (typeof MnemoObject !== 'undefined')
		var obj = MnemoObject;

	if (data.parameter == undefined || obj == undefined)
		return -1;

	var param = obj[data.parameter];

	if (param == undefined || !(param instanceof Parameter || param instanceof StaticParameter))
		return -2;

	if (data.value != undefined)
		param.value = data.value;

	if (data.overrideToString != undefined)
		param.overrideToString = data.overrideToString;

	if (data.time != undefined)
		param.time = data.time;

	if (data.state != undefined)
		param.state = data.state;

	if (data.unit != undefined)
		param.unit = data.unit;

	if (data.isConnected != undefined)
		param.isConnected = data.isConnected;

	if (data.appearance != undefined)
		param.appearance = data.appearance;



	if (param instanceof Parameter)
	{
		obj.UpdateStatic();
		obj.UpdateDynamic();
	}
	else if (param instanceof StaticParameter)
	{
		obj.UpdateStatic();
		var fields = Object.keys(obj);
		var parameters = {};
		for(var i = 0; i < fields.length; i++)
		{
			var f = obj[fields[i]];
			if(f instanceof StaticParameter)
			{
				parameters[fields[i]] = f.value;
			}
		}

		// obj.setAttribute("parameters", JSON.stringify(parameters));
		obj.setAttribute(data.parameter, data.value);
	}


	return 0;
}


function MultipleSetData(arr, param, val)
{
	var localIncrement;

	if (Array.isArray(val))
	{
		localIncrement = 0;

		for (var i = 0; i < arr.length; i++)
		{
			SetData({simpleElementId: arr[i], parameter: param, value: val[localIncrement]});
			localIncrement++;

			if (localIncrement >= val.length)
				localIncrement = 0;
		}
	}
	else
	{
		for (var i = 0; i < arr.length; i++)
			SetData({simpleElementId: arr[i], parameter: param, value: val});
	}
}

//Событие окончания загрузки страницы
function MV_OnLoad()
{
	if (window.frameElement === null)
		return;
	top.MV_OnLoad(window.frameElement.parentElement.id);
}

function MV_OnFocus()
{
	if (window.frameElement === null)
		return;
	top.MV_OnFocus(window.frameElement.parentElement.id);
}

function MV_OnBlur()
{
	if (window.frameElement === null)
		return;
	top.MV_OnBlur(window.frameElement.parentElement.id);
}

function MV_OnClick()
{
	if (window.frameElement === null)
		return;
	top.MV_OnClick(window.frameElement.parentElement.id);
}

var _updateKeys = function(e)
{
	if (window.frameElement === null)
		return;
	top.MV_OnUpdateKeys(e);
};

window.onkeydown = _updateKeys;
window.onkeyup = _updateKeys;

function mv_setAttributes(id, name, value) {
	let elem = document.getElementById(id);
	if(elem)
		elem.setAttribute(name, value);
}

function mv_getSimpleElements(){
	function goDeep(child, parentId){
		if (child.shadowRoot=== null) return [];
		let simpleElements = child.shadowRoot.querySelectorAll('.simple_element');
		let simpleElementsDeep = [];
		for(let elem of simpleElements){
			// if (elem.id==='') continue;
			let id = (elem.id==='' || parentId==='') ? '' : parentId + separatorOfId+ elem.id;
			simpleElementsDeep.push({id:id, type: elem.tagName.toLowerCase(), elem:elem})
			let children = goDeep(elem, id);
			simpleElementsDeep = simpleElementsDeep.concat(...children);
		}
		return simpleElementsDeep;
	}
	let simpleElements = document.getElementsByClassName('simple_element');
	let simpleElementsDeep = [];
	for(let elem of simpleElements){
		// if (elem.id==='') continue;
		if (elem.tagName.toLowerCase() === 'svg') {continue}
		simpleElementsDeep.push({id:elem.id==='' ? '' : elem.id, type: elem.tagName.toLowerCase(), elem: elem})
		let children = goDeep(elem, elem.id);
		simpleElementsDeep = simpleElementsDeep.concat(...children);
	}
	return simpleElementsDeep;
}

function mv_getSimpleElementsTable(){
	let simpleElementsDeep = mv_getSimpleElements();
	return simpleElementsDeep.map((element)=>{delete element.elem; return element}).filter((element)=>{return element.id!==''});
}

function MV_SetValues(values)
{
	/*
	На вход приходит массив кавычек (объектов), которые и так уже можно вызвать параметром для setData.
	Мы их никак не анализируем пока что, просто забрасываем сразу в реализацию setData для каждого объекта массива

	Ожидаем так:
	{parameter:[something], value: something, overrideToString: smth, time: smtm, state: somestate, isConnected: isCon}
	*/
	var errCode;
	var problemRecord = [];

	var numOfNeededFrame, nameOfNeededVar, neededValue;

	var arrayOfDynamicProps = values;//JSON.parse(values);
	var len = arrayOfDynamicProps.length;

	for (var i = 0; i < len; i++)
	{
		var genObj = arrayOfDynamicProps[i];

		if (Array.isArray(genObj))
		{
			numOfNeededFrame = parseInt(genObj[0][0]);
			nameOfNeededVar = genObj[0][1];
			neededValue = genObj[1];

			genObj = {
				parameter: [numOfNeededFrame, nameOfNeededVar],
				value: neededValue
			};
		}

		errCode = SetData(genObj);

		if (errCode !== 0)
		{
			console.error("SetData error: id = "+genObj.simpleElementId);
			console.error(genObj);
			// top.MV_Error(problemRecord);
			continue;
		}
	}
}


var _sendViewportTimeout;
function MV_OnViewportTransformUpdate(matrix)
{
	if (window.frameElement === null)
		return;

	if(_sendViewportTimeout) clearTimeout(_sendViewportTimeout);
	_sendViewportTimeout = setTimeout(function ()
	{
		top.MV_OnViewportTransformUpdate(window.frameElement.parentElement.id, matrix);
	},100);
}

function MV_OnDispatchEvent(e)
{
	console.log(e);

	if(top == window)
		return;
	/*
	var event =
	{
		target : "id2",
		event : "showtooltip",
		data : data,
		pointer: pointer
	}
	*/

	if (e.pointer!=undefined)
	{
		var pb=window.frameElement.parentElement.getBoundingClientRect();
		e.pointer.screenX=e.pointer.clientX+pb.x;
		e.pointer.screenY=e.pointer.clientY+pb.y;
	}
	top.MV_OnDispatchEvent(window.frameElement.parentElement.id, e);
}


//Темы
function MV_ChangeTheme(name)
{
	ChangeTheme(name);
}

function MV_OnThemeChanged()
{
	if (window.frameElement === null)
		return;

	top.MV_OnThemeChanged(window.frameElement.parentElement.id, name);
}



function MV_ResetZoom(/*TODO addTopSpacing*/)
{
	var addTopSpacing=false;
	ResetZoom();
}

function MV_OnAutoZoomChanged(auto)
{
	if (window.frameElement === null)
		return;

	top.MV_OnAutoZoomChanged(window.frameElement.parentElement.id, auto);
}


function DebugRefresh()
{

	setTimeout(function()
	{

		_delayedOnLoad();
	}, 1000);
	//sss EnableEditingMode();
}

function _delayedOnLoad()
{
	setTimeout(function()
	{
		MV_OnLoad();
	}, 1500);
}
