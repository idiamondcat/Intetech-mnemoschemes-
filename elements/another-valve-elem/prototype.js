register("another-valve-elem", class extends SimpleElement {
		_scolor = new Parameter(Type.Color, "Цвет");
		_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
		_scaption = new Parameter(Type.String, "Текст");
		_svalveorient = new Parameter(Type.String, "Положение насоса, h - горизонтальное, v - вертикальное");
		_sshowpercent = new Parameter(Type.Numeric, "Показать процент открытия, 1 - показать, 0 - скрыть");

		_dcurrentval = new Parameter(Type.Numeric, "Состояние активности, 0-1");
		_dcurrentpercent = new Parameter(Type.Numeric, "Процент открытия, 0-100");

		static get markup() {
			return `<div class="another-valve-elem">
						<div class="percent-container">
							<div class="inside-wrapper">
								<div class="arrow"></div>
								<div class="percent-val"></div>
							</div>
						</div>
						<div class="cont">
							<svg class="horizontal-valve" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 71 69" preserveAspectRatio="xMinYMin meet">
								<g class="elem">
									<g class="unactive-color">
										<path d="M12,48V58c0,0.3-0.2,0.5-0.5,0.5H7.7c-0.3,0-0.5-0.2-0.5-0.5V48V37.9c0-0.3,0.2-0.5,0.5-0.5h3.8
											c0.3,0,0.5,0.2,0.5,0.5V48z"/>
										<path d="M59.1,48V58c0,0.3,0.2,0.5,0.5,0.5h3.8c0.3,0,0.5-0.2,0.5-0.5V48V37.9c0-0.3-0.2-0.5-0.5-0.5h-3.8
											c-0.3,0-0.5,0.2-0.5,0.5V48z"/>
										<path d="M35.6,61.8c3.8,0,7.3-1.5,9.8-4c1.6-1.6,3.9-2.5,6.2-2.5h4.6c0.3,0,0.5-0.2,0.5-0.5V41c0-0.3-0.2-0.5-0.5-0.5
											h-4.7c-2.3,0-4.5-1-6.1-2.6c-0.8-0.8-1.7-1.5-2.7-2h-6.9h-6.9c-1,0.6-1.9,1.2-2.7,2c-1.7,1.6-3.8,2.6-6.1,2.6h-4.7
											c-0.3,0-0.5,0.2-0.5,0.5v13.9c0,0.3,0.2,0.5,0.5,0.5h4.5c2.3,0,4.5,0.9,6.2,2.5C28.3,60.3,31.8,61.8,35.6,61.8"/>
										<path d="M56.5,11.1L35.6,7.2l-20.9,3.9c-0.3,0-0.5,0.2-0.5,0.5v2.2c0,0.3,0.2,0.5,0.5,0.5h13c0.3,0,0.6,0.1,0.9,0.3
											l3.4,8.8c0.3,0.2,0.5,0.6,0.5,1v2.2c0,0.5-0.4,0.9-0.9,0.9h-2.3c-0.3,0-0.5,0.2-0.5,0.5v4.6c0,0.3,0.2,0.5,0.5,0.5h6.2h6.2
											c0.3,0,0.5-0.2,0.5-0.5v-4.6c0-0.3-0.2-0.5-0.6-0.5h-2.3c-0.5,0-0.9-0.4-0.9-0.9v-2.2c0-0.4,0.2-0.8,0.5-1l3.4-8.8
											c0.3-0.2,0.6-0.3,0.9-0.3h13c0.3,0,0.5-0.2,0.5-0.5v-2.2C57,11.3,56.8,11.1,56.5,11.1"/>
									</g>
									<g class="color">
										<path d="M12,48V58c0,0.3-0.2,0.5-0.5,0.5H7.7c-0.3,0-0.5-0.2-0.5-0.5V48V37.9c0-0.3,0.2-0.5,0.5-0.5h3.8
											c0.3,0,0.5,0.2,0.5,0.5V48z"/>
										<path d="M59.1,48V58c0,0.3,0.2,0.5,0.5,0.5h3.8c0.3,0,0.5-0.2,0.5-0.5V48V37.9c0-0.3-0.2-0.5-0.5-0.5h-3.8
											c-0.3,0-0.5,0.2-0.5,0.5V48z"/>
										<path d="M35.6,61.8c3.8,0,7.3-1.5,9.8-4c1.6-1.6,3.9-2.5,6.2-2.5h4.6c0.3,0,0.5-0.2,0.5-0.5V41c0-0.3-0.2-0.5-0.5-0.5
											h-4.7c-2.3,0-4.5-1-6.1-2.6c-0.8-0.8-1.7-1.5-2.7-2h-6.9h-6.9c-1,0.6-1.9,1.2-2.7,2c-1.7,1.6-3.8,2.6-6.1,2.6h-4.7
											c-0.3,0-0.5,0.2-0.5,0.5v13.9c0,0.3,0.2,0.5,0.5,0.5h4.5c2.3,0,4.5,0.9,6.2,2.5C28.3,60.3,31.8,61.8,35.6,61.8"/>
										<path d="M56.5,11.1L35.6,7.2l-20.9,3.9c-0.3,0-0.5,0.2-0.5,0.5v2.2c0,0.3,0.2,0.5,0.5,0.5h13c0.3,0,0.6,0.1,0.9,0.3
											l3.4,8.8c0.3,0.2,0.5,0.6,0.5,1v2.2c0,0.5-0.4,0.9-0.9,0.9h-2.3c-0.3,0-0.5,0.2-0.5,0.5v4.6c0,0.3,0.2,0.5,0.5,0.5h6.2h6.2
											c0.3,0,0.5-0.2,0.5-0.5v-4.6c0-0.3-0.2-0.5-0.6-0.5h-2.3c-0.5,0-0.9-0.4-0.9-0.9v-2.2c0-0.4,0.2-0.8,0.5-1l3.4-8.8
											c0.3-0.2,0.6-0.3,0.9-0.3h13c0.3,0,0.5-0.2,0.5-0.5v-2.2C57,11.3,56.8,11.1,56.5,11.1"/>
									</g>
								</g>
								<g class="placeholder">
									<g class="overlay-container" fill="none">
										<path d="M63.7,69H7.3c-4,0-7.3-3.3-7.3-7.3V7.3C0,3.3,3.3,0,7.3,0h56.5c4,0,7.3,3.3,7.3,7.3v54.4C71,65.7,67.7,69,63.7,69z"/>
									</g>
									<g class="alarm-container" fill="none">
										<path d="M64.1,2c2.9,0,5.3,2.4,5.3,5.3v54.4c0,2.9-2.4,5.3-5.3,5.3H7.6c-2.9,0-5.3-2.4-5.3-5.3V7.3C2.3,4.4,4.8,2,7.6,2H64.1 M64.1,0H7.6c-4,0-7.3,3.3-7.3,7.3v54.4c0,4,3.3,7.3,7.3,7.3h56.5c4,0,7.3-3.3,7.3-7.3V7.3C71.3,3.3,68.1,0,64.1,0L64.1,0z"/>
									</g>
								</g>
							</svg>

							<svg class="vertical-valve" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 69 71" preserveAspectRatio="xMinYMin meet">
								<g class="elem">
									<g class="unactive-color">
										<path d="M48,59h10.1c0.3,0,0.5,0.2,0.5,0.5v3.8c0,0.3-0.2,0.5-0.5,0.5H48H38c-0.3,0-0.5-0.2-0.5-0.5v-3.8
											c0-0.3,0.2-0.5,0.5-0.5H48z"/>
										<path d="M48,12h10.1c0.3,0,0.5-0.2,0.5-0.5V7.6c0-0.3-0.2-0.5-0.5-0.5H48H38c-0.3,0-0.5,0.2-0.5,0.5v3.8
											c0,0.3,0.2,0.5,0.5,0.5h10V12z"/>
										<path d="M62,35.5c0-3.8-1.5-7.3-4-9.8c-1.6-1.6-2.5-3.9-2.5-6.2V15c0-0.3-0.2-0.5-0.5-0.5H41.1
											c-0.3,0-0.5,0.2-0.5,0.5v4.7c0,2.3-1,4.5-2.6,6.1c-0.8,0.8-1.5,1.7-2,2.7v6.9v6.9c0.6,1,1.2,1.9,2,2.7c1.6,1.7,2.6,3.8,2.6,6.1V56
											c0,0.3,0.2,0.5,0.5,0.5H55c0.3,0,0.5-0.2,0.5-0.5v-4.5c0-2.3,0.9-4.5,2.5-6.2C60.5,42.8,62,39.3,62,35.5"/>
										<path d="M11.3,14.6L7.4,35.5l3.9,20.9c0,0.3,0.2,0.5,0.5,0.5H14c0.3,0,0.5-0.2,0.5-0.5v-13c0-0.3,0.1-0.6,0.3-0.9
											l8.8-3.4c0.2-0.3,0.6-0.5,1-0.5h2.2c0.5,0,0.9,0.4,0.9,0.9v2.3c0,0.3,0.2,0.5,0.5,0.5h4.6c0.3,0,0.5-0.2,0.5-0.5v-6.2v-6.2
											c0-0.3-0.2-0.5-0.5-0.5h-4.6c-0.3,0-0.5,0.2-0.5,0.6v2.3c0,0.5-0.4,0.9-0.9,0.9h-2.2c-0.4,0-0.8-0.2-1-0.5l-8.8-3.4
											c-0.2-0.3-0.3-0.6-0.3-0.9v-13c0-0.3-0.2-0.5-0.5-0.5h-2.2C11.5,14.1,11.3,14.3,11.3,14.6"/>
									</g>
									<g class="color">
										<path d="M48,59h10.1c0.3,0,0.5,0.2,0.5,0.5v3.8c0,0.3-0.2,0.5-0.5,0.5H48H38c-0.3,0-0.5-0.2-0.5-0.5v-3.8
											c0-0.3,0.2-0.5,0.5-0.5H48z"/>
										<path d="M48,12h10.1c0.3,0,0.5-0.2,0.5-0.5V7.6c0-0.3-0.2-0.5-0.5-0.5H48H38c-0.3,0-0.5,0.2-0.5,0.5v3.8
											c0,0.3,0.2,0.5,0.5,0.5h10V12z"/>
										<path d="M62,35.5c0-3.8-1.5-7.3-4-9.8c-1.6-1.6-2.5-3.9-2.5-6.2V15c0-0.3-0.2-0.5-0.5-0.5H41.1
											c-0.3,0-0.5,0.2-0.5,0.5v4.7c0,2.3-1,4.5-2.6,6.1c-0.8,0.8-1.5,1.7-2,2.7v6.9v6.9c0.6,1,1.2,1.9,2,2.7c1.6,1.7,2.6,3.8,2.6,6.1V56
											c0,0.3,0.2,0.5,0.5,0.5H55c0.3,0,0.5-0.2,0.5-0.5v-4.5c0-2.3,0.9-4.5,2.5-6.2C60.5,42.8,62,39.3,62,35.5"/>
										<path d="M11.3,14.6L7.4,35.5l3.9,20.9c0,0.3,0.2,0.5,0.5,0.5H14c0.3,0,0.5-0.2,0.5-0.5v-13c0-0.3,0.1-0.6,0.3-0.9
											l8.8-3.4c0.2-0.3,0.6-0.5,1-0.5h2.2c0.5,0,0.9,0.4,0.9,0.9v2.3c0,0.3,0.2,0.5,0.5,0.5h4.6c0.3,0,0.5-0.2,0.5-0.5v-6.2v-6.2
											c0-0.3-0.2-0.5-0.5-0.5h-4.6c-0.3,0-0.5,0.2-0.5,0.6v2.3c0,0.5-0.4,0.9-0.9,0.9h-2.2c-0.4,0-0.8-0.2-1-0.5l-8.8-3.4
											c-0.2-0.3-0.3-0.6-0.3-0.9v-13c0-0.3-0.2-0.5-0.5-0.5h-2.2C11.5,14.1,11.3,14.3,11.3,14.6"/>
									</g>
								</g>
								<g class="placeholder">
									<g class="overlay-container" fill="none">
										<path d="M61.9,71H7.3c-4,0-7.3-3.3-7.3-7.3V7.3C0,3.3,3.3,0,7.3,0h54.6c4,0,7.3,3.3,7.3,7.3v56.4C69.2,67.7,65.9,71,61.9,71z"/>
									</g>
									<g class="alarm-container" fill="none">
										<path d="M61.9,2c2.9,0,5.3,2.4,5.3,5.3v56.4c0,2.9-2.4,5.3-5.3,5.3H7.3C4.4,69,2,66.6,2,63.7V7.3C2,4.4,4.4,2,7.3,2H61.9 M61.9,0H7.3C3.3,0,0,3.3,0,7.3v56.4c0,4,3.3,7.3,7.3,7.3h54.6c4,0,7.3-3.3,7.3-7.3V7.3C69.2,3.3,65.9,0,61.9,0L61.9,0z"/>
									</g>
								</g>
							</svg>
							<caption-elem class="another-valve-caption" id="0"></caption-elem>
						</div>
					</div>`;
		}
		static get style() {
			return `
			.another-valve-elem {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				width: 100%;
				box-sizing: border-box;
				overflow: hidden;
			}
			.another-valve-elem .percent-container {
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
			.another-valve-elem .percent-container.unactive {
				visibility: hidden;
			}
			.another-valve-elem .percent-container.active {
				visibility: visible;
			}
			.another-valve-elem .percent-container .inside-wrapper {
				position: relative;
				text-align: center;
				margin: 0 auto;
			}
			.another-valve-elem .percent-container .percent-val {
				display: inline;
				box-sizing: border-box;
				font-family: 'Ubuntu Condensed', sans-serif;
				font-size: var(--sys-numvalue-fontsize);
				line-height: var(--sys-numvalue-lineheight);
				color: var(--tit-name-cont-txt-color);
				white-space: nowrap;
			}
			.another-valve-elem .percent-container .arrow {
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
			.another-valve-elem .cont {
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
			}
			.another-valve-elem.horizontal .cont {
				flex-direction: column;
			}
			.another-valve-elem.vertical .cont {
				flex-direction: row;
			}
			.another-valve-elem .cont svg {
				display: none;
			}
			.another-valve-elem.horizontal .cont svg.active {
				display: block;
				max-width: 100%;
				min-height: 69px;
			}
			.another-valve-elem.vertical .cont svg.active {
				display: block;
				max-height: 100%;
				min-width: 69px;
			}
			.another-valve-elem .cont svg .elem .unactive-color {
				fill: var(--underlayer-default-color);
			}
			.another-valve-elem .cont svg .elem .color {
				fill: var(--underlayer-default-color);
				z-index: 1;
			}
			.another-valve-elem .cont svg .elem.default {
				stroke: none;
			}
			.another-valve-elem .cont svg .placeholder .alarm-container.default {
				fill: none;
			}
			.another-valve-elem .cont svg .placeholder .alarm-container.error {
				fill: var(--num-value-linecolor-awful);
			}
			.another-valve-elem .cont svg .placeholder .alarm-container.unknown {
				fill: var(--underlayer-default-color);
			}
			.another-valve-elem .cont svg .placeholder .visible {
				fill: var(--sys-unavailable-color);
			}
			.another-valve-elem .cont svg .placeholder .invisible {
				fill: none;
			}
			.another-valve-elem .cont svg .placeholder .overlay-container.visible {
				fill: var(--sys-unavailable-color);
			}
			.another-valve-elem .cont svg .placeholder .overlay-container.invisible {
				fill: none;
			}
			`;
		}

		onConnected() {
		}
	
		onDisconnected() {
		}
	
		static get observedAttributes() {
			return ['_dcurrentpercent', '_dcurrentval', '_sfontsize', '_scaption', '_svalveorient', '_scolor', '_sshowpercent'];
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
			let theElemCont = this.shadowRoot.querySelector('.another-valve-elem');
			let percentBlock = theElemCont.querySelector('.percent-container');
			let valveCont = theElemCont.querySelectorAll('.cont svg');
			let hValve = theElemCont.querySelector('.cont .horizontal-valve');
			let vValve = theElemCont.querySelector('.cont .vertical-valve');
			let captionElem = theElemCont.querySelector('.cont .another-valve-caption');
			let captionText = captionElem.shadowRoot.querySelector('.text-displayer');
	
			if (captionElem !== null) {
				captionElem._scaption = this._scaption;
				captionElem._sfontsize = this._sfontsize;
				captionElem.UpdateStatic();
			}
	
			
			switch(this._svalveorient.value) {
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
			this.onUpdateDynamic();
	
			let w = this.offsetWidth;
			let txtWidth = captionText.offsetWidth;
			let imageW;
			let imageH;
			valveCont.forEach(elem => {
				if (elem.classList.contains('active')) {
					imageW = Number(elem.getBBox().width.toFixed(1));
					imageH = Number(elem.getBBox().height.toFixed(1));
				}
			})
	
			if (this._scaption.value !== null) {
				if (theElemCont.classList.contains('horizontal')) {
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
				else if (theElemCont.classList.contains('vertical')) {
					captionElem.style.width = txtWidth + 'px';
					this.style.width = imageW + captionElem.offsetWidth + 5 + 'px';
					this.style.height = imageH + 'px';
				}
			} 
			else {
				if (theElemCont.classList.contains('horizontal')) {
					this.style.width = imageW + 'px';
					this.style.height = imageH + 'px';
				} else if (theElemCont.classList.contains('vertical')) {
					this.style.height = imageW + 'px';
					this.style.width = imageH + 'px';
				}
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

			let activeElem = theElemCont.querySelector('.cont svg.active .elem');
			activeElem.querySelector('.color').style.fill = this.getActiveColor(this._scolor.value);
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.another-valve-elem');
		let stateVal = parseValue(this._dcurrentval.value);
		let percentBlock = theElemCont.querySelector('.percent-container');
		let percentCont = percentBlock.querySelector('.percent-val');
		let percentVal = parseValue(this._dcurrentpercent.value);
		let captionElem = theElemCont.querySelector('.cont .valve-n-caption');
		let valveCont = theElemCont.querySelectorAll('.cont svg');
		let element;
		let colorLayer;
		let alarmContainer;
		let overlayContainer;
		let colorPercent;

		valveCont.forEach(elem => {
			if (elem.classList.contains('active')) {
				element = elem.querySelector('.elem');
				colorLayer = element.querySelector('.color');
				alarmContainer = elem.querySelector('.alarm-container');
				overlayContainer = elem.querySelector('.overlay-container');

				colorLayer.style.opacity = 0;

				if(this._dcurrentpercent.value) {
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
							colorPercent = percentVal.toFixed(1);
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
			}
			
		});

		function parseValue(a) {
			let result;

			if ((a === undefined) || (a === '') || (a === 'undefined') || (a === null)) {
				result = NaN;
			} else {
				result = '' + a;
				result = result.replace(',', '.');
				result = parseFloat(result);
			}

			return result;
		}

		if (captionElem !== null) {
			if (this.getAttribute('id') == null) {
				captionElem.removeAttribute('id');
				captionElem.UpdateStatic();
			}
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.another-valve-elem');

		this.AddTooltip(theElemCont, {});
	}
})