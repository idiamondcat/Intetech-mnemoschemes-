register("pump-n-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Текст");
	_spumporient = new Parameter(Type.String, "Положение насоса, h - горизонтальное, v - вертикальное");

	_dcurrentval = new Parameter(Type.Numeric, "Cостояние активности");

	static get markup() {
		return `
		<div class="pump-n-elem">
			<div class="cont">
				<svg class="horizontal-pump" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91 73" preserveAspectRatio="xMinYMin meet">
					<g class="elem">
						<g class="unactive-color">
							<path d="M12.9,53.2V65.3a.68.68,0,0,1-.7.7H7.7a.68.68,0,0,1-.7-.7V41.1a.68.68,0,0,1,.7-.7h4.6a.68.68,0,0,1,.7.7Z"/>
							<path d="M84.2,19.8V31.9a.68.68,0,0,1-.7.7H78.9a.68.68,0,0,1-.7-.7V7.7A.85.85,0,0,1,79,7h4.6a.68.68,0,0,1,.7.7Z"/>
							<ellipse cx="45.6" cy="36.5" rx="26.1" ry="25.7"/>
							<path d="M32.9,62.2a29,29,0,0,1-15.2-18H17a.68.68,0,0,0-.7.7V61.6a.68.68,0,0,0,.7.7l15.9-.1"/>
							<path d="M58.3,10.8a29,29,0,0,1,15.2,18h.7a.68.68,0,0,0,.7-.7V11.4a.68.68,0,0,0-.7-.7l-15.9.1"/>
							<g class="inners">
								<ellipse class="circle-inside" cx="45.6" cy="36.5" rx="7.8" ry="7.7"/>
								<circle class="circle-outside" cx="45.6" cy="36.5" r="2.1"/>
							</g>
						</g>
						<g class="color">
							<path d="M12.9,53.2V65.3a.68.68,0,0,1-.7.7H7.7a.68.68,0,0,1-.7-.7V41.1a.68.68,0,0,1,.7-.7h4.6a.68.68,0,0,1,.7.7Z"/>
							<path d="M84.2,19.8V31.9a.68.68,0,0,1-.7.7H78.9a.68.68,0,0,1-.7-.7V7.7A.85.85,0,0,1,79,7h4.6a.68.68,0,0,1,.7.7Z"/>
							<ellipse cx="45.6" cy="36.5" rx="26.1" ry="25.7"/>
							<path d="M32.9,62.2a29,29,0,0,1-15.2-18H17a.68.68,0,0,0-.7.7V61.6a.68.68,0,0,0,.7.7l15.9-.1"/>
							<path d="M58.3,10.8a29,29,0,0,1,15.2,18h.7a.68.68,0,0,0,.7-.7V11.4a.68.68,0,0,0-.7-.7l-15.9.1"/>
							<g class="inners">
								<ellipse class="circle-inside" cx="45.6" cy="36.5" rx="7.8" ry="7.7"/>
								<circle class="circle-outside" cx="45.6" cy="36.5" r="2.1"/>
							</g>
						</g>
					</g>
					<g class="placeholder">
						<g class="overlay-container" fill="none">
							<path d="M86.8,73H4.2A4.23,4.23,0,0,1,0,68.8V4.2A4.23,4.23,0,0,1,4.2,0H86.8A4.23,4.23,0,0,1,91,4.2V68.8A4.23,4.23,0,0,1,86.8,73Z"/>
						</g>
						<g class="alarm-container" fill="none">
						<path d="M86.8,2A2.23,2.23,0,0,1,89,4.2V68.8A2.23,2.23,0,0,1,86.8,71H4.2A2.23,2.23,0,0,1,2,68.8V4.2A2.23,2.23,0,0,1,4.2,2H86.8m0-2H4.2A4.23,4.23,0,0,0,0,4.2V68.8A4.23,4.23,0,0,0,4.2,73H86.8A4.23,4.23,0,0,0,91,68.8V4.2A4.23,4.23,0,0,0,86.8,0Z"/>
						</g>
					</g>
				</svg>
				<svg class="vertical-pump" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 91" preserveAspectRatio="xMinYMin meet">
					<g class="elem">
						<g class="unactive-color">
							<path d="M53.4,78.2H65.5a.68.68,0,0,1,.7.7v4.6a.68.68,0,0,1-.7.7H41.3a.68.68,0,0,1-.7-.7V78.9a.68.68,0,0,1,.7-.7Z"/>
							<path d="M19.9,6.9H32a.68.68,0,0,1,.7.7v4.6a.68.68,0,0,1-.7.7H7.8a.68.68,0,0,1-.7-.7V7.6a.68.68,0,0,1,.7-.7Z"/>
							<ellipse cx="36.6" cy="45.5" rx="25.7" ry="26.1"/>
							<path d="M62.4,58.2a29,29,0,0,1-18,15.2v.7a.68.68,0,0,0,.7.7H61.8a.68.68,0,0,0,.7-.7l-.1-15.9"/>
							<path d="M10.9,32.8a29,29,0,0,1,18-15.2v-.7a.68.68,0,0,0-.7-.7H11.5a.68.68,0,0,0-.7.7l.1,15.9"/>
							<g class="inners">
								<ellipse class="circle-inside" cx="36.6" cy="45.5" rx="7.7" ry="7.8"/>
								<circle class="circle-outside" cx="36.6" cy="45.5" r="2.1"/>
							</g>
						</g>
						<g class="color">
							<path d="M53.4,78.2H65.5a.68.68,0,0,1,.7.7v4.6a.68.68,0,0,1-.7.7H41.3a.68.68,0,0,1-.7-.7V78.9a.68.68,0,0,1,.7-.7Z"/>
							<path d="M19.9,6.9H32a.68.68,0,0,1,.7.7v4.6a.68.68,0,0,1-.7.7H7.8a.68.68,0,0,1-.7-.7V7.6a.68.68,0,0,1,.7-.7Z"/>
							<ellipse cx="36.6" cy="45.5" rx="25.7" ry="26.1"/>
							<path d="M62.4,58.2a29,29,0,0,1-18,15.2v.7a.68.68,0,0,0,.7.7H61.8a.68.68,0,0,0,.7-.7l-.1-15.9"/>
							<path d="M10.9,32.8a29,29,0,0,1,18-15.2v-.7a.68.68,0,0,0-.7-.7H11.5a.68.68,0,0,0-.7.7l.1,15.9"/>
							<g class="inners">
								<ellipse class="circle-inside" cx="36.6" cy="45.5" rx="7.7" ry="7.8"/>
								<circle class="circle-outside" cx="36.6" cy="45.5" r="2.1"/>
							</g>
						</g>
					</g>
					<g class="placeholder">
						<g class="overlay-container" fill="none">
							<path d="M73,4.2V86.8A4.23,4.23,0,0,1,68.8,91H4.2A4.23,4.23,0,0,1,0,86.8V4.2A4.23,4.23,0,0,1,4.2,0H68.8A4.23,4.23,0,0,1,73,4.2Z"/>
						</g>
						<g class="alarm-container" fill="none">
							<path d="M68.8,2A2.23,2.23,0,0,1,71,4.2V86.8A2.23,2.23,0,0,1,68.8,89H4.2A2.23,2.23,0,0,1,2,86.8V4.2A2.23,2.23,0,0,1,4.2,2H68.8m0-2H4.2A4.23,4.23,0,0,0,0,4.2V86.8A4.23,4.23,0,0,0,4.2,91H68.8A4.23,4.23,0,0,0,73,86.8V4.2A4.23,4.23,0,0,0,68.8,0Z"/>
						</g>
					</g>
				</svg>
				<caption-elem class="pump-n-caption" id="0"></caption-elem>
			</div>
		</div>
		`;
	}

	static get style() {
		return `
		.pump-n-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.pump-n-elem .cont {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}
		.pump-n-elem.horizontal .cont {
			flex-direction: column;
		}
		.pump-n-elem.vertical .cont {
			flex-direction: row;
		}
		.pump-n-elem .cont svg {
			display: none;
		}
		.pump-n-elem.horizontal .cont svg.active {
			display: block;
			max-width: 100%;
			min-height: 73px;
		}
		.pump-n-elem.vertical .cont svg.active {
			display: block;
			max-height: 100%;
			min-width: 73px;
		}
		.pump-n-elem.horizontal .cont .pump-n-caption.no-caption,
		.pump-n-elem.vertical .cont .pump-n-caption.no-caption {
			margin: 0;
		}
		.pump-n-elem .cont svg .elem .unactive-color {
			fill: var(--underlayer-default-color);
		}
		.pump-n-elem .cont svg .elem .color {
			fill: var(--underlayer-default-color);
			z-index: 1;
		}
		.pump-n-elem .cont svg .elem .unactive-color .inners .circle-inside {
			fill: rgba(234, 234, 234, 1);
		}
		.pump-n-elem .cont svg .elem .unactive-color .inners .circle-outside {
			fill: var(--underlayer-default-color);
		}
		.pump-n-elem .cont svg .elem .color .inners .circle-inside {
			fill: rgba(234, 234, 234, 1);
		}
		.pump-n-elem .cont svg .elem .color .inners .circle-outside {
			fill: var(--underlayer-default-color);
		}
		.pump-n-elem .cont svg .placeholder .visible {
			fill: var(--sys-unavailable-color);
		}
		.pump-n-elem .cont svg .placeholder .invisible {
			fill: none;
		}
		.pump-n-elem .cont svg .elem.default {
			stroke: none;
		}
		.pump-n-elem .cont svg .placeholder .alarm-container.default {
			fill: none;
		}
		.pump-n-elem .cont svg .placeholder .alarm-container.error {
			fill: var(--num-value-linecolor-awful);
		}
		.pump-n-elem .cont svg .placeholder .alarm-container.unknown {
			fill: var(--underlayer-default-color);
		}
		.pump-n-elem .cont svg .placeholder .overlay-container.visible {
			fill: var(--sys-unavailable-color);
		}
		.pump-n-elem .cont svg .placeholder .overlay-container.invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentval', '_scaption', '_spumporient', '_sfontsize', '_scolor'];
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
		let theElemCont = this.shadowRoot.querySelector('.pump-n-elem');
		let pumpCont = theElemCont.querySelectorAll('.cont svg');
		let hPump = theElemCont.querySelector('.cont .horizontal-pump');
		let vPump = theElemCont.querySelector('.cont .vertical-pump');
		let captionElem = theElemCont.querySelector('.cont .pump-n-caption');
		let captionText = captionElem.shadowRoot.querySelector('.caption-elem .text-displayer');

		if (captionElem) {
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

		if (this._scaption.value) {
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

		let activePump = theElemCont.querySelector('.cont svg.active .elem .color');
		let circle = activePump.querySelector('.inners .circle-outside');
		activePump.style.fill = circle.style.fill = this.getActiveColor(this._scolor.value);
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.pump-n-elem');
		let val = parseInt(this._dcurrentval.value);
		let captionElem = theElemCont.querySelector('.cont .pump-n-caption');
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

				if (isNaN(val) || val == null) {
					//нет сигнала
					alarmContainer.classList.add('unknown');
					alarmContainer.classList.remove('default');
					alarmContainer.classList.remove('error');

					overlayContainer.classList.add('visible');
					overlayContainer.classList.remove('invisible');

					colorLayer.classList.add('default');
					colorLayer.classList.remove('error');
				} else {
					if (val == 0) {
						//закрыто
						alarmContainer.classList.add('default');
						alarmContainer.classList.remove('unknown');
						alarmContainer.classList.remove('error');

						overlayContainer.classList.add('invisible');
						overlayContainer.classList.remove('visible');

						colorLayer.classList.add('default');
						colorLayer.classList.remove('error');
					} else if (val == 1) {
						//открыто
						alarmContainer.classList.add('default');
						alarmContainer.classList.remove('unknown');
						alarmContainer.classList.remove('error');

						overlayContainer.classList.add('invisible');
						overlayContainer.classList.remove('visible');

						opacity = 1;

						colorLayer.classList.add('default');
						colorLayer.classList.remove('error');
					} else if (val == -1) {
						//ошибка
						alarmContainer.classList.add('error');
						alarmContainer.classList.remove('unknown');
						alarmContainer.classList.remove('default');

						overlayContainer.classList.add('visible');
						overlayContainer.classList.remove('invisible');

						colorLayer.classList.add('error');
						colorLayer.classList.remove('default');
					} else if (val == 2) {
						//переходное состояние
						alarmContainer.classList.add('default');
						alarmContainer.classList.remove('unknown');
						alarmContainer.classList.remove('error');

						overlayContainer.classList.add('visible');
						overlayContainer.classList.remove('invisible');

						colorLayer.classList.add('default');
						colorLayer.classList.remove('error');
					} else {
						//нет сигнала
						alarmContainer.classList.add('unknown');
						alarmContainer.classList.remove('default');
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

		if (captionElem) {
			if (!this.getAttribute('id')) {
				captionElem.removeAttribute('id');
				captionElem.UpdateStatic();
			}
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.pump-n-elem');

		this.AddTooltip(theElemCont, {});
	}
})