register("earthing-knife-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.String, "Подпись");

	_dcurrentval = new Parameter(Type.Numeric, "Открыт/закрыт, 0-1");

	static get markup() {
		return `
		<div class="earthing-knife-elem">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.15 18" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="circle">
						<circle cx="3.5" cy="9" r="2.5"/>
						<path d="M3.5,7.5C4.33,7.5,5,8.17,5,9s-0.67,1.5-1.5,1.5S2,9.83,2,9S2.67,7.5,3.5,7.5 M3.5,5.5C1.57,5.5,0,7.07,0,9
							s1.57,3.5,3.5,3.5S7,10.93,7,9S5.43,5.5,3.5,5.5L3.5,5.5z"/>
					</g>
					<g class="lines">
						<line x1="13.96" y1="9" x2="3.5" y2="9"/>
						<line x1="44.9" y1="6.37" x2="44.9" y2="11.52"/>
						<line x1="13.94" y1="7.2" x2="13.94" y2="10.8"/>
						<line x1="41.75" y1="3.21" x2="41.75" y2="14.79"/>
						<line class="knife" x1="21.5" y1="3.21" x2="21.5" y2="14.79"/>
						<line x1="38.6" y1="0" x2="38.6" y2="18"/>
						<line x1="38.66" y1="9" x2="29.06" y2="9"/>
					</g>
				</g>
			</svg>
		</div>
		`;
	}

	static get style() {
		return `
		.earthing-knife-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.earthing-knife-elem svg {
			max-width: 100%;
			max-height: 100%;
		}
		.earthing-knife-elem svg .elem .circle circle {
			fill: var(--main-object-fill-color);
		}
		.earthing-knife-elem svg .elem .circle path {
			fill: rgba(255, 255, 255, 1);
		}
		.earthing-knife-elem svg .elem .lines {
			fill: none;
			stroke: var(--main-object-fill-color);
			stroke-width: 0.5;
			stroke-miterlimit: 10;
		}
		.earthing-knife-elem svg .elem .lines .knife.active {
			transform-box: fill-box;
			transform-origin: center;
			transform: rotate(90deg);
		}
		.earthing-knife-elem svg .elem .lines .knife.default {
			transform-box: fill-box;
			transform-origin: center;
			transform: rotate(0deg);
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentval'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.earthing-knife-elem');
		this.OnThemeChanged();
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.earthing-knife-elem');
		let colorElem = theElemCont.querySelector('svg .elem .lines .knife');
		let val = parseInt(this._dcurrentval.value);

		if (isNaN(val)) { //Неизвестен
			colorElem.classList.add('default');
			colorElem.classList.remove('active');
		} else {
			if (val == 0) { //Открыт
				colorElem.classList.add('default');
				colorElem.classList.remove('active');
			} else if (val == 1) { //Закрыт
				colorElem.classList.add('active');
				colorElem.classList.remove('default');
			}
		}
		this.UpdateStatic();
	}

	OnThemeChanged = function() {
		let theElemCont = this.shadowRoot.querySelector('.earthing-knife-elem');
		let colorElem = theElemCont.querySelector('svg .elem .lines .knife');
		let activePartColor;
		let pipeType = this._scolor.value;

		if(colorElem.classList.contains('active')) {
			switch(pipeType) {
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
			colorElem.style.strokeWidth = '2';
		} else if (colorElem.classList.contains('default')) {
			activePartColor = GetCurrentThemeStyle("--main-object-fill-color");
			colorElem.style.strokeWidth = '0.5';
		}
		colorElem.style.stroke = activePartColor;
	}

	Init = function() {
		var theElemCont = this.shadowRoot.querySelector('.earthing-knife-elem');

		this.AddTooltip(theElemCont, {});
	}
})