register("heater-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");
	// _sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Подпись");

	static get markup() {
		return `
		<div class="heater-elem">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 272.5 130" preserveAspectRatio="xMinYMin meet">
				<path class="heater-cap" d="M13.49,126.34c-5.2.24-10.72-2.1-12-5.55-2-5.45-1.95-79.12,0-85,1.16-3.51,3.52-5.64,12-5.62Z"/>
				<path class="heater-cap" d="M259,126.34c5.2.24,10.72-2.1,12-5.55,2-5.45,1.95-79.12,0-85-1.16-3.51-3.52-5.64-12-5.62Z"/>
				<polygon class="heater-body" points="26.33 126.46 27.53 29.96 246.82 29.99 245.63 126.49 26.33 126.46"/>
				<rect class="heater-rect" x="13.94" y="26.25" width="15" height="103.75"/>
				<rect class="heater-rect" x="39.44" y="22.22" width="195.01" height="7.05"/>
				<rect class="heater-rect" x="243.26" y="26.62" width="15.5" height="103.24"/>
				<text class="heater-name" transform="matrix(1.26, 0, 0.01, 1, 109.8, 49.97)"></text>
				<g class="heater-elem-wrapper">
					<path class="heater-elem" d="M214.4,119.73H43.66c-2.45,0-4.44-1-4.44-2.32s2-2.33,4.44-2.33H214.4c1.6,0,9.78-.32,9.78-5.11s-8.18-5.1-9.82-5.12H57.89c-7.51,0-18.67-2.59-18.67-9.76s11.16-9.76,18.67-9.76H214.4c1.6,0,9.78-.32,9.78-5.12s-8.18-5.1-9.82-5.11H57.89c-7.51,0-18.67-2.6-18.67-9.76s11.16-9.76,18.67-9.76H228.62c2.46,0,4.45,1,4.45,2.32s-2,2.32-4.45,2.32H57.89c-1.61,0-9.78.32-9.78,5.12s8.17,5.1,9.81,5.11H214.4c7.5,0,18.67,2.6,18.67,9.76S221.9,90,214.4,90H57.89c-1.61,0-9.78.32-9.78,5.11s8.17,5.1,9.81,5.12H214.4c7.5,0,18.67,2.6,18.67,9.76s-11.17,9.76-18.67,9.76"/>
				</g>
				<path class="heater-top-cap" d="M176.84.19A2,2,0,0,0,176,0H96.78a2,2,0,0,0-.87.19L38.5,17.09a2.13,2.13,0,0,0,.86,4.07h194a2.13,2.13,0,0,0,.86-4.07Z"/>
			</svg>
		</div>
		`;
	}

	static get style() {
		return `
		.heater-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.heater-elem svg {
			max-width: 100%;
			max-height: 100%;
		}
		.heater-elem svg .heater-cap, .heater-elem svg .heater-top-cap, .heater-elem svg .heater-body {
			fill: var(--barrels-fill);
		}
		.heater-elem svg .heater-rect {
			fill: var(--barrels-fill);
			stroke: #e9e9e9;
			stroke-miterlimit: 10;
			stroke-width: 1.5px;
		}
		.heater-elem svg .heater-name {
			font-family: 'Ubuntu Condensed', sans-serif;
			font-weight: 400;
			font-size: 22px;
			line-height: 26.5px;
			fill: #ffffff;
		}
		.heater-elem svg .heater-elem-wrapper {
			opacity: 0.3;
		}
		.heater-elem svg .heater-elem-wrapper .heater-elem {
			fill: #ffffff;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_scaption'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.heater-elem');
		let namingElem = theElemCont.querySelector('svg .heater-name');

		if (this._scaption.value !== undefined)
			namingElem.innerHTML = '' + this._scaption.value + '';
		else
			namingElem.innerHTML = '';

	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.heater-elem');

		this.AddTooltip(theElemCont, {});
	}
})