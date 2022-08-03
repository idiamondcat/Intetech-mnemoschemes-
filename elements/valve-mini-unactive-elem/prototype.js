register("valve-mini-unactive-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");
	_scaption = new Parameter(Type.String, "Текст");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_svalveminiorient = new Parameter(Type.String, "Положение насоса, h - горизонтальное, v - вертикальное");
	_dcurrentval = new Parameter(Type.Numeric, "Текущее значение");

	static get markup() {
		return `
		<div class="valve-mini-unactive-elem">
		 <div class="cont">
			<svg class="horizontal-valve" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 37.6" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="unactive-color">
						<path d="M4,34.3v-1.5c0-0.2,0.2-0.3,0.3-0.3h3.1c1.7,0,3.3,0.6,4.4,1.8c1.8,1.8,4.3,2.9,7.1,2.9s5.2-1.1,7.1-2.9c1.2-1.2,2.8-1.8,4.4-1.8h3.1c0.2,0,0.3,0.2,0.3,0.3v1.5c0,0.2,0.2,0.4,0.4,0.4h2.7c0.2,0,0.4-0.2,0.4-0.4V27v-7.3c0-0.2-0.2-0.4-0.4-0.4h-2.7c-0.2,0-0.4,0.2-0.4,0.4v1.5c0,0.2-0.2,0.3-0.3,0.3h-3.3c-1.7,0-3.2-0.7-4.4-1.9c-0.6-0.6-1.2-1-1.9-1.5h-5h-5c-0.7,0.4-1.4,0.9-1.9,1.5c-1.2,1.2-2.8,1.9-4.4,1.9H4.4c-0.2,0-0.3-0.2-0.3-0.3v-1.5c0-0.2-0.2-0.4-0.4-0.4H0.9c-0.2,0-0.4,0.2-0.4,0.4V27v7.3c0,0.2,0.2,0.4,0.4,0.4h2.7C3.8,34.7,4,34.5,4,34.3z"/>
						<path d="M34.1,0.5H19H3.9c-0.2,0-0.4,0.2-0.4,0.4v1.6c0,0.2,0.2,0.4,0.4,0.4h2.2c0.2,0,0.4,0.1,0.6,0.2l9.6,6.4c0.2,0.2,0.4,0.4,0.4,0.7v1.6c0,0.3-0.3,0.6-0.6,0.6h-1.6c-0.2,0-0.4,0.2-0.4,0.4v3.3c0,0.2,0.2,0.4,0.4,0.4H19h4.5c0.2,0,0.4-0.2,0.4-0.4v-3.3c0-0.2-0.2-0.4-0.4-0.4h-1.6c-0.3,0-0.6-0.3-0.6-0.6v-1.6c0-0.3,0.1-0.6,0.4-0.7l9.6-6.4c0.2-0.1,0.4-0.2,0.6-0.2h2.2c0.2,0,0.4-0.2,0.4-0.4V0.9C34.5,0.7,34.3,0.5,34.1,0.5z M21.3,5.9C21.2,6,21,6.1,20.8,6.1H19h-1.8c-0.2,0-0.3-0.1-0.5-0.1L12,2.9h7h7L21.3,5.9z"/>
					</g>
					<g class="color">
						<path d="M4,34.3v-1.5c0-0.2,0.2-0.3,0.3-0.3h3.1c1.7,0,3.3,0.6,4.4,1.8c1.8,1.8,4.3,2.9,7.1,2.9s5.2-1.1,7.1-2.9c1.2-1.2,2.8-1.8,4.4-1.8h3.1c0.2,0,0.3,0.2,0.3,0.3v1.5c0,0.2,0.2,0.4,0.4,0.4h2.7c0.2,0,0.4-0.2,0.4-0.4V27v-7.3c0-0.2-0.2-0.4-0.4-0.4h-2.7c-0.2,0-0.4,0.2-0.4,0.4v1.5c0,0.2-0.2,0.3-0.3,0.3h-3.3c-1.7,0-3.2-0.7-4.4-1.9c-0.6-0.6-1.2-1-1.9-1.5h-5h-5c-0.7,0.4-1.4,0.9-1.9,1.5c-1.2,1.2-2.8,1.9-4.4,1.9H4.4c-0.2,0-0.3-0.2-0.3-0.3v-1.5c0-0.2-0.2-0.4-0.4-0.4H0.9c-0.2,0-0.4,0.2-0.4,0.4V27v7.3c0,0.2,0.2,0.4,0.4,0.4h2.7C3.8,34.7,4,34.5,4,34.3z"/>
						<path d="M34.1,0.5H19H3.9c-0.2,0-0.4,0.2-0.4,0.4v1.6c0,0.2,0.2,0.4,0.4,0.4h2.2c0.2,0,0.4,0.1,0.6,0.2l9.6,6.4c0.2,0.2,0.4,0.4,0.4,0.7v1.6c0,0.3-0.3,0.6-0.6,0.6h-1.6c-0.2,0-0.4,0.2-0.4,0.4v3.3c0,0.2,0.2,0.4,0.4,0.4H19h4.5c0.2,0,0.4-0.2,0.4-0.4v-3.3c0-0.2-0.2-0.4-0.4-0.4h-1.6c-0.3,0-0.6-0.3-0.6-0.6v-1.6c0-0.3,0.1-0.6,0.4-0.7l9.6-6.4c0.2-0.1,0.4-0.2,0.6-0.2h2.2c0.2,0,0.4-0.2,0.4-0.4V0.9C34.5,0.7,34.3,0.5,34.1,0.5z M21.3,5.9C21.2,6,21,6.1,20.8,6.1H19h-1.8c-0.2,0-0.3-0.1-0.5-0.1L12,2.9h7h7L21.3,5.9z"/>
					</g>	
				</g>
			</svg>
			<svg class="vertical-valve" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.6 38" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="unactive-color">
						<path d="M33.8,33.3H32.3A.32.32,0,0,1,32,33V29.9a5.88,5.88,0,0,1,1.8-4.4,10,10,0,0,0,2.9-7.1,10.14,10.14,0,0,0-2.9-7.1A6.2,6.2,0,0,1,32,6.9V3.8a.32.32,0,0,1,.3-.3h1.5a.43.43,0,0,0,.4-.4V.4a.43.43,0,0,0-.4-.4H19.2a.43.43,0,0,0-.4.4V3.1a.43.43,0,0,0,.4.4h1.5a.32.32,0,0,1,.3.3V7.1a6.13,6.13,0,0,1-1.9,4.4,13.93,13.93,0,0,0-1.5,1.9v10a7,7,0,0,0,1.5,1.9A6.31,6.31,0,0,1,21,29.7v3.2a.32.32,0,0,1-.3.3H19.2a.43.43,0,0,0-.4.4v2.8a.43.43,0,0,0,.4.4H33.8a.43.43,0,0,0,.4-.4V33.7A.43.43,0,0,0,33.8,33.3Z"/>
						<path d="M0,3.2V33.4a.43.43,0,0,0,.4.4H2a.43.43,0,0,0,.4-.4V31.2a1.42,1.42,0,0,1,.2-.6L9,21a1,1,0,0,1,.7-.4h1.6a.65.65,0,0,1,.6.6v1.6a.43.43,0,0,0,.4.4h3.3a.43.43,0,0,0,.4-.4v-9a.43.43,0,0,0-.4-.4H12.3a.43.43,0,0,0-.4.4v1.6a.65.65,0,0,1-.6.6H9.7a.67.67,0,0,1-.7-.4L2.6,6a1.42,1.42,0,0,1-.2-.6V3.2A.43.43,0,0,0,2,2.8H.4A.43.43,0,0,0,0,3.2ZM5.4,16a.76.76,0,0,1,.2.5v3.6c0,.2-.1.3-.1.5L2.4,25.3v-14Z"/>
					</g>
					<g class="color">
						<path d="M33.8,33.3H32.3A.32.32,0,0,1,32,33V29.9a5.88,5.88,0,0,1,1.8-4.4,10,10,0,0,0,2.9-7.1,10.14,10.14,0,0,0-2.9-7.1A6.2,6.2,0,0,1,32,6.9V3.8a.32.32,0,0,1,.3-.3h1.5a.43.43,0,0,0,.4-.4V.4a.43.43,0,0,0-.4-.4H19.2a.43.43,0,0,0-.4.4V3.1a.43.43,0,0,0,.4.4h1.5a.32.32,0,0,1,.3.3V7.1a6.13,6.13,0,0,1-1.9,4.4,13.93,13.93,0,0,0-1.5,1.9v10a7,7,0,0,0,1.5,1.9A6.31,6.31,0,0,1,21,29.7v3.2a.32.32,0,0,1-.3.3H19.2a.43.43,0,0,0-.4.4v2.8a.43.43,0,0,0,.4.4H33.8a.43.43,0,0,0,.4-.4V33.7A.43.43,0,0,0,33.8,33.3Z"/>
						<path d="M0,3.2V33.4a.43.43,0,0,0,.4.4H2a.43.43,0,0,0,.4-.4V31.2a1.42,1.42,0,0,1,.2-.6L9,21a1,1,0,0,1,.7-.4h1.6a.65.65,0,0,1,.6.6v1.6a.43.43,0,0,0,.4.4h3.3a.43.43,0,0,0,.4-.4v-9a.43.43,0,0,0-.4-.4H12.3a.43.43,0,0,0-.4.4v1.6a.65.65,0,0,1-.6.6H9.7a.67.67,0,0,1-.7-.4L2.6,6a1.42,1.42,0,0,1-.2-.6V3.2A.43.43,0,0,0,2,2.8H.4A.43.43,0,0,0,0,3.2ZM5.4,16a.76.76,0,0,1,.2.5v3.6c0,.2-.1.3-.1.5L2.4,25.3v-14Z"/>
					</g>
				</g>
			</svg>
			<caption-elem class="valve-mini-caption" id="0"></caption-elem>
		 </div>
		</div>
		`;
	}
	
	static get style() {
		return `
		.valve-mini-unactive-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.valve-mini-unactive-elem .cont {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}
		.valve-mini-unactive-elem.horizontal .cont {
			flex-direction: column;
		}
		.valve-mini-unactive-elem.vertical .cont {
			flex-direction: row;
		}
		.valve-mini-unactive-elem svg {
			display: none;
		}
		.valve-mini-unactive-elem.horizontal svg.active {
			display: block;
			max-width: 100%;
			min-height: 37.6px;
		}
		.valve-mini-unactive-elem.vertical svg.active {
			display: block;
			max-height: 100%;
			min-width: 37.6px;
		}
		.valve-mini-unactive-elem .cont svg .elem {
			fill: var(--body-bg-color);
		}
		.valve-mini-unactive-elem .cont svg .elem .unactive-color {
			stroke: var(--underlayer-default-color);
			stroke-width: 2;
		}
		.valve-mini-unactive-elem .cont svg .elem .color {
			stroke: var(--underlayer-default-color);
			stroke-width: 2;
			z-index: 1;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_scolor', '_scaption', '_sfontsize','_svalveminiorient', '_dcurrentval'];
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
		let theElemCont = this.shadowRoot.querySelector('.valve-mini-unactive-elem');
		let svgElem = theElemCont.querySelectorAll('.cont svg');
		let hValve = theElemCont.querySelector('.cont .horizontal-valve');
		let vValve = theElemCont.querySelector('.cont .vertical-valve');
		let captionElem = theElemCont.querySelector('.cont .valve-mini-caption');
		let captionText = captionElem.shadowRoot.querySelector('.text-displayer');

		if (captionElem) {
			captionElem._scaption = this._scaption;
			captionElem._sfontsize = this._sfontsize;
			captionElem.UpdateStatic();
		}

		switch(this._svalveminiorient.value) {
			case 'h': 
				theElemCont.classList.add('horizontal');
				theElemCont.classList.remove('vertical');
				hValve.classList.add('active');
				vValve.classList.remove('active');
				break;
			case 'v':
				theElemCont.classList.add('vertical');
				theElemCont.classList.remove('horizontal');
				hValve.classList.remove('active');
				vValve.classList.add('active');
				break;
			default:
				theElemCont.classList.add('horizontal');
				hValve.classList.add('active');
				break;
		}

		let w = this.offsetWidth;
		let txtWidth = captionText.offsetWidth;
		let imageW;
		let imageH;
		svgElem.forEach(elem => {
			if (elem.classList.contains('active')) {
				imageW = Number(elem.getBBox().width.toFixed(1));
				imageH = Number(elem.getBBox().height.toFixed(1));
			}
		})

		if (this._scaption.value) {
			if (theElemCont.classList.contains('horizontal')) {
				this.style.width = imageW + 'px';
				w = imageW;
				if (txtWidth > w) {
					captionElem.style.width = txtWidth + 'px';
					this.style.width = captionElem.offsetWidth + 'px';
				} 
				else {
					this.style.width = w + 'px';
					captionElem.style.width = w + 'px';
				}
				captionElem.style.marginTop = '7px';
				captionElem.style.marginLeft = '0';
				this.style.height = imageH + captionElem.offsetHeight + 7 + 'px';
			} 
			else if (theElemCont.classList.contains('vertical')) {
				captionElem.style.width = txtWidth + 'px';
				captionElem.style.marginTop = '0';
				captionElem.style.marginLeft = '7px';
				this.style.width = imageW + captionElem.offsetWidth + 7 + 'px';
				this.style.height = imageH + 'px';
			}
		} 
		else {
			if (theElemCont.classList.contains('horizontal')) {
				captionElem.style.marginTop = '0';
				captionElem.style.marginLeft = '0';
				this.style.width = imageW + 'px';
				this.style.height = imageH + 'px';
			} else if (theElemCont.classList.contains('vertical')) {
				captionElem.style.marginTop = '0';
				captionElem.style.marginLeft = '0';
				this.style.height = imageW + 'px';
				this.style.width = imageH + 'px';
			}
		}

		let activeValve = theElemCont.querySelector('.cont svg.active .elem .color');
		activeValve.style.stroke = this.getActiveColor(this._scolor.value);
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.valve-mini-unactive-elem');
		let valveCont = theElemCont.querySelectorAll('.cont svg');
		let captionElem = theElemCont.querySelector('.cont .valve-mini-caption');
		let curVal = parseInt(this._dcurrentval.value);

		valveCont.forEach(elem => {
			if (elem.classList.contains('active')) {
				let colorLayer = elem.querySelector('.elem .color');
				colorLayer.style.opacity = 0;

				if (isNaN(curVal) || curVal == null) {
					colorLayer.style.opacity = 0;
				} else {
					if (curVal == 0)
						colorLayer.style.opacity = 0;
					else if (curVal == 1)
						colorLayer.style.opacity = 1;
					else if (curVal == 2)
						colorLayer.style.opacity = 0;
					else
						colorLayer.style.opacity = 0;
				}
			}
		})

		if (captionElem) {
			if (!this.getAttribute('id')) {
				captionElem.removeAttribute('id');
				captionElem.UpdateStatic();
			}
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.valve-mini-unactive-elem');

		this.AddTooltip(theElemCont, {});
	}
})
