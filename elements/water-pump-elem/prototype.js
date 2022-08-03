register("water-pump-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Текст");
	_spumporient = new Parameter(Type.String, "Положение насоса, h - горизонтальное, v - вертикальное");

	_dcurrentval = new Parameter(Type.Numeric, "Cостояние активности");

	static get markup() {
		return `
		<div class="water-pump-elem">
			<div class="cont">
				<svg class="horizontal-pump" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 79" preserveAspectRatio="xMinYMin meet">
					<g class="elem">
						<g class="unactive-color">
							<path d="M19.75,7.1h12.1c0.4,0,0.7,0.3,0.7,0.7v4.6c0,0.4-0.3,0.7-0.7,0.7h-12.1H7.65c-0.4,0-0.7-0.3-0.7-0.7V7.8c0-0.4,0.3-0.7,0.7-0.7C7.65,7.1,19.75,7.1,19.75,7.1z"/>
							<ellipse cx="36.55" cy="45.8" rx="25.7" ry="26.1"/>
							<path d="M10.75,33c3.6-7.4,10.1-12.9,18-15.2v-0.7c0-0.4-0.3-0.7-0.7-0.7h-16.6c-0.4,0-0.7,0.3-0.7,0.7V33"/>
							<g class="inners">
								<ellipse class="circle-inside" cx="36.55" cy="45.8" rx="7.7" ry="7.8"/>
								<ellipse class="circle-outside" cx="36.55" cy="45.8" rx="2.1" ry="2.1"/>
							</g>
						</g>
						<g class="color">
							<path d="M19.75,7.1h12.1c0.4,0,0.7,0.3,0.7,0.7v4.6c0,0.4-0.3,0.7-0.7,0.7h-12.1H7.65c-0.4,0-0.7-0.3-0.7-0.7V7.8c0-0.4,0.3-0.7,0.7-0.7C7.65,7.1,19.75,7.1,19.75,7.1z"/>
							<ellipse cx="36.55" cy="45.8" rx="25.7" ry="26.1"/>
							<path d="M10.75,33c3.6-7.4,10.1-12.9,18-15.2v-0.7c0-0.4-0.3-0.7-0.7-0.7h-16.6c-0.4,0-0.7,0.3-0.7,0.7V33"/>
							<g class="inners">
								<ellipse class="circle-inside" cx="36.55" cy="45.8" rx="7.7" ry="7.8"/>
								<ellipse class="circle-outside" cx="36.55" cy="45.8" rx="2.1" ry="2.1"/>
							</g>
						</g>
					</g>
					<g class="placeholder">
						<g class="overlay-container" fill="none">
							<path d="M65.61,79H4.39C2,79,0,76.9,0,74.3V4.7C0,2.1,2,0,4.39,0h61.21C68,0,70,2.1,70,4.7v69.7C70,76.9,68,79,65.61,79z"/>
						</g>
						<g class="alarm-container" fill="none">
							<path d="M65.61,2C66.9,2,68,3.24,68,4.7v69.7c0,1.41-1.1,2.6-2.39,2.6H4.39C3.1,77,2,75.76,2,74.3V4.7C2,3.24,3.1,2,4.39,2H65.61 M65.61,0H4.39C2,0,0,2.1,0,4.7v69.6C0,76.9,2,79,4.39,79h61.21C68,79,70,76.9,70,74.4V4.7C70,2.1,68,0,65.61,0L65.61,0z"/>
						</g>
					</g>
				</svg>
				<svg class="vertical-pump" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79 70" preserveAspectRatio="xMinYMin meet">
					<g class="elem">
						<g class="unactive-color">
							<path d="M7.95,50.4V38.3c0-0.4,0.3-0.7,0.7-0.7h4.6c0.4,0,0.7,0.3,0.7,0.7v12.1v12.1c0,0.4-0.3,0.7-0.7,0.7h-4.6c-0.4,0-0.7-0.3-0.7-0.7V50.4z"/>
							<ellipse cx="46.65" cy="33.6" rx="26.1" ry="25.7"/>
							<path d="M33.85,59.4c-7.4-3.6-12.9-10.1-15.2-18h-0.7c-0.4,0-0.7,0.3-0.7,0.7v16.7c0,0.4,0.3,0.7,0.7,0.7L33.85,59.4"/>
							<g class="inners">
								<ellipse class="circle-inside" cx="46.65" cy="33.6" rx="7.8" ry="7.7"/>
								<ellipse class="circle-outside" cx="46.65" cy="33.6" rx="2.1" ry="2.1"/>
							</g>
						</g>
						<g class="color">
							<path d="M7.95,50.4V38.3c0-0.4,0.3-0.7,0.7-0.7h4.6c0.4,0,0.7,0.3,0.7,0.7v12.1v12.1c0,0.4-0.3,0.7-0.7,0.7h-4.6c-0.4,0-0.7-0.3-0.7-0.7V50.4z"/>
							<ellipse cx="46.65" cy="33.6" rx="26.1" ry="25.7"/>
							<path d="M33.85,59.4c-7.4-3.6-12.9-10.1-15.2-18h-0.7c-0.4,0-0.7,0.3-0.7,0.7v16.7c0,0.4,0.3,0.7,0.7,0.7L33.85,59.4"/>
							<g class="inners">
								<ellipse class="circle-inside" cx="46.65" cy="33.6" rx="7.8" ry="7.7"/>
								<ellipse class="circle-outside" cx="46.65" cy="33.6" rx="2.1" ry="2.1"/>
							</g>
						</g>
					</g>
					<g class="placeholder">
						<g class="overlay-container" fill="none">
							<path d="M74.17,70H4.93C2.21,70,0,68.09,0,65.89V4.11C0,1.91,2.21,0,4.93,0h69.13C76.78,0,79,1.91,79,4.11v61.68C79.1,68.09,76.88,70,74.17,70z"/>
						</g>
						<g class="alarm-container" fill="none">
							<path d="M74.07,2C75.74,2,77,3.11,77,4.11v61.68v0.04l0,0.04c0.02,0.54-0.26,0.96-0.51,1.22C75.95,67.66,75.08,68,74.17,68H4.93C3.25,68,2,66.89,2,65.89V4.11C2,3.11,3.25,2,4.93,2H74.07 M74.07,0H4.93C2.21,0,0,1.91,0,4.11v61.78C0,68.09,2.21,70,4.93,70h69.24c2.72,0,4.93-1.91,4.83-4.21V4.11C79,1.91,76.78,0,74.07,0L74.07,0z"/>
						</g>
					</g>
				</svg>
				<caption-elem class="water-pump-caption" id="0"></caption-elem>
			</div>
		</div>
		`;
	}

	static get style() {
		return `
		.water-pump-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.water-pump-elem .cont {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}
		.water-pump-elem.horizontal .cont {
			flex-direction: column;
		}
		.water-pump-elem.vertical .cont {
			flex-direction: row;
		}
		.water-pump-elem .cont svg {
			display: none;
		}
		.water-pump-elem.horizontal .cont svg.active {
			display: block;
			max-width: 100%;
		}
		.water-pump-elem.vertical .cont svg.active {
			display: block;
			max-height: 100%;
		}
		.water-pump-elem.horizontal .cont .water-pump-caption.no-caption,
		.water-pump-elem.vertical .cont .water-pump-caption.no-caption {
			margin: 0;
		}
		.water-pump-elem .cont svg .elem .unactive-color {
			fill: var(--underlayer-default-color);
		}
		.water-pump-elem .cont svg .elem .color {
			fill: var(--underlayer-default-color);
		}
		.water-pump-elem .cont svg .elem .unactive-color .inners .circle-inside {
			fill: rgba(234, 234, 234, 1);
		}
		.water-pump-elem .cont svg .elem .unactive-color .inners .circle-outside {
			fill: var(--underlayer-default-color);
		}
		.water-pump-elem .cont svg .elem .color .inners .circle-inside {
			fill: rgba(234, 234, 234, 1);
		}
		.water-pump-elem .cont svg .elem .color .inners .circle-outside {
			fill: var(--underlayer-default-color);
		}
		.water-pump-elem .cont svg .placeholder .visible {
			fill: var(--sys-unavailable-color);
		}
		.water-pump-elem .cont svg .placeholder .invisible {
			fill: none;
		}
		.water-pump-elem .cont svg .elem.default {
			stroke: none;
		}
		.water-pump-elem .cont svg .placeholder .alarm-container.default {
			fill: none;
		}
		.water-pump-elem .cont svg .placeholder .alarm-container.error {
			fill: var(--num-value-linecolor-awful);
		}
		.water-pump-elem .cont svg .placeholder .overlay-container.visible {
			fill: var(--sys-unavailable-color);
		}
		.water-pump-elem .cont svg .placeholder .overlay-container.invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentval', '_scaption', '_spumporient', '_sfontsize'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.water-pump-elem');
		let pumpCont = theElemCont.querySelectorAll('.cont svg');
		let hPump = theElemCont.querySelector('.cont .horizontal-pump');
		let vPump = theElemCont.querySelector('.cont .vertical-pump');
		let captionElem = theElemCont.querySelector('.cont .water-pump-caption');
		let captionText = captionElem.shadowRoot.querySelector('.caption-elem .text-displayer');

		if (captionElem !== null) {
			captionElem._scaption = this._scaption;
			captionElem._sfontsize = this._sfontsize;
			captionElem.UpdateStatic();
		}

		if (this._spumporient.value == undefined || this._spumporient.value == '')
			this._spumporient.value = 'h';

			switch(this._spumporient.value) {
			case 'h': 
				theElemCont.classList.add('horizontal');
				theElemCont.classList.remove('vertical');
				hPump.classList.add('active');
				vPump.classList.remove('active');
				break;
			case 'v':
				theElemCont.classList.add('vertical');
				theElemCont.classList.remove('horizontal');
				hPump.classList.remove('active');
				vPump.classList.add('active');
				break;
			default:
				theElemCont.classList.add('horizontal');
				hPump.classList.add('active');
				break;
		}
		this.onUpdateDynamic();
		
		let w = this.offsetWidth;
		let txtWidth = captionText.offsetWidth;
		let imageW;
		let imageH;
		pumpCont.forEach(elem => {
			if (elem.classList.contains('active')) {
				imageW = Number(elem.getBBox().width.toFixed(1));
				imageH = Number(elem.getBBox().height.toFixed(1));
			}
		})

		if (this._scaption.value !== null) {
			captionElem.classList.add('caption');
			captionElem.classList.remove('no-caption');
			if (theElemCont.classList.contains('horizontal')) {
				this.style.width = imageW + 'px';
				w = imageW;
				if (txtWidth > w) {
					captionElem.style.width = txtWidth + 'px';
					this.style.width = txtWidth + 'px';
				} else {
					this.style.width = w + 'px';
					captionElem.style.width = w + 'px';
				}
				captionElem.style.marginTop = '2.5px';
				captionElem.style.marginLeft = '0';
				this.style.height = imageH + captionElem.offsetHeight + 2.5 + 'px';
			} else if (theElemCont.classList.contains('vertical')) {
				captionElem.style.width = txtWidth + 'px';
				captionElem.style.marginTop = '0';
				captionElem.style.marginLeft = '2.5px';
				this.style.width = imageW + captionElem.offsetWidth + 2.5 + 'px';
				this.style.height = imageH + 'px';
			}
		} else {
			captionElem.classList.add('no-caption');
			captionElem.classList.remove('caption');
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

		let activePump = theElemCont.querySelector('.cont svg.active .color');
		let circle = activePump.querySelector('.inners .circle-outside');
		activePump.style.fill = circle.style.fill = this.getActiveColor(this._scolor.value);
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.water-pump-elem');
		let val = parseValue(this._dcurrentval.value);
		let captionElem = theElemCont.querySelector('.cont .water-pump-caption');
		let pumpCont = theElemCont.querySelectorAll('.cont svg');
		let colorLayer;
		let circle;
		let alarmContainer;
		let overlayContainer;
		
		pumpCont.forEach(elem => {
			if (elem.classList.contains('active')) {
				colorLayer = elem.querySelector('.color');
				circle = colorLayer.querySelector('.inners .circle-outside');
				alarmContainer = elem.querySelector('.alarm-container');
				overlayContainer = elem.querySelector('.overlay-container');
			
				let opacity = 0;

				if (isNaN(val)) {
					//нет сигнала
					alarmContainer.classList.add('default');
					alarmContainer.classList.remove('error');

					overlayContainer.classList.add('visible');
					overlayContainer.classList.remove('invisible');

					colorLayer.classList.add('default');
					colorLayer.classList.remove('error');
				} else {
					if (val == 0) {
						//закрыто
						alarmContainer.classList.add('default');
						alarmContainer.classList.remove('error');

						overlayContainer.classList.add('invisible');
						overlayContainer.classList.remove('visible');

						colorLayer.classList.add('default');
						colorLayer.classList.remove('error');
					} else if (val == 1) {
						//открыто
						alarmContainer.classList.add('default');
						alarmContainer.classList.remove('error');

						overlayContainer.classList.add('invisible');
						overlayContainer.classList.remove('visible');

						opacity = 1;

						colorLayer.classList.add('default');
						colorLayer.classList.remove('error');
					} else if (val == -1) {
						//ошибка
						alarmContainer.classList.add('error');
						alarmContainer.classList.remove('default');

						overlayContainer.classList.add('visible');
						overlayContainer.classList.remove('invisible');

						colorLayer.classList.add('error');
						colorLayer.classList.remove('default');
					} else {
						//нет сигнала
						alarmContainer.classList.add('default');
						alarmContainer.classList.remove('error');

						overlayContainer.classList.add('visible');
						overlayContainer.classList.remove('invisible');

						colorLayer.classList.add('default');
						colorLayer.classList.remove('error');
					}
				}

				colorLayer.style.opacity = '' + opacity + '';
			}
		})
		
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
		// this.UpdateStatic();
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.water-pump-elem');

		this.AddTooltip(theElemCont, {});
	}
})