register("container-water-pump-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Текст");

	_dcurrentval = new Parameter(Type.Numeric, "Cостояние активности");

	static get markup() {
		return `
		<div class="container-water-pump-elem">
			<div class="cont">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 91" preserveAspectRatio="xMinYMin meet">
					<g class="elem">
						<g class="unactive-color">
							<path class="cls-3" d="M38,42.2c-12.9,0-23.4,10.1-23.4,22.6S25.1,87.4,38,87.4,61.4,77.3,61.4,64.8,51,42.2,38,42.2Zm0,29.4a6.81,6.81,0,1,1,7.1-6.8A6.94,6.94,0,0,1,38,71.6Z"/>
							<path class="cls-3" d="M24.1,3.4h11a.65.65,0,0,1,.6.6V8a.65.65,0,0,1-.6.6h-22a.65.65,0,0,1-.6-.6V4a.65.65,0,0,1,.6-.6Z"/>
							<path class="cls-3" d="M16,49.9c3.2-4.7,9.1-8.3,16.3-9.8l-.1-28.6c0-.2-.3-.4-.6-.4l-15.2.1c-.3,0-.6.2-.6.4L16,49.9"/>
							<g class="inners">
								<ellipse class="circle-outside" cx="38" cy="64.8" rx="1.9" ry="1.8"/>
							</g>
						</g>
						<g class="color">
							<path class="cls-3" d="M38,42.2c-12.9,0-23.4,10.1-23.4,22.6S25.1,87.4,38,87.4,61.4,77.3,61.4,64.8,51,42.2,38,42.2Zm0,29.4a6.81,6.81,0,1,1,7.1-6.8A6.94,6.94,0,0,1,38,71.6Z"/>
							<path class="cls-3" d="M24.1,3.4h11a.65.65,0,0,1,.6.6V8a.65.65,0,0,1-.6.6h-22a.65.65,0,0,1-.6-.6V4a.65.65,0,0,1,.6-.6Z"/>
							<path class="cls-3" d="M16,49.9c3.2-4.7,9.1-8.3,16.3-9.8l-.1-28.6c0-.2-.3-.4-.6-.4l-15.2.1c-.3,0-.6.2-.6.4L16,49.9"/>
							<g class="inners">
								<ellipse class="circle-outside" cx="38" cy="64.8" rx="1.9" ry="1.8"/>
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
				<caption-elem class="water-pump-caption" id="0"></caption-elem>
			</div>
		</div>
		`;
	}

	static get style() {
		return `
		.container-water-pump-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.container-water-pump-elem .cont {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: rgba(204, 204, 219, 0.4);
			border-radius: 5px;
			padding: 3.7% 9%;
			box-sizing: border-box;
		}
		.container-water-pump-elem .cont svg {
			max-width: 100%;
		}
		.container-water-pump-elem .cont svg .elem .unactive-color {
			fill: var(--main-object-fill-color);
		}
		.container-water-pump-elem .cont svg .elem .color {
			fill: var(--main-object-fill-color);
		}
		.container-water-pump-elem .cont svg .elem .unactive-color .inners .circle-outside {
			fill: var(--main-object-fill-color);
		}
		.container-water-pump-elem .cont svg .elem .color .inners .circle-outside {
			fill: var(--main-object-fill-color);
		}
		.container-water-pump-elem .cont svg .placeholder .visible {
			fill: var(--sys-unavailable-color);
		}
		.container-water-pump-elem .cont svg .placeholder .invisible {
			fill: none;
		}
		.container-water-pump-elem .cont svg .elem.default {
			stroke: none;
		}
		.container-water-pump-elem .cont svg .placeholder .alarm-container.default {
			fill: none;
		}
		.container-water-pump-elem .cont svg .placeholder .alarm-container.error {
			fill: var(--num-value-linecolor-awful);
		}
		.container-water-pump-elem .cont svg .placeholder .alarm-container.unknown {
			fill: var(--underlayer-default-color);
		}
		.container-water-pump-elem .cont svg .placeholder .overlay-container.visible {
			fill: var(--sys-unavailable-color);
		}
		.container-water-pump-elem .cont svg .placeholder .overlay-container.invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentval', '_scaption', '_sfontsize', '_scolor'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.container-water-pump-elem');
		let coloringPump = theElemCont.querySelector('.cont svg .color');
		let circle = theElemCont.querySelector('.cont svg .color .inners .circle-outside');
		let captionElem = theElemCont.querySelector('.cont .water-pump-caption');
		let captionText = captionElem.shadowRoot.querySelector('.caption-elem .text-displayer');
		
		if (captionElem) {
			captionElem._scaption = this._scaption;
			captionElem._sfontsize = this._sfontsize;
			captionElem.UpdateStatic();
		}

		coloringPump.style.fill = circle.style.fill = this.getActiveColor(this._scolor.value);
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.container-water-pump-elem');
		let val = parseValue(this._dcurrentval.value);
		let captionElem = theElemCont.querySelector('.cont .water-pump-caption');
		let pumpCont = theElemCont.querySelector('.cont svg');
		let colorLayer;
		let circle;
		let alarmContainer;
		let overlayContainer;
		
		colorLayer = pumpCont.querySelector('.color');
		circle = colorLayer.querySelector('.inners .circle-outside');
		alarmContainer = pumpCont.querySelector('.alarm-container');
		overlayContainer = pumpCont.querySelector('.overlay-container');
	
		let opacity = 0;

		if (isNaN(val)) {
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

				colorLayer.classList.add('default');
				colorLayer.classList.remove('error');

				opacity = 1;
			} else if (val == -1) {
				//ошибка
				alarmContainer.classList.add('error');
				alarmContainer.classList.remove('unknown');
				alarmContainer.classList.remove('default');

				overlayContainer.classList.add('visible');
				overlayContainer.classList.remove('invisible');

				colorLayer.classList.add('error');
				colorLayer.classList.remove('default');
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

		colorLayer.style.opacity = '' + opacity + '';

		if (this.getAttribute('id') == null) {
			captionElem.removeAttribute('id');
			captionElem.UpdateStatic();
		}

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
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.container-water-pump-elem');

		this.AddTooltip(theElemCont, {});
	}
})