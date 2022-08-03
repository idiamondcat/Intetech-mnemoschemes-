class Template {

	static _templates = {};

	static getTemplate(name) {
		if(!(name in Template._templates))
			Template._templates[name] = new Template(name);
		return Template._templates[name];
	}

	static removeTemplate(name) {
		delete Template._templates[name];
	}

	_name = null;
	_templateElement = null;

	get name() {
		return this._name;
	}

	get templateElement() {
		return this._templateElement;
	}

	constructor(name)
	{
		this._name = name;
	}

	_init(simpleElement) {
		if(this._templateElement)
			return;

		this._templateElement = document.createElement('template');
		//this._templateElement.setAttribute('name', this.name);

		this._initStyle(this._templateElement, simpleElement, simpleElement.constructor.style);
		this._initMarkup(this._templateElement, simpleElement, simpleElement.constructor.markup);

		const container = document.getElementById('container_of_templates');
		container.append(this._templateElement);
	}

	_initStyle(templateElement, simpleElement, style) {
		if(!style) return;

		let styleElement = document.createElement("style");
		styleElement.innerHTML = "\n" + style + "\n";
		//styleElement.setAttribute("name", name);

		// let regex = /\S(.|[\n\r])*?{(.|[\n\r])*?}/igm;
		// let match;
		//
		// let _css = css;
		// //name = "#" + name + " ";
		// name = "." + name + " ";
		// let l = name.length;
		// let n = 0;
		//
		// while ((match = regex.exec(css)) !== null) {
		// 	if (match.index === regex.lastIndex) {
		// 		regex.lastIndex++;
		// 	}
		// 	n++;
		// }

		templateElement.content.append(styleElement);
		// console.log('style appended', style)
	}

	_initMarkup(templateElement, simpleElement, markup) {
		if(!markup) return;

		templateElement.innerHTML = templateElement.innerHTML + "\n" + markup + "\n";
	}

	connection(simpleElement)
	{
		this._init(simpleElement);
	}
}


class SimpleElement extends HTMLElement {

	get staticParameters() {
		let temp = this;
		let arr = Object.keys(temp).filter((elem)=>{return temp[elem] instanceof Parameter});
		return arr;
	};

	_isInit = false;
	_template = null;

	get template() {/* массив имён атрибутов для отслеживания их изменений */
		return this._template;
	}

	constructor() {
		super();
		this._template = Template.getTemplate(this.tagName.toLowerCase());
	}

	get name() {
		return this.template.name;
	}

	onConnected() { }

	connectedCallback() {
		if (this.rendered)
			return;

		this.template.connection(this);
		this._attach();

		this.onConnected();
	}

	onDisconnected() {}

	disconnectedCallback() {
		this.onDisconnected();
		// браузер вызывает этот метод при удалении элемента из документа
		// (может вызываться много раз, если элемент многократно добавляется/удаляется)
	}

	static get observedAttributes() {/* массив имён атрибутов для отслеживания их изменений */
		return [];
	}

	static get markup() {/* массив имён атрибутов для отслеживания их изменений */
		return null;
	}

	static get style() {/* массив имён атрибутов для отслеживания их изменений */
		return null;
	}


