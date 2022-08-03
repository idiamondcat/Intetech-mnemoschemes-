register("arrow-valve-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Текст");
	_sshowpercent = new Parameter(Type.Numeric, "Показать процент открытия, 1 - показать, 0 - скрыть");

	_dcurrentval = new Parameter(Type.Numeric, "Состояние активности, 0-1");
	_dcurrentpercent = new Parameter(Type.Numeric, "Процент открытия, 0-100");

	static get markup() {
		return `
		<div class="arrow-valve-elem">
			<div class="percent-container">
				<div class="inside-wrapper">
					<div class="arrow"></div>
					<div class="percent-val"></div>
				</div>
			</div>
			<div class="cont">
				<svg class="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 40.5" preserveAspectRatio="xMinYMin meet">
					<g class="elem">
						<g class="unactive-color">
							<path d="M11.6,19.2V29.3a.47.47,0,0,1-.5.5H7.4a.47.47,0,0,1-.5-.5V9.1a.47.47,0,0,1,.5-.5h3.7a.47.47,0,0,1,.5.5Z"/>
							<path d="M57.9,19.2V29.3a.47.47,0,0,0,.5.5h3.7a.47.47,0,0,0,.5-.5V9.1a.47.47,0,0,0-.5-.5H58.4a.47.47,0,0,0-.5.5Z"/>
							<path d="M34.8,33.2a13.6,13.6,0,0,0,9.7-4,8.62,8.62,0,0,1,6.1-2.5h4.5a.47.47,0,0,0,.5-.5V12.3a.47.47,0,0,0-.5-.5H50.4a8.49,8.49,0,0,1-6-2.6,10.52,10.52,0,0,0-2.7-2H28.1a13.5,13.5,0,0,0-2.7,2,8.67,8.67,0,0,1-6,2.6H14.7a.47.47,0,0,0-.5.5V26.2a.47.47,0,0,0,.5.5h4.5a8.22,8.22,0,0,1,6.1,2.5,12.8,12.8,0,0,0,9.5,4"/>
						</g>
						<g class="color">
							<path d="M11.6,19.2V29.3a.47.47,0,0,1-.5.5H7.4a.47.47,0,0,1-.5-.5V9.1a.47.47,0,0,1,.5-.5h3.7a.47.47,0,0,1,.5.5Z"/>
							<path d="M57.9,19.2V29.3a.47.47,0,0,0,.5.5h3.7a.47.47,0,0,0,.5-.5V9.1a.47.47,0,0,0-.5-.5H58.4a.47.47,0,0,0-.5.5Z"/>
							<path d="M34.8,33.2a13.6,13.6,0,0,0,9.7-4,8.62,8.62,0,0,1,6.1-2.5h4.5a.47.47,0,0,0,.5-.5V12.3a.47.47,0,0,0-.5-.5H50.4a8.49,8.49,0,0,1-6-2.6,10.52,10.52,0,0,0-2.7-2H28.1a13.5,13.5,0,0,0-2.7,2,8.67,8.67,0,0,1-6,2.6H14.7a.47.47,0,0,0-.5.5V26.2a.47.47,0,0,0,.5.5h4.5a8.22,8.22,0,0,1,6.1,2.5,12.8,12.8,0,0,0,9.5,4"/>
						</g>
						<g class="valve-arrow">
							<polyline points="38.3 25.9 45.1 19.2 38.3 12.4"/>
							<line x1="45.1" y1="19.2" x2="24.4" y2="19.2"/>
						</g>
					</g>
					<g class="placeholder">
						<g class="overlay-container" fill="none">
							<path d="M65.7,40.3H4.4C2,40.3,0,39.3,0,38V2.4C0,1.1,2,0,4.4,0H65.7c2.4,0,4.4,1.1,4.4,2.4V37.9C70.1,39.3,68.1,40.3,65.7,40.3Z"/>
						</g>
						<g class="alarm-container" fill="none">
							<path d="M65.7,2.05a4,4,0,0,1,2.4.64V37.76a4.08,4.08,0,0,1-2.4.59H4.4A4.39,4.39,0,0,1,2,37.78V2.69a4,4,0,0,1,2.4-.64H65.7m0-2H4.4C2,.05,0,1.15,0,2.45v35.6c0,1.3,2,2.3,4.4,2.3H65.7c2.4,0,4.4-1,4.4-2.4V2.45c0-1.3-2-2.4-4.4-2.4Z"/>
						</g>
					</g>
				</svg>
				<caption-elem class="arrow-valve-caption" id="0"></caption-elem>
			</div>
		</div>
		`;
	}
	
	static get style() {
		return `
		.arrow-valve-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.arrow-valve-elem .percent-container {
			display: inline-block;
			position: absolute;
			top: -43px;
			left: 0;
			right: 0;
			margin-left: auto;
			margin-right: auto;
			text-align: center;
			box-sizing: border-box;
			padding: 3px 9.5px;
			background-color: var(--tit-name-cont-bg-color);
			border: 2px solid var(--main-object-fill-color);
			border-radius: 8px;
		}
		.arrow-valve-elem .percent-container.unactive {
			visibility: hidden;
		}
		.arrow-valve-elem .percent-container.active {
			visibility: visible;
		}
		.arrow-valve-elem .percent-container .inside-wrapper {
			position: relative;
			text-align: center;
			margin: 0 auto;
		}
		.arrow-valve-elem .percent-container .percent-val {
			display: inline;
			box-sizing: border-box;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: var(--sys-numvalue-fontsize);
			line-height: var(--sys-numvalue-lineheight);
			color: var(--tit-name-cont-txt-color);
			white-space: nowrap;
		}
		.arrow-valve-elem .percent-container .arrow {
			display: block;
			width: 10px;
			  height: 10px;
			  position: absolute;
			background-color: var(--tit-name-cont-bg-color);
			border-right:2px solid var(--main-object-fill-color);
			border-bottom:2px solid var(--main-object-fill-color);
			  box-sizing: border-box;
			bottom: -9px;
			left: calc(50% - 5px);
			transform: rotate(45deg);
			  -moz-transform:rotate(45deg);
			  -webkit-transform:rotate(45deg);
		}
		.arrow-valve-elem .cont {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}
		.arrow-valve-elem .cont .svg-container {
			max-width: 100%;
			min-height: 40.35px;
		}
		.arrow-valve-elem .cont .svg-container .elem .valve-arrow {
			fill: none;
			stroke: #ffffff;
			stroke-miterlimit: 10;
			stroke-width: 3px;
		}
		.arrow-valve-elem .cont .svg-container .elem .unactive-color {
			fill: var(--underlayer-default-color);
		}
		.arrow-valve-elem .cont .svg-container .elem .color {
			fill: var(--underlayer-default-color);
			z-index: 1;
		}
		.arrow-valve-elem .cont .svg-container .elem.default {
			stroke: none;
		}
		.arrow-valve-elem .cont .svg-container .placeholder .alarm-container.default {
			fill: none;
		}
		.arrow-valve-elem .cont .svg-container .placeholder .alarm-container.error {
			fill: var(--num-value-linecolor-awful);
		}
		.arrow-valve-elem .cont .svg-container .placeholder .alarm-container.unknown {
			fill: var(--underlayer-default-color);
		}
		.arrow-valve-elem .cont .svg-container .placeholder .visible {
			fill: var(--sys-unavailable-color);
		}
		.arrow-valve-elem .cont .svg-container .placeholder .invisible {
			fill: none;
		}
		.arrow-valve-elem .cont .svg-container .placeholder .overlay-container.visible {
			fill: var(--sys-unavailable-color);
		}
		.arrow-valve-elem .cont .svg-container .placeholder .overlay-container.invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentpercent', '_dcurrentval', '_sfontsize', '_scaption', '_sshowpercent'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.arrow-valve-elem');
		let percentBlock = theElemCont.querySelector('.percent-container');
		let valveCont = theElemCont.querySelector('.cont .svg-container');
		let coloringElem = valveCont.querySelector('.elem .color');
		let captionElem = theElemCont.querySelector('.cont .arrow-valve-caption');
		let captionText = captionElem.shadowRoot.querySelector('.text-displayer');

		if (captionElem !== null) {
			captionElem._scaption = this._scaption;
			captionElem._sfontsize = this._sfontsize;
			captionElem.UpdateStatic();
		}

		let w = this.offsetWidth;
		let txtWidth = captionText.offsetWidth;
		let imageW = Number(valveCont.getBBox().width.toFixed(1));
		let imageH = Number(valveCont.getBBox().height.toFixed(1));

		if (this._scaption.value !== null) {
				this.style.width = imageW + 'px';
				w = imageW;
				if (txtWidth > w) {
					captionElem.style.width = txtWidth + 'px';
					this.style.width = txtWidth + 'px';
				} 
				else {
					this.style.width = w + 'px';
					captionElem.style.width = w + 'px';
				}
				this.style.height = imageH + captionElem.offsetHeight + 5 + 'px';
		} 
		else {
				this.style.width = imageW + 'px';
				this.style.height = imageH + 'px';
		}

		if (this._sshowpercent.value == null) {
			percentBlock.classList.add('unactive');
			percentBlock.classList.remove('active');
		} else {
			if (this._sshowpercent.value == 0) {
				percentBlock.classList.add('unactive');
				percentBlock.classList.remove('active');
			} else if (this._sshowpercent.value == 1) {
				percentBlock.classList.add('active');
				percentBlock.classList.remove('unactive');
			}
		}

		coloringElem.style.fill = this.getActiveColor(this._scolor.value);
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.arrow-valve-elem');
		let percentBlock = theElemCont.querySelector('.percent-container');
		let percentCont = percentBlock.querySelector('.percent-val');
		let stateVal = parseInt(this._dcurrentval.value);
		let percentVal = parseFloat(this._dcurrentpercent.value);
		let captionElem = theElemCont.querySelector('.cont .arrow-valve-caption');
		let valveCont = theElemCont.querySelector('.cont .svg-container');
		let colorLayer = valveCont.querySelector('.elem .color');
		let alarmContainer = valveCont.querySelector('.alarm-container');
		let overlayContainer = valveCont.querySelector('.overlay-container');
		let colorPercent;

		colorLayer.style.opacity = 0;

		if (this._dcurrentpercent.value) {
			percentBlock.style.display = 'inline-block';

			if ((percentVal == undefined) || (percentVal == "undefined") || (percentVal == "")) {
				percentCont.innerHTML = 'Н/Д';
			} else {
				alarmContainer.classList.add('default');
				alarmContainer.classList.remove('unknown');
				alarmContainer.classList.remove('error');

				overlayContainer.classList.add('invisible');
				overlayContainer.classList.remove('visible');

				colorLayer.classList.add('default');
				colorLayer.classList.remove('error');
				if (percentVal <= 0) {
					colorPercent = 0;
					percentCont.innerHTML = '0%';
					colorLayer.style.opacity = "" + 0 + "";
				} else {
					colorPercent = parseFloat(percentVal.toFixed(1));
					percentCont.innerHTML = percentVal.toFixed(1) + '%';
					let finalOpacity = (0.8 * colorPercent + 20) / 100;
					colorLayer.style.opacity = "" + finalOpacity + "";
				}
			}
		} else {
			percentBlock.style.display = 'none';
			colorLayer.style.opacity = 0;

			if (isNaN(stateVal)) {
				alarmContainer.classList.add('unknown');
				alarmContainer.classList.remove('default');
				alarmContainer.classList.remove('error');
	
				overlayContainer.classList.add('visible');
				overlayContainer.classList.remove('invisible');
	
				colorLayer.classList.add('default');
				colorLayer.classList.remove('error');		
			} else {
				if (stateVal == 0) {
					//закрыто
					alarmContainer.classList.add('default');
					alarmContainer.classList.remove('unknown');
					alarmContainer.classList.remove('error');
	
					overlayContainer.classList.add('invisible');
					overlayContainer.classList.remove('visible');
	
					colorLayer.classList.add('default');
					colorLayer.classList.remove('error');
				} else if (stateVal == 1) {
					//открыто
					alarmContainer.classList.add('default');
					alarmContainer.classList.remove('unknown');
					alarmContainer.classList.remove('error');
	
					overlayContainer.classList.add('invisible');
					overlayContainer.classList.remove('visible');
	
					colorLayer.classList.add('default');
					colorLayer.classList.remove('error');

					colorLayer.style.opacity = 1;
				} else if (stateVal == -1) {
					//ошибка
					alarmContainer.classList.add('error');
					alarmContainer.classList.remove('unknown');
					alarmContainer.classList.remove('default');
	
					overlayContainer.classList.add('visible');
					overlayContainer.classList.remove('invisible');
	
					colorLayer.classList.add('error');
					colorLayer.classList.remove('default');
				} else if (stateVal == 2) {
					//неопределенное состояние
					alarmContainer.classList.add('default');
					alarmContainer.classList.remove('unknown');
					alarmContainer.classList.remove('error');
		
					overlayContainer.classList.add('visible');
					overlayContainer.classList.remove('invisible');
		
					colorLayer.classList.add('default');
					colorLayer.classList.remove('error');			
				} else {
					//нет сигнала
					alarmContainer.classList.add('default');
					alarmContainer.classList.remove('unknown');
					alarmContainer.classList.remove('error');
	
					overlayContainer.classList.add('visible');
					overlayContainer.classList.remove('invisible');
	
					colorLayer.classList.add('default');
					colorLayer.classList.remove('error');
				}
			}
		}

		if (captionElem !== null) {
			if (this.getAttribute('id') == null) {
				captionElem.removeAttribute('id');
				captionElem.UpdateStatic();
			}
		}
		
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.arrow-valve-elem');

		this.AddTooltip(theElemCont, {});
	}
})
