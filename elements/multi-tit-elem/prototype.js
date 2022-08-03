register("multi-tit-elem", class extends SimpleElement {
	_stitcount = new Parameter(Type.Numeric, "Количество элементов tit");
	_scaptions = new Parameter(Type.String, "Массив подписей");
	_scaptionfontsizes = new Parameter(Type.String, "Массив размеров подписей");
	_svaluefontsizes = new Parameter(Type.String, "Массив размеров значений");
	_sdisplaystates = new Parameter(Type.Numeric, "Массив; показываются ли криты: не задано — показываются; задано (1) — не показываются");
	_sarroworient = new Parameter(Type.String, "Ориентация стрелки");
	_sarrowval = new Parameter(Type.Numeric, "Сдвиг стрелки");

	_douterstate = new Parameter(Type.Numeric, "Внешнее состояние");

	_initedRowsCount = 0;

	static get markup() {
		return `
		<div class="multi-tit-elem">
			<div class="inside-wrapper">
				<div class="arrow"></div>
				<div class="items-wrapper">
					<tit-elem></tit-elem>
				</div>
			</div>
		</div>
		`;
	}
	static get style() {
		return `
		.multi-tit-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
			padding: 2% 4.6%;
			background-color: var(--tit-name-cont-bg-color);
			border: 1px solid var(--main-object-fill-color);
			border-radius: 8px;
		}
		.multi-tit-elem.crit {
			border-color: var(--num-value-linecolor-bad);
		}
		.multi-tit-elem.danger {
			border-color: var(--num-value-linecolor-awful);
		}
		.multi-tit-elem .inside-wrapper {
			width: 100%;
			height: 100%;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
		}
		.multi-tit-elem .inside-wrapper .arrow {
			display: none;
			width: 10px;
			height: 10px;
			position: absolute;
			background-color: var(--tit-name-cont-bg-color);
			border-right: 1px solid var(--main-object-fill-color);
			border-bottom: 1px solid var(--main-object-fill-color);
			box-sizing: border-box;
		}
		.multi-tit-elem .inside-wrapper .arrow.top-arrow {
			display: block;
			bottom: auto;
			top: -9px;
			transform: rotate(-135deg);
			  -moz-transform:rotate(-135deg);
			  -webkit-transform:rotate(-135deg);
		}
		.multi-tit-elem .inside-wrapper .arrow.bot-arrow {
			display: block;
			top: auto;
			bottom: -9px;
			transform: rotate(45deg);
			  -moz-transform:rotate(45deg);
			  -webkit-transform:rotate(45deg);
		}
		.multi-tit-elem .inside-wrapper .arrow.left-arrow {
			display: block;
			right: auto;
			  left: -14px;
			transform: rotate(-225deg);
			  -moz-transform:rotate(-225deg);
			  -webkit-transform:rotate(-225deg);
		}
		.multi-tit-elem .inside-wrapper .arrow.right-arrow {
			display: block;
			left: auto;
			  right: -15px;
			transform: rotate(-45deg);
			  -moz-transform:rotate(-45deg);
			  -webkit-transform:rotate(-45deg);
		}
		.multi-tit-elem.crit .inside-wrapper .arrow {
			border-right-color: var(--num-value-linecolor-bad);
			border-bottom-color: var(--num-value-linecolor-bad);
		}
		.multi-tit-elem.danger .inside-wrapper .arrow {
			border-right-color: var(--num-value-linecolor-awful);
			border-bottom-color: var(--num-value-linecolor-awful);
		}
		.multi-tit-elem .items-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			overflow: hidden;
			box-sizing: border-box;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_stitcount', '_sarroworient', '_sarrowval', '_douterstate', '_scaptions', '_scaptionfontsizes', '_svaluefontsizes', '_sdisplaystates'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();

		if (name.includes('_d'))
			this[name].value = newValue;
		this.UpdateDynamic();
	}

	onUpdateStatic = function() {
		this._initRows();
		let theElemConts = this.shadowRoot.querySelector('.multi-tit-elem');
		let childrenCont = theElemConts.querySelector('.inside-wrapper .items-wrapper');
		let elemChildren = Array.from(childrenCont.children);
		let arrowParent = theElemConts.querySelector('.inside-wrapper');
		let arrow = arrowParent.querySelector('.arrow');
		let captionsArray;
		let captionFontSizesArray;
		let valueFontSizesArray;
		let displayStatesArray;
		let childrenContHeight;
		let contMargin;

		setTimeout(() => {
			childrenContHeight = childrenCont.clientHeight;
			contMargin = (8/childrenCont.clientHeight).toFixed(2);

			elemChildren.forEach(elem => {
				elem.style.width = '100%';
				let childHeight = (childrenContHeight - (8 * (this._stitcount.value - 1))) / this._stitcount.value;
				elem.style.height = (childHeight / childrenCont.clientHeight * 100).toFixed(1) + '%';
			})
		}, 500);

		if (this._scaptions.value) {
			captionsArray = JSON.parse(this._scaptions.value);
		}
		if (this._scaptionfontsizes.value) {
			captionFontSizesArray = JSON.parse(this._scaptionfontsizes.value);
		}
		if (this._svaluefontsizes.value) {
			valueFontSizesArray = JSON.parse(this._svaluefontsizes.value);
		}
		if (this._sdisplaystates.value) {
			displayStatesArray = JSON.parse(this._sdisplaystates.value);
		}
		

		for (let i = 0; i < this._stitcount.value; i++) {
			let child = elemChildren[i];
			if (child !== undefined) {
				if (captionsArray !== undefined) {
					child._scaption.value = captionsArray[i];
				}
				if (captionFontSizesArray !== undefined) {
					child._scaptionfontsize.value = captionFontSizesArray[i];
				}
				if (valueFontSizesArray !== undefined) {
					child._svaluefontsize.value = valueFontSizesArray[i];
				}

				if (displayStatesArray !== undefined) {
					child._sdisplaystate.value = displayStatesArray[i];
				}
				child.UpdateStatic();
			}
		}

		// this.style.height = 32 + (24 * (this._stitcount.value - 1)) + (8 * (this._stitcount.value - 1)) + 'px';

		if (this._sarroworient.value == '' || this._sarroworient.value == 'undefined' || this._sarroworient.value == undefined) {
		} else {
			switch (this._sarroworient.value) {
				case 'top': 
					arrow.classList.add('top-arrow');
					arrow.classList.remove('bot-arrow');
					arrow.classList.remove('left-arrow');
					arrow.classList.remove('right-arrow');
				break;
				case 'bot':
					arrow.classList.add('bot-arrow');
					arrow.classList.remove('top-arrow');
					arrow.classList.remove('left-arrow');
					arrow.classList.remove('right-arrow');
				break;
				case 'left':
					arrow.classList.add('left-arrow');
					arrow.classList.remove('bot-arrow');
					arrow.classList.remove('top-arrow');
					arrow.classList.remove('right-arrow');
				break;
				case 'right':
					arrow.classList.add('right-arrow');
					arrow.classList.remove('bot-arrow');
					arrow.classList.remove('top-arrow');
					arrow.classList.remove('left-arrow');
				break;
			}

			if (this._sarrowval.value !== undefined || this._sarrowval.value !== '') {
				arrow.style.top = '';
				arrow.style.bottom = '';
				if (this._sarroworient.value == 'top' || this._sarroworient.value == 'bot') {
					if (this._sarrowval.value >= 0 && this._sarrowval.value <= 50) {
						arrow.style.right = '';
						arrow.style.left = arrowParent.offsetWidth / 100 * this._sarrowval.value + 'px';
					} else if (this._sarrowval.value > 50 && this._sarrowval.value <= 100) {
						arrow.style.left = '';
						arrow.style.right = arrowParent.offsetWidth - (arrowParent.offsetWidth / 100 * this._sarrowval.value) + 'px';
					}
				}
				else if (this._sarroworient.value == 'left' || this._sarroworient.value == 'right') {
					arrow.style.left = '';
					arrow.style.right = '';
					if (this._sarrowval.value >= 0 && this._sarrowval.value <= 50) {
						arrow.style.bottom = '';
						arrow.style.top = arrowParent.offsetHeight / 100 * this._sarrowval.value + 'px';
					} else if (this._sarrowval.value > 50 && this._sarrowval.value <= 100) {
						arrow.style.top = '';
						arrow.style.bottom = arrowParent.offsetHeight - (arrowParent.offsetHeight / 100 * this._sarrowval.value) + 'px';
					}
				}
			}
		}
		this.UpdateDynamic();
	}

	onUpdateDynamic = function() {
		let theElemConts = this.shadowRoot.querySelector('.multi-tit-elem');
		let elemChildren = theElemConts.querySelector('.inside-wrapper .items-wrapper').children;
		let childrenArr = Array.prototype.slice.call(elemChildren);

		elemChildren[0]._douterstate = this._douterstate;

		
		for (let i = 0; i < this._stitcount.value; i++) {
			let idx = i + 1;
			let child = elemChildren[i];
				if (child !== null) {
					child._dlowestval = this['_dlowestval' + idx];
					child._dhighestval = this['_dhighestval' + idx];
					child._dlowcrit = this['_dlowcrit' + idx];
					child._dhighcrit = this['_dhighcrit' + idx];
					child._dcurrentval = this['_dcurrentval' + idx];
					if (this.getAttribute('id') !== null) {
						child.id = i + '';
					} else {
						child.removeAttribute('id');
					}
					child.UpdateDynamic();
				}
		}
	}

	createBorder = function() {
		let theElemConts = this.shadowRoot.querySelector('.multi-tit-elem');
		let elemChildren = theElemConts.querySelector('.inside-wrapper .items-wrapper').children;
		let childrenArr = Array.prototype.slice.call(elemChildren);

		function searchClass(c) {
			return Array.from(childrenArr).some((el => el.shadowRoot.children[1].classList.contains(c)));
		}

		if ((searchClass('higher-than-optim') || searchClass('lower-than-optim')) && (searchClass('higher-than-highest') || searchClass('lower-than-lowest'))) {
			theElemConts.classList.add('danger');
		} 
		else if (searchClass('higher-than-optim') || searchClass('lower-than-optim')) {
			theElemConts.classList.add('crit');
			theElemConts.classList.remove('danger');
		}	
		else if (searchClass('higher-than-highest') || searchClass('lower-than-lowest')) {
			theElemConts.classList.add('danger');
			theElemConts.classList.remove('crit');
		} else {
			theElemConts.classList.remove('crit');
			theElemConts.classList.remove('danger');
		}
	}

	_initRows = function() {
		let theElemConts = this.shadowRoot.querySelector('.multi-tit-elem');
		let parentElem = theElemConts.querySelector('.inside-wrapper .items-wrapper');
		let elemChildren = parentElem.children;

		if (this._stitcount.value == null) {
			this._stitcount.value = 1;
		}			

		while (this._initedRowsCount > this._stitcount.value) {
			let idx = this._initedRowsCount; 
			delete this['_dlowestval' + idx];
			delete this['_dhighestval' + idx];
			delete this['_dlowcrit' + idx];
			delete this['_dhighcrit' + idx];
			delete this['_dcurrentval' + idx];
			parentElem.removeChild(parentElem.lastChild);
			this._initedRowsCount--;
		}

		while (this._initedRowsCount < this._stitcount.value) {

			if (this._initedRowsCount > 0) {
				let cloneElem = elemChildren[0].cloneNode(true);
				parentElem.appendChild(cloneElem);
			}

			let idx = this._initedRowsCount + 1;
			this['_dlowestval' + idx] = new Parameter(Type.Numeric, "Нижнее аварийное значение");
			this['_dhighestval' + idx] = new Parameter(Type.Numeric, "Верхнее аварийное значение");
			this['_dlowcrit' + idx] = new Parameter(Type.Numeric, "Нижняя предупредительная граница");
			this['_dhighcrit' + idx] = new Parameter(Type.Numeric, "Верхняя предупредительная граница");
			this['_dcurrentval' + idx] = new Parameter(Type.Numeric, "Текущее значение");

			this._initedRowsCount++;
		}
	}

	Init = function() {
		let theElemConts = this.shadowRoot.querySelector('.multi-tit-elem');

		this.AddTooltip(theElemConts, {});
	}
})