	onAttributeChanged(name, oldValue, newValue) {
		if (this[name]){
			this[name].value = newValue;
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (this.rendered){
			this.onAttributeChanged(name, oldValue, newValue);
			this.UpdateStatic();// ?
			this.UpdateDynamic();// ?
			// вызывается при изменении одного из перечисленных выше атрибутов
		}
	}

	// adoptedCallback() {
	// 	// вызывается, когда элемент перемещается в новый документ
	// 	// (происходит в document.adoptNode, используется очень редко)
	// }

	_attach() {
		this._render();
		// console.log('rendering ' + this.name);
		this.rendered = true;
		// this.markup = undefined;
		// this.constructor.style = undefined;
		this._updateParameters(this.staticParameters);
		// this._setChildParameters();
		setTimeout(() => {
			this.UpdateStatic();
			this.UpdateDynamic();
			if (this.hasOwnProperty('Init'))
				this._fireInit();
		}, 1000);
	}

	_generateId(elem, num) {
		return elem.id + '_' + num;
	}

	_render() {
		const shadow = this.attachShadow({mode: 'open'});
		shadow.append(this.template.templateElement.content.cloneNode(true));

		// console.log(this.name);
		this.classList.add('simple_element');
		this.classList.add(this.name);

		// this._setIDtoChildren();
	}

	_goDeep(elem) {
		let elements = elem.children;
		for (let i = 0; i < elements.length; i++) {
			if (!customElements.get(elements[i].tagName.toLowerCase())) {this._goDeep(elements[i]); continue}
			elements[i].id = this._generateId(this, i);
			elements[i]._setIDtoChildren();
		}
	}

	_setIDtoChildren() {
		let shadow = this.shadowRoot;
		this._goDeep(shadow);
	}

	_setChildParameters(){
		let attributes = this.getAttribute('childparameters');
		if (attributes !== null){
			attributes = JSON.parse(attributes);
			for (let id in attributes){
				let shadow = this.shadowRoot;
				let elem = this.shadowRoot.getElementById(id);
				if (elem===null) continue;
				let parameters = attributes[id];
				for (let param in parameters) {
					if (elem[param]!==undefined && elem[param].value!==undefined)
						elem[param].value = parameters[param];
				}
				elem.onUpdateStatic();
				elem.onUpdateDynamic();
			}
		}
	}

	_updateParameters(parameters) {
		for (const parameter of parameters) {
			let value = this.getAttribute(parameter);
			this[parameter].value = value;
		}
		let attributes = [...this.attributes].filter((elem)=>{return elem.localName.startsWith('0')});
		let elemsToUpdate = [];
		for (let attribute of attributes){
			let split = attribute.localName.split('.');
			let id = split[0];
			let param = split[1];
			if (id.includes(separatorOfId)){
				let tempIdArr = id.split(separatorOfId);
				let obj = this;
				let i = 0;
				while(i<(tempIdArr.length-1)){
					let tempId = tempIdArr[++i];
					obj = obj.shadowRoot.getElementById(tempId);
					if (!obj) break;
				}
				if (obj!== null){
					if (obj.staticParameters.includes(param)){
						obj[param].value = attribute.value;
						elemsToUpdate.push(obj);
						// console.log(id,param,attribute.value)
					}
				}
			}
			else{
				if (parameters.includes(param)){
					this[param].value = attribute.value;
					// console.log(id,param,attribute.value)
				}
			}
		}
		for (const elem of elemsToUpdate) {
			elem.onUpdateStatic();
			elem.onUpdateDynamic();
		}
	}

	//legacy
	UpdateStatic() {
		this.onUpdateStatic();
	};

	UpdateDynamic() {
		this.onUpdateDynamic();
	};

	onUpdateStatic() {

	}

	onUpdateDynamic() {

	}

	getActiveColor(color){
		let activePartColor;
		const colors = ['gas', 'methanol', 'glycol', 'heat-carrier', 'drainage', 'antifreeze', 'water'];
		if (colors.includes(color)){
			activePartColor = GetCurrentThemeStyle(`--underlayer-${color}-color`);
		}
		else {
			activePartColor = GetCurrentThemeStyle("--underlayer-default-color")
		}
		return activePartColor;
	}
	static _isShowedTooltip = false;
	listeners = {};//name:{listener:function, options:{}}
	AddTooltip = function (element, data) {
		var _timer;
		var _isShowed;
		this.listeners.onMouseEnter = {
			listener: function(e){
				clearTimeout(_timer);
				_timer = setTimeout(function () {
					showTooltip(e);
				}, 500);
			},
			options: {}
		}
		this.listeners.onMouseLeave = {
			listener:function(e) {
				clearTimeout(_timer);
				if (_isShowed)
					_this._DispatchEvent("closeTooltip");
				_isShowed = false;
				SimpleElement._isShowedTooltip = false;
			},
			options:{}
		}

		this.listeners.onMouseMove = {
			listener: function(e) {
				clearTimeout(_timer);
				_timer = setTimeout(function () {
					showTooltip(e);
				}, 500);
			},
			options:{}
		}

		let _this = this;

		element.addEventListener('mouseenter', this.listeners.onMouseEnter.listener, this.listeners.onMouseEnter.option);

		element.addEventListener('mouseleave', this.listeners.onMouseLeave.listener, this.listeners.onMouseLeave.option);

		element.addEventListener('mousemove', this.listeners.onMouseMove.listener, this.listeners.onMouseMove.option);

		function showTooltip(e) {
			if (SimpleElement._isShowedTooltip) return;
			_isShowed = true;
			SimpleElement._isShowedTooltip = true;
			_this._DispatchEvent("showTooltip", data, e);
		}

	}

	getFullElemId(element) {
		let elem = element;
		let id = elem.id;
		while (this.isInternal(elem)){
			let parent = elem.parentElement;
			elem = elem.getRootNode().host;
			id = elem.id + separatorOfId + id;
		}
		return id;
	}

	isInternal(t){
		let parent = t.parentElement;
		return !(parent.id !== null && (parent.id === 'container_of_elements' || parent.id === 'test_container'));
	}

	_DispatchEvent(type, data, e) {

		var pointer;

		if (e instanceof MouseEvent) {
			pointer = {
				clientX: e.clientX,
				clientY: e.clientY,
				screenX: e.screenX,
				screenY: e.screenY
			};
		}

		// if (isInternal(this)) return;
		let id = 'pipes';
		try {
			if (this.getAttribute('id') && this instanceof SimpleElement)
				id = this.getFullElemId(this);
			else{
				return
			}
		}
		catch (e) {
			id = 'pipes';
		}
		var event =
			{
				target: id,
				event: type,
				data: data,
				pointer: pointer
			}

		MV_OnDispatchEvent(event);
	}

	_onUpdateTransform = function () {
	};

	UpdateTransform = function () {
	};
	OnModified = function () {
	};
	OnThemeChanged = function () {
	};
	OnMainContainerTransformed = function () {
	};

	_fireInit(){
		if (this._isInit++)
			return;

		this.Init();
	};
}

//customElements.define("simple-elem", simpleElement, {extends: 'div'});