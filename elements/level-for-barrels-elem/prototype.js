register("level-for-barrels-elem", class extends SimpleElement {
		_sadditionallines = new Parameter(Type.Numeric, "Количество промежуточных делений");
		// _sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
		_sorient = new Parameter(Type.Numeric, "Ориентация уровня (цифры справа/цифры слева)");
		_scolor = new Parameter(Type.Color, "Цвет");

		_dlowestval = new Parameter(Type.Numeric, "Нижнее аварийное значение");
		_dhighestval = new Parameter(Type.Numeric, "Верхнее аварийное значение");
		_dlowcrit = new Parameter(Type.Numeric, "Нижняя критическая граница");
		_dhighcrit = new Parameter(Type.Numeric, "Верхняя критическая граница");
		_dmin = new Parameter(Type.Numeric, "Минимум");
		_dmax = new Parameter(Type.Numeric, "Максимум");
		_dcurrentval = new Parameter(Type.Numeric, "Текущее значение");


		static get markup() {
			return `
			<div class="level-for-barrels-elem">
			<div class="elem-container">
				<div class="nums-container"></div>
				<div class="slider-container">
					<div class="filling-area"></div>
					<div class="marklines-bg-container">
						<div class="markline"></div>
					</div>
				</div>
			</div>
			<div class="alarm-container">
				<div class="fade-block"></div>
			</div>
		</div>
			`;
		}
	
		static get style() {
			return `
			.level-for-barrels-elem {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				width: 100%;
				box-sizing: border-box;
				overflow: hidden;
			}
			.level-for-barrels-elem .elem-container {
				display: block;
				position: relative;
				box-sizing: border-box;
				width: calc(100% - 15px);
				height: calc(100% - 13px);
			}
			.level-for-barrels-elem .elem-container .nums-container {
				display: inline-block;
				position: absolute;
				right: 0;
				box-sizing: border-box;
				width: 64%;
				height: 16px;
				font-family: 'Ubuntu Condensed', sans-serif;
				font-size: 12px;
				line-height: 16px;
				font-weight: 400;
				text-align: center;
				background-color: rgba(255, 255, 255, 1);
				color: rgba(87, 90, 99, 1);
				border-radius: 3px;
				z-index: 999;
				overflow: hidden;
			}
			.level-for-barrels-elem .elem-container .nums-container.unknown {
				display: none;
			}
			.level-for-barrels-elem .elem-container .slider-container {
				display: block;
				position: absolute;
				box-sizing: border-box;
				height: 100%;
				width: 15px;
				background-color: var(--level-for-barrels-color);
				z-index: 1;
			}
			.level-for-barrels-elem .elem-container .slider-container .filling-area {
				display: block;
				position: absolute;
				bottom: 0;
				width: 100%;
				background-color: var(--level-for-barrels-color);
				z-index: 999;
			}
			.level-for-barrels-elem .elem-container .slider-container .marklines-bg-container {
				display: flex;
				position: absolute;
				bottom: 0;
				width: 18px;
				height: 100%;
				flex-direction: column;
				justify-content: space-between;
			}
			.level-for-barrels-elem .elem-container .slider-container .marklines-bg-container .markline {
				display: block;
				width: 100%;
				height: 3px;
			}
			.level-for-barrels-elem.left-bar-placed .elem-container .nums-container {
				right: 0;
			}
			.level-for-barrels-elem.left-bar-placed .elem-container .slider-container,
			.level-for-barrels-elem.left-bar-placed .elem-container .slider-container .filling-area {
				left: 0;
			}
			.level-for-barrels-elem.right-bar-placed .elem-container .nums-container {
				left: 0;
			}
			.level-for-barrels-elem.right-bar-placed .elem-container .slider-container,
			.level-for-barrels-elem.right-bar-placed .elem-container .slider-container .filling-area {
				right: 0;
			}
			.level-for-barrels-elem .alarm-container {
				display: block;
				position: absolute;
				box-sizing: border-box;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				border: 2.5px solid transparent;
				border-radius: 8px;
				overflow: hidden;
			}
			.level-for-barrels-elem .alarm-container .fade-block {
				display: block;
				position: absolute;
				box-sizing: border-box;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
			}
			.level-for-barrels-elem.ok .alarm-container {
				border-color: transparent;
			}
			.level-for-barrels-elem.bad .alarm-container {
				border-color: var(--level-for-barrels-contur-fill-bad);
			}
			.level-for-barrels-elem.awful .alarm-container {
				border-color: var(--level-for-barrels-contur-fill-awful);
			}
			.level-for-barrels-elem .alarm-container .fade-block.visible {
				background-color: var(--sys-unavailable-color);
			}
			.level-for-barrels-elem .alarm-container .fade-block.invisible {
				background-color: none;
			}
			`;
		}
	
		onConnected() {
		}
	
		onDisconnected() {
		}
	
		static get observedAttributes() {
			return ['_sadditionallines', '_sorient', '_dlowestval', '_dhighestval', '_dlowcrit', '_dhighcrit', '_dmin', '_dmax', '_dcurrentval', '_scolor'];
	
		}
	
		onAttributeChanged(name, oldValue, newValue) {
			if (name.includes('_s'))
				this[name].value = newValue;
			this.UpdateStatic();
		}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.level-for-barrels-elem');
		let parentElem = theElemCont.querySelector('.slider-container .marklines-bg-container');
		let marklines = theElemCont.querySelectorAll('.slider-container .marklines-bg-container .markline');
		let numsContainer = theElemCont.querySelector('.nums-container');
		let fillElem = theElemCont.querySelector('.slider-container .filling-area');

		if ((this._sorient.value == undefined) || (this._sorient.value == 'undefined') || (this._sorient.value <= 0)) {
			theElemCont.classList.add('right-bar-placed');
			parentElem.style.right = 0;
			parentElem.style.left = null;
			theElemCont.classList.remove('left-bar-placed');
		} else {
			theElemCont.classList.add('left-bar-placed');
			parentElem.style.left = 0;
			parentElem.style.right = null;
			theElemCont.classList.remove('right-bar-placed');
		}

		resetAllMarklines();
		if ((this._sadditionallines.value == undefined) || (this._sadditionallines.value == 'undefined') || (this._sadditionallines.value <= 0)) {
			setAllMarklines(2, 0);
		} else {
			this._sadditionallines.value = parseInt(this._sadditionallines.value);
			setAllMarklines((2 + parseInt(this._sadditionallines.value)), this._sadditionallines.value);
		}
		this.UpdateDynamic();

		function resetAllMarklines() {
			let childElems = parentElem.children;
			if (childElems.length !== 0) {
				while (parentElem.lastChild)
					parentElem.removeChild(parentElem.lastChild);
			}
		}

		function setAllMarklines(count, adLines) {
			for (let i = 0; i < count; i++) {
				let newMarkline = marklines[0].cloneNode(true);
				parentElem.appendChild(newMarkline);
			}

		}
		this.OnThemeChanged();
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.level-for-barrels-elem');
		let fillElem = theElemCont.querySelector('.slider-container .filling-area');
		let parentElem = theElemCont.querySelector('.slider-container .marklines-bg-container');
		let marklines = theElemCont.querySelectorAll('.slider-container .marklines-bg-container .markline');
		let numsContainer = theElemCont.querySelector('.nums-container');
		let fadeBlock = theElemCont.querySelector('.alarm-container .fade-block');
		let dLowV = parseValue(this._dlowestval.value);
		let dHighV = parseValue(this._dhighestval.value);
		let dLowC = parseValue(this._dlowcrit.value);
		let dHighC = parseValue(this._dhighcrit.value);
		let dCurV = parseValue(this._dcurrentval.value);
		let dMin = parseValue(this._dmin);
		let dMax = parseValue(this._dmax);

		if (isNaN(dLowV))
			dLowV = 800;

		if (isNaN(dCurV)) {
			numsContainer.classList.add('unknown');
			numsContainer.innerHTML = '';
		} else {
			numsContainer.innerHTML = '' + dCurV + '';
			numsContainer.classList.remove('unknown');
		}

			if (!isBad(dLowV)) {
				if (!isBad(dHighV)) {
					if (!isBad(dLowC) && !isBad(dHighC)) {
						if (  (dCurV >= dHighV)||(dCurV <= dLowV)) {
							this.setElement('good', 'awful');
							this.setCurrentVal(dMax, dMin, dCurV);
						} else if (  (dCurV >= dHighC)||(dCurV <= dLowC)) {
							this.setElement('good', 'bad');
							this.setCurrentVal(dMax, dMin, dCurV);
						} else {
							this.setElement('good', 'ok');
							this.setCurrentVal(dMax, dMin, dCurV);
						}
					}
					else {
						if ( (dCurV >= dHighV)||(dCurV <= dLowV) ) {
							this.setElement('good', 'awful');
							this.setCurrentVal(dMax, dMin, dCurV);
						} else {
							this.setElement('good', 'ok');
							this.setCurrentVal(dMax, dMin, dCurV);
						}
					}
				} else {
				this.setElement('unknown', 'ok');
				}
			} else {
				this.setElement('unknown', 'ok');
			}

		function isBad(smth) {
			if ((smth === undefined) || (smth === "undefined") || (isNaN(smth)) || (smth == null))
				return true;
			else
				return false;
		}

		function parseValue(a) {
			let result;

			if ((a === undefined) || (a === '') || (a === 'undefined')) {
				result = NaN;
			} else {
				result = '' + a;
				result = result.replace(/\s/g,'');
				result = result.replace(',', '.');
				result = parseFloat(result);
			}

			return result;
		}
		this.UpdateMarklines();
	}

	howColor = function() {
		let theElemCont = this.shadowRoot.querySelector('.level-for-barrels-elem');

			if (theElemCont.classList.contains('bad')) {
				return GetCurrentThemeStyle('--level-for-barrels-contur-fill-bad');
			} else if (theElemCont.classList.contains('awful')) {
				return GetCurrentThemeStyle('--level-for-barrels-contur-fill-awful');
			} else if (theElemCont.classList.contains('ok')) {
				return this.getActiveColor(this._scolor.value);
			}
	}

	setElement = function(status, cl) {
		let theElemCont = this.shadowRoot.querySelector('.level-for-barrels-elem');
		let fadeBlock = theElemCont.querySelector('.alarm-container .fade-block');
		
		if (status === 'unknown') {
			fadeBlock.classList.add('visible');
			fadeBlock.classList.remove('invisible');
		} else if (status === 'good') {
			fadeBlock.classList.add('invisible');
			fadeBlock.classList.remove('visible');
		}
		if (cl === 'ok') {
			theElemCont.classList.add('ok');
			theElemCont.classList.remove('bad');
			theElemCont.classList.remove('awful');
		} else if (cl === 'bad') {
			theElemCont.classList.add('bad');
			theElemCont.classList.remove('ok');
			theElemCont.classList.remove('awful');
		} else if (cl === 'awful') {
			theElemCont.classList.add('awful');
			theElemCont.classList.remove('ok');
			theElemCont.classList.remove('bad');
		}
	}

	setCurrentVal = function(max, min, cval) {
		let theElemCont = this.shadowRoot.querySelector('.level-for-barrels-elem');
		let fillElem = theElemCont.querySelector('.slider-container .filling-area');
		let numsContainer = theElemCont.querySelector('.nums-container');
		let totalHeight, filledHeight, visualFilledPercentH;

		if ((cval == undefined) || (cval == 'undefined') || (cval <= min)) {
			fillElem.style.height = 0 + '%';
			numsContainer.style.bottom = 0;
			numsContainer.style.top = null;
		} else if (cval >= max) {
			fillElem.style.height = 100 + '%';
			numsContainer.style.top = 0;
			numsContainer.style.bottom = null;
		} else {
			totalHeight = max - min;
			filledHeight = cval - min;
			visualFilledPercentH = parseFloat(((filledHeight / totalHeight) * 100).toFixed(1));
			fillElem.style.height = visualFilledPercentH + '%';
			console.log('Level for barrels, id:' + this.getRootNode().host.id + '(' + this.id + '), Max: ' + max + ', Min: ' + min + ', CurrentVal: ' + cval + ', Min-Max(full height): ' + totalHeight + ', Estimated filled height: ' + filledHeight + ', Filled percent: ' + visualFilledPercentH);
			numsContainer.style.top = null;
			numsContainer.style.bottom = 'calc(' + (parseFloat(((filledHeight / totalHeight) * 100).toFixed(1))) + '% - 6px)';
		}
	}

	UpdateMarklines = function() {
		let theElemCont = this.shadowRoot.querySelector('.level-for-barrels-elem');
		let fillElem = theElemCont.querySelector('.slider-container .filling-area');
		let marklines = theElemCont.querySelectorAll('.slider-container .marklines-bg-container .markline');

		marklines.forEach(e => {
			let marklineBotY = Math.round(e.getBoundingClientRect().y) + 3;
			let fillElemY = Math.round(fillElem.getBoundingClientRect().y);
			if (Math.round(fillElem.getBoundingClientRect().height) !== 0 && marklineBotY >= fillElemY) {
				if ((marklineBotY-fillElemY) >= 3) {
					e.style.backgroundColor = this.howColor();
				} else {
					let colorPercent = Math.round((marklineBotY-fillElemY)/Math.round(e.getBoundingClientRect().height) * 100);
					let noColorPart = 100-colorPercent;
					e.style.backgroundColor = 'linear-gradient(to bottom, ' + GetCurrentThemeStyle('--level-for-barrels-color') + ' ' 
					+ noColorPart + '%, ' + this.howColor() + ' ' + colorPercent + '%)';
				}
			} else {
				e.style.backgroundColor = GetCurrentThemeStyle('--level-for-barrels-color');
			}
		})
	}

	OnThemeChanged = function() {
		let theElemCont = this.shadowRoot.querySelector('.level-for-barrels-elem');
		let fillElem = theElemCont.querySelector('.slider-container .filling-area');

		fillElem.style.backgroundColor = this.howColor();
	}

	OnModified = function() {
		this.UpdateStatic();
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.level-for-barrels-elem');

		this.AddTooltip(theElemCont, {});
	}
})
