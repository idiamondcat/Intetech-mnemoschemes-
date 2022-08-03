register("gas-wells-params-elem", class extends SimpleElement {
	_skgscolor = new Parameter(Type.String, "Цвет индикатора");
	_surl = new Parameter(Type.String, "Адрес перехода");
	_smnemo = new Parameter(Type.Mnemo, "Переход на мнемосхему");

	static get markup() {
		return `
		<div class="gas-wells-params-elem">
			<div class="params-indicator"></div>
			<div class="params">
				<multi-tit-elem class="params-multi-tit" _stitcount="3" id="0"></multi-tit-elem>
				<div class="params-btn">
						<svg class="params-btn-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.92 14.7" preserveAspectRatio="xMidYMid meet">
							<polyline points="0.39 14.35 7.22 7.33 0.36 0.35"/>
						</svg>
				</div>
			</div>
		</div>
		`;
	}
	
	static get style() {
		return `
		.gas-wells-params-elem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.gas-wells-params-elem .params-indicator {
			height: 100%;
			width: 7px;
			margin-right: 2%;
			background-color: rgba(117, 116, 116, 1);
		}
		.gas-wells-params-elem .params {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100%;
			width: 100%;
			padding-top: 2.5%;
			border-top: 2px solid rgba(170, 170, 170,1);
			box-sizing: border-box;
			overflow: hidden;
		}
		.gas-wells-params-elem .params .params-multi-tit {
			height: 100%;
			width: 75%;
		}
		.gas-wells-params-elem .params .params-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 20.5%;
			background-color: #ffffff;
			border: 1px solid rgba(108, 110, 122, 1);
			border-radius: 8px;
			box-sizing: border-box;
		}
		.gas-wells-params-elem .params .params-btn.active {
			cursor: pointer;
		}
		.gas-wells-params-elem .params .params-btn.unactive {
			cursor: default;
		}
		.gas-wells-params-elem .params .params-btn .params-btn-arrow {
			max-width: 18.3%;
			max-height: 15%;
			fill: none;
			stroke-width: 1;
			stroke-miterlimit: 10;
		}
		.gas-wells-params-elem .params .params-btn.unactive .params-btn-arrow {
			stroke: var(--underlayer-default-color);
		}
		.gas-wells-params-elem .params .params-btn.active .params-btn-arrow {
			stroke: #f3c811;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_surl', '_smnemo', '_skgscolor'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.gas-wells-params-elem');
		let indicator = theElemCont.querySelector('.params-indicator');
		let link = theElemCont.querySelector('.params .params-btn');

		link.classList.add('unactive');
		link.classList.remove('active');

		this.OnThemeChanged();
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.gas-wells-params-elem');
		let paramsMT = theElemCont.querySelector('.params .params-multi-tit');

		if (this.getAttribute('id') == null) {
			paramsMT.removeAttribute('id');
			paramsMT.UpdateDynamic();
		}
	}

	OnThemeChanged = function() {
		let theElemCont = this.shadowRoot.querySelector('.gas-wells-params-elem');
		let indicator = theElemCont.querySelector('.params-indicator');

		let activePartColor;
		let buttonType = this._skgscolor.value;

		switch(buttonType) {
			case 'kgs-01':
				activePartColor = GetCurrentThemeStyle("--kgs-color-01");
				break;
			case 'kgs-02':
				activePartColor = GetCurrentThemeStyle("--kgs-color-02");
				break;
			case 'kgs-03':
				activePartColor = GetCurrentThemeStyle("--kgs-color-03");
				break;
			case 'kgs-04':
				activePartColor = GetCurrentThemeStyle("--kgs-color-04");
				break;
			case 'kgs-05':
				activePartColor = GetCurrentThemeStyle("--kgs-color-05");
				break;
			case 'kgs-06':
				activePartColor = GetCurrentThemeStyle("--kgs-color-06");
				break;
			case 'kgs-07':
				activePartColor = GetCurrentThemeStyle("--kgs-color-07");
				break;
			case 'kgs-08':
				activePartColor = GetCurrentThemeStyle("--kgs-color-08");
				break;
			case 'kgs-09':
				activePartColor = GetCurrentThemeStyle("--kgs-color-09");
				break;
			case '10':
				activePartColor = GetCurrentThemeStyle("--kgs-color-10");
				break;
			case 'kgs-11':
				activePartColor = GetCurrentThemeStyle("--kgs-color-11");
				break;
			case 'kgs-12':
				activePartColor = GetCurrentThemeStyle("--kgs-color-12");
				break;
			default:
				activePartColor = GetCurrentThemeStyle('--kgs-color-12');
				break;
		}

		indicator.style.backgroundColor = activePartColor;
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.gas-wells-params-elem');
		let link = theElemCont.querySelector('.params .params-btn');
		let _this = this;

		this.AddTooltip(theElemCont, {});

		if ((this._smnemo.value == 'undefined') || (this._smnemo.value == '') || (this._smnemo.value == undefined)) {
			link.classList.add('unactive');
			link.classList.remove('active');
		} else {
			link.classList.add('active');
			link.classList.remove('unactive');

			link.addEventListener('click', function(e) {
				_this._DispatchEvent("openMnemo", _this._smnemo.value, e);
			});
			link.addEventListener('dblclick', function(e) {
				_this._DispatchEvent("dblclick", "asd", e);
			});
			link.addEventListener('contextmenu', function(e) {
				_this._DispatchEvent("rightclick", "xxxx", e);
			});
		}

		if ((this._surl.value !== 'undefined') || (this._surl.value !== '') || (this._surl.value !== undefined)) {

			link.addEventListener('click', function(e) {
				_this._DispatchEvent("openUrl", _this._surl.value, e);
			});
			link.addEventListener('dblclick', function(e) {
				_this._DispatchEvent("dblclick", "asd", e);
			});
			link.addEventListener('contextmenu', function(e) {
				_this._DispatchEvent("rightclick", "xxxx", e);
			});
		}
	}
})
