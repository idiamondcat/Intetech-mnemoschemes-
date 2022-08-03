register("gas-wells-cluster-elem", class extends SimpleElement {
	_swellcount = new Parameter(Type.Numeric, "Количество элементов gas-well-elem");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Текст");
	_scaptionorient = new Parameter(Type.String, "Ориентация текста, left-right");
	_scolor = new Parameter(Type.String, "Цвет, массив цветов");
	_sorient = new Parameter(Type.String, "Расположение кустов, left-right");

	_initedWellsCount = 0

	static get markup() {
		return `
		<div class="gas-wells-cluster-elem">
			<div class="gas-wells-cluster-name">
				<div class="text-displayer"></div>
			</div>
			<div class="gas-wells-cluster-wrapper">
				<gas-well-elem class="gas-well"></gas-well-elem>
			</div>
		</div>
		`;
	}
	
	static get style() {
		return `
		.gas-wells-cluster-elem {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.gas-wells-cluster-elem .gas-wells-cluster-name {
			display: inline-flex;
			box-sizing: border-box;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
            width: 100%;
		}
		.gas-wells-cluster-elem .gas-wells-cluster-name .text-displayer {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 26px;
			line-height: 26px;
			font-weight: 400;
			white-space: nowrap;
			color: var(--text-box-color);
		}
		.gas-wells-cluster-elem .gas-wells-cluster-name.right {
			justify-content: flex-end;
		}
		.gas-wells-cluster-elem .gas-wells-cluster-name.left {
			justify-content: flex-start;
		}
		.gas-wells-cluster-elem .gas-wells-cluster-wrapper {
			width: 100%;
			display: flex;
			align-items: center;
		}
		.gas-wells-cluster-elem .gas-wells-cluster-wrapper.left {
			justify-content: flex-start;
		}
		.gas-wells-cluster-elem .gas-wells-cluster-wrapper.right {
			justify-content: flex-end;
		}
		.gas-wells-cluster-elem .gas-wells-cluster-wrapper .gas-well {
			width: calc(20% - 0.72%);
		}
		.gas-wells-cluster-elem .gas-wells-cluster-wrapper .gas-well:not(:last-child) {
			margin-right: 0.72%;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_swellcount', '_scaption', '_sfontsize', '_scolor', '_sorient', '_scaptionorient'];
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
		this._initWells();
		let theElemCont = this.shadowRoot.querySelector('.gas-wells-cluster-elem');
		let captionCont = theElemCont.querySelector('.gas-wells-cluster-name');
		let captionElem = theElemCont.querySelector('.gas-wells-cluster-name .text-displayer');
		let wellsCont = theElemCont.querySelector('.gas-wells-cluster-wrapper');
		let caption = this._scaption.value;
		let wells = wellsCont.children;

		if (this._scolor.value) {
			for (let i = 0; i < wells.length; i++) {
				wells[i]._scolor = this._scolor;
				wells[i].UpdateStatic();
			}
		}

		if ((this._sfontsize.value !== undefined) && (this._sfontsize.value !== '')) {
			captionElem.style.height = parseInt(this._sfontsize.value) + 'px';
			captionElem.style.fontSize = parseInt(this._sfontsize.value) + 'px';
			captionElem.style.lineHeight = parseInt(this._sfontsize.value) + 'px';
		} else {
			captionElem.style.fontSize = '';
			captionElem.style.height = '';
			captionElem.style.lineHeight = '';
		}
		
		if (captionElem) {
			if ((caption !== undefined) && (caption !== ''))
				captionElem.innerHTML = '' + caption;
			else
				captionElem.innerHTML = '';
		}
		

		
		if (this._sorient.value == undefined || this._sorient.value == 'left' || this._sorient.value == '') {
			wellsCont.classList.add('left');
			wellsCont.classList.remove('right');
		} else if (this._sorient.value == 'right') {
			wellsCont.classList.add('right');
			wellsCont.classList.remove('left');
		}

		if (this._scaptionorient.value == undefined || this._scaptionorient.value == '') {
			captionCont.classList.remove('left');
			captionCont.classList.remove('right');
		} else {
			if (this._scaptionorient.value == 'left') {
				captionCont.classList.add('left');
				captionCont.classList.remove('right');
			} else if (this._scaptionorient.value == 'right') {
				captionCont.classList.add('right');
				captionCont.classList.remove('left');
			}
		}
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.gas-wells-cluster-elem');
		let wells = theElemCont.querySelector('.gas-wells-cluster-wrapper').children;

		for (let i = 0; i < this._swellcount.value; i++) {
			let idx = i + 1;
			let child = wells[i];
			if (child) {
				child._dcurrentval = this['_dcurrentval' + idx];
				if (!this.getAttribute('id')) {
					child.removeAttribute('id');
				}
				child.UpdateDynamic();
			}
		}
	}

	_initWells = function() {
		let theElemConts = this.shadowRoot.querySelector('.gas-wells-cluster-elem');
		let parentElem = theElemConts.querySelector('.gas-wells-cluster-wrapper');
		let elemChildren = parentElem.children;

		if (!this._swellcount.value) {
			this._swellcount.value = 1;
		}			

		while (this._initedWellsCount > this._swellcount.value) {
			let idx = this._initedWellsCount; 
			delete this['_dcurrentval' + idx];
			parentElem.removeChild(parentElem.lastChild);
			this._initedWellsCount--;
		}

		while (this._initedWellsCount < this._swellcount.value) {

			if (this._initedWellsCount > 0) {
				let cloneElem = elemChildren[0].cloneNode(true);
				parentElem.appendChild(cloneElem);
			}

			let idx = this._initedWellsCount + 1;
			this['_dcurrentval' + idx] = new Parameter(Type.Numeric, "Текущее значение");
			this._initedWellsCount++;
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.gas-wells-cluster-elem');

		this.AddTooltip(theElemCont, {});
	}
})
