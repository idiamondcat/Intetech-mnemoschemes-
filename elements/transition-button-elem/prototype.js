register("transition-button-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");
	_sarrowdirection = new Parameter(Type.Numeric, "Ориентация стрелок");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_slineheight = new Parameter(Type.Numeric, "Межстрочный интервал")
	_scaption = new Parameter(Type.String, "Подпись");
	_surl = new Parameter(Type.String, "Адрес перехода");
	_smnemo = new Parameter(Type.Mnemo, "Переход на мнемосхему");

	static get markup() {
		return `
		<div class="transition-button-elem">
			<svg class="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 119 34" preserveAspectRatio="xMaxYmin meet">
				<g class="elem">
					<polygon points="107.8,33 1.8,33 11.8,17 1.8,1 107.8,1 117.8,17 "/>
				</g>
				<g class="placeholder">
					<rect x="0" y="0" fill="none" width="100%" height="100%"/>
				</g>
			</svg>
			<div class="main-container">
					<div class="naming">
				</div>
			</div>
		</div>
		`;
	}

	static get style() {
		return `
		.transition-button-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
			position: relative;
		}
		.transition-button-elem .svg-container {
			width: 100%;
			height: 100%;
		}
		.transition-button-elem .elem {
			fill: var(--tit-name-cont-bg-color);
			stroke: var(--underlayer-default-color);
			stroke-width: 2;
			stroke-miterlimit: 10;
		}
		
		.transition-button-elem .main-container {
			display: flex;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			justify-content: center;
			align-items: center;
			padding: 0.3em 1em;
			box-sizing: border-box;
			overflow: hidden;
		}
		.transition-button-elem .main-container.active {
			cursor: pointer;
		}
		.transition-button-elem .main-container.unactive {
			cursor: default;
		}
		.transition-button-elem .main-container .naming {
			display: inline-flex;
			width: 100%;
			height: 100%;
			align-items: center;
			justify-content: center;
			text-align: center;
			white-space: normal;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 17px;
			line-height: 21px;
			color: var(--transition-button-txt-color);
			box-sizing: border-box;
			overflow: hidden;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_sarrowdirection', '_scaption', '_scolor', '_sfontsize', '_surl', '_smnemo'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.transition-button-elem');
		let arrowCont = theElemCont.querySelector('.svg-container');
		let elem = arrowCont.querySelector('.elem');
		let mainContainer = theElemCont.querySelector('.main-container');
		let captionBlock = theElemCont.querySelector('.naming');
		let fs = this._sfontsize.value;

		theElemCont.classList.add('unactive');
		theElemCont.classList.remove('active');
		mainContainer.classList.add('unactive');
		mainContainer.classList.remove('active');

		if (this._sarrowdirection.value == 0 || this._sarrowdirection.value == undefined || this._sarrowdirection.value == 'undefined') {
			arrowCont.style.transform = 'rotate(0deg)';
		} else {
			arrowCont.style.transform = 'rotate(180deg)';
		}

		if ((fs !== undefined) && (fs !== '')) {
			captionBlock.style.fontSize = parseInt(fs) + 'px';
			captionBlock.style.lineHeight = (parseInt(fs) + 2) + 'px';
		} else {
			captionBlock.style.fontSize = '';
			captionBlock.style.lineHeight = '';
		}

		if ((this._slineheight.value !== undefined) || (this._slineheight.value !== '') && this._slineheight.value !== null) {
			captionBlock.style.lineHeight = parseInt(this._slineheight.value) + 'px';
		}

		if (this._scaption.value != undefined)
			captionBlock.innerHTML = "" + this._scaption.value + "";
		else
			captionBlock.innerHTML = "";
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.transition-button-elem');
		let mainContainer = theElemCont.querySelector('.main-container');
		let arrowCont = theElemCont.querySelector('.svg-container');
		let elem = arrowCont.querySelector('.elem');
		let _this = this;

		this.AddTooltip(theElemCont, "Кнопка id = " + this.id);

		if ((this._smnemo.value == 'undefined') || (this._smnemo.value == '') || (this._smnemo.value == undefined)) {
			theElemCont.classList.add('unactive');
			theElemCont.classList.remove('active');

			mainContainer.classList.add('unactive');
			mainContainer.classList.remove('active');

			elem.style.stroke = "var(--underlayer-default-color)";
		} else {
			theElemCont.classList.add('active');
			theElemCont.classList.remove('unactive');

			mainContainer.classList.add('active');
			mainContainer.classList.remove('unactive');

			theElemCont.addEventListener('click', function(e) {
				_this._DispatchEvent("openMnemo", _this._smnemo.value, e);
			});
			theElemCont.addEventListener('dblclick', function(e) {
				_this._DispatchEvent("dblclick", "asd", e);
			});
			theElemCont.addEventListener('contextmenu', function(e) {
				_this._DispatchEvent("rightclick", "xxxx", e);
			});

			elem.style.stroke = `var(--underlayer-${this._scolor.value ? this._scolor.value : 'default'}-color)`;
		}

		if ((this._surl.value == 'undefined') || (this._surl.value == '') || (this._surl.value == undefined)) {
			theElemCont.classList.add('unactive');
			theElemCont.classList.remove('active');
		} else {
			theElemCont.classList.add('active');
			theElemCont.classList.remove('unactive');

			theElemCont.addEventListener('click', function(e) {
				_this._DispatchEvent("openUrl", _this._surl.value, e);
			});
			theElemCont.addEventListener('dblclick', function(e) {
				_this._DispatchEvent("dblclick", "asd", e);
			});
			theElemCont.addEventListener('contextmenu', function(e) {
				_this._DispatchEvent("rightclick", "xxxx", e);
			});
		}
	}
})