register("valve-elem", class extends SimpleElement {
	_scolor = new StaticParameter(Type.Color, "Цвет");

	_dcurrentval = new Parameter(Type.Numeric, "Состояние активности, 0-1");
	_dcurrentpercent = new Parameter(Type.Numeric, "Процент открытия, 0-100");


	static get markup() {/* массив имён атрибутов для отслеживания их изменений */
		// language=HTML
		return  `
		<div class="valve-elem">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.6 64.7" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="unactive-color">
						<path d="M11.8,43.8v10.1c0,0.3-0.2,0.5-0.5,0.5H7.5c-0.3,0-0.5-0.2-0.5-0.5V33.7c0-0.3,0.2-0.5,0.5-0.5h3.8c0.3,0,0.5,0.2,0.5,0.5
						V43.8z M58.9,43.8v10.1c0,0.3,0.2,0.5,0.5,0.5h3.8c0.3,0,0.5-0.2,0.5-0.5V33.7c0-0.3-0.2-0.5-0.5-0.5h-3.8c-0.3,0-0.5,0.2-0.5,0.5
						V43.8z M35.4,57.8c3.8,0,7.3-1.5,9.8-4c1.6-1.6,3.9-2.5,6.2-2.5h4.5c0.3,0,0.5-0.2,0.5-0.5v-14c0-0.3-0.2-0.5-0.5-0.5h-4.7
						c-2.3,0-4.5-1-6.1-2.6c-0.8-0.8-1.7-1.5-2.7-2H28.6c-1,0.6-1.9,1.2-2.7,2c-1.8,1.6-4,2.6-6.3,2.6h-4.7c-0.3,0-0.5,0.2-0.5,0.5
						v13.9c0,0.3,0.2,0.5,0.5,0.5h4.6c2.3,0,4.5,0.9,6.2,2.5C28.1,56.2,31.6,57.8,35.4,57.8 M56.3,7H14.5C14.2,7,14,7.2,14,7.5v2.2
						c0,0.3,0.2,0.5,0.5,0.5h3c0.3,0,0.6,0.1,0.9,0.3l13.4,8.8c0.3,0.2,0.5,0.6,0.5,1v2.2c0,0.5-0.4,0.9-0.9,0.9h-2.3
						c-0.3,0-0.5,0.2-0.5,0.5v4.6c0,0.3,0.2,0.5,0.5,0.5h12.5c0.3,0,0.5-0.2,0.5-0.5v-4.6c0-0.3-0.2-0.5-0.5-0.5h-2.3
						c-0.5,0-0.9-0.4-0.9-0.9v-2.2c0-0.4,0.2-0.8,0.5-1l13.4-8.8c0.3-0.2,0.6-0.3,0.9-0.3h3c0.3,0,0.5-0.2,0.5-0.5V7.6
						C56.8,7.3,56.6,7,56.3,7 M39.3,15.4c-0.2,0.2-0.5,0.2-0.8,0.2h-6.2c-0.3,0-0.6-0.1-0.8-0.2l-7.7-5.1H47
						C47,10.3,39.3,15.4,39.3,15.4z"/>
					</g>
					<g class="color">
						<path d="M11.8,43.8v10.1c0,0.3-0.2,0.5-0.5,0.5H7.5c-0.3,0-0.5-0.2-0.5-0.5V33.7c0-0.3,0.2-0.5,0.5-0.5h3.8c0.3,0,0.5,0.2,0.5,0.5
						V43.8z M58.9,43.8v10.1c0,0.3,0.2,0.5,0.5,0.5h3.8c0.3,0,0.5-0.2,0.5-0.5V33.7c0-0.3-0.2-0.5-0.5-0.5h-3.8c-0.3,0-0.5,0.2-0.5,0.5
						V43.8z M35.4,57.8c3.8,0,7.3-1.5,9.8-4c1.6-1.6,3.9-2.5,6.2-2.5h4.5c0.3,0,0.5-0.2,0.5-0.5v-14c0-0.3-0.2-0.5-0.5-0.5h-4.7
						c-2.3,0-4.5-1-6.1-2.6c-0.8-0.8-1.7-1.5-2.7-2H28.6c-1,0.6-1.9,1.2-2.7,2c-1.8,1.6-4,2.6-6.3,2.6h-4.7c-0.3,0-0.5,0.2-0.5,0.5
						v13.9c0,0.3,0.2,0.5,0.5,0.5h4.6c2.3,0,4.5,0.9,6.2,2.5C28.1,56.2,31.6,57.8,35.4,57.8 M56.3,7H14.5C14.2,7,14,7.2,14,7.5v2.2
						c0,0.3,0.2,0.5,0.5,0.5h3c0.3,0,0.6,0.1,0.9,0.3l13.4,8.8c0.3,0.2,0.5,0.6,0.5,1v2.2c0,0.5-0.4,0.9-0.9,0.9h-2.3
						c-0.3,0-0.5,0.2-0.5,0.5v4.6c0,0.3,0.2,0.5,0.5,0.5h12.5c0.3,0,0.5-0.2,0.5-0.5v-4.6c0-0.3-0.2-0.5-0.5-0.5h-2.3
						c-0.5,0-0.9-0.4-0.9-0.9v-2.2c0-0.4,0.2-0.8,0.5-1l13.4-8.8c0.3-0.2,0.6-0.3,0.9-0.3h3c0.3,0,0.5-0.2,0.5-0.5V7.6
						C56.8,7.3,56.6,7,56.3,7 M39.3,15.4c-0.2,0.2-0.5,0.2-0.8,0.2h-6.2c-0.3,0-0.6-0.1-0.8-0.2l-7.7-5.1H47
						C47,10.3,39.3,15.4,39.3,15.4z"/>
					</g>
				</g>
				<g class="placeholder">
					<g class="overlay-container" fill="none">
						<path d="M66.7,64.7H3.9C1.8,64.7,0,63,0,60.8V3.9C0,1.8,1.8,0,3.9,0h62.7c2.2,0,3.9,1.8,3.9,3.9v56.8
					C70.6,63,68.8,64.7,66.7,64.7z"/>
					</g>
					<g class="alarm-container" fill="none">
						<path d="M66.7,2c1.1,0,1.9,0.9,1.9,1.9v56.8c0,1.1-0.9,1.9-1.9,1.9H3.9c-1.1,0-1.9-0.9-1.9-1.9V3.9C2,2.9,2.9,2,3.9,2H66.7 M66.7,0
						H3.9C1.8,0,0,1.8,0,3.9v56.8c0,2.2,1.8,3.9,3.9,3.9h62.7c2.2,0,3.9-1.8,3.9-3.9V3.9C70.6,1.8,68.8,0,66.7,0L66.7,0z"/>
					</g>
				</g>
			</svg>
		</div>
		`;
	}

	static get style() {/* массив имён атрибутов для отслеживания их изменений */
		return  `
		.valve-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.valve-elem svg {
			max-width: 100%;
    		max-height: 100%;
		}
		.valve-elem svg .elem .unactive-color {
			fill: var(--underlayer-default-color);
		}
		.valve-elem svg .elem .color {
			fill: var(--underlayer-default-color);
			z-index: 1;
		}
		.valve-elem svg .elem.default {
			stroke: none;
		}
		.valve-elem svg .placeholder .alarm-container.default {
			fill: none;
		}
		.valve-elem svg .placeholder .alarm-container.error {
			fill: var(--num-value-linecolor-awful);
		}
		.valve-elem svg .placeholder .overlay-container.visible {
			fill: var(--sys-unavailable-color);
		}
		.valve-elem svg .placeholder .overlay-container.invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentpercent', '_dcurrentval'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		this.UpdateStatic();
	}

	//
	// adoptedCallback() {
	// 	super.adoptedCallback();
	// }

	onUpdateStatic() {
		let theElemCont = this.shadowRoot.querySelector('.valve-elem');

		this.OnThemeChanged();
	}

	onUpdateDynamic() {
		let theElemCont = this.shadowRoot.querySelector('.valve-elem');
		let elem = theElemCont.querySelector('svg .elem');
		let colorLayer = elem.querySelector('.color');
		let alarmContainer = theElemCont.querySelector('svg .alarm-container');
		let overlayContainer = theElemCont.querySelector('svg .overlay-container');
		let stateVal = parseInt(this._dcurrentval.value);
		let colorPercent;

		if (isNaN(stateVal)) {
			alarmContainer.classList.add('default');
			alarmContainer.classList.remove('error');

			overlayContainer.classList.add('visible');
			overlayContainer.classList.remove('invisible');
		} else {
			if (stateVal == 0) {
				//закрыто
				alarmContainer.classList.add('default');
				alarmContainer.classList.remove('error');

				overlayContainer.classList.add('invisible');
				overlayContainer.classList.remove('visible');

				colorLayer.style.opacity = 0;
			} else if (stateVal == 1) {
				//открыто
				alarmContainer.classList.add('default');
				alarmContainer.classList.remove('error');

				overlayContainer.classList.add('invisible');
				overlayContainer.classList.remove('visible');

				if ((this._dcurrentpercent == undefined) || (this._dcurrentpercent == "undefined") || (this._dcurrentpercent == "")) {
					colorLayer.style.opacity = 1;
				} else {
					let percentVal = parseFloat(this._dcurrentpercent);

					if (percentVal < 0) {
						colorPercent = 0;
					} else {
						colorPercent = parseFloat(percentVal.toFixed(1));
					}
				}

				if (colorPercent == 0) {
					colorLayer.style.opacity = "" + 0 + "";
				} else {
					let finalOpacity = (0.8 * colorPercent + 20) / 100;
					colorLayer.style.opacity = "" + finalOpacity + "";
				}


			} else if (stateVal == -1) {
				//ошибка
				alarmContainer.classList.add('error');
				alarmContainer.classList.remove('default');

				overlayContainer.classList.add('visible');
				overlayContainer.classList.remove('invisible');

				colorLayer.style.opacity = 0;
			} else {
				//нет сигнала
				alarmContainer.classList.add('default');
				alarmContainer.classList.remove('error');

				overlayContainer.classList.add('visible');
				overlayContainer.classList.remove('invisible');

				colorLayer.style.opacity = 0;
			}
		}
		this.UpdateStatic();
	}

	OnThemeChanged = function () {
		let theElemCont = this.shadowRoot.querySelector('.valve-elem');
		let elem = theElemCont.querySelector('svg .elem');
		let activePartColor;
		let valveType = this._scolor.value;

		switch (valveType) {
			case 'gas':
				activePartColor = GetCurrentThemeStyle("--underlayer-gas-color");
				break;
			case 'glycol':
				activePartColor = GetCurrentThemeStyle("--underlayer-glycol-color");
				break;
			case 'drainage':
				activePartColor = GetCurrentThemeStyle("--underlayer-drainage-color");
				break;
			case 'heat-carrier':
				activePartColor = GetCurrentThemeStyle("--underlayer-heat-carrier-color");
				break;
			case 'methanol':
				activePartColor = GetCurrentThemeStyle("--underlayer-methanol-color");
				break;
			case 'antifreeze':
				activePartColor = GetCurrentThemeStyle("--underlayer-antifreeze-color");
				break;
			case 'water':
				activePartColor = GetCurrentThemeStyle("--underlayer-water-color");
				break;
			default:
				activePartColor = GetCurrentThemeStyle("-underlayer-default-color");
				break;
		}

		elem.querySelector('.color').style.fill = activePartColor;
	};

	//onThemeChanged() {}


	Init = function () {
		let theElemCont = this.shadowRoot.querySelector('.valve-elem');

		this.AddTooltip(theElemCont, {});
	}
})

