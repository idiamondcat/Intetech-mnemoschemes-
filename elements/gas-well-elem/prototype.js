register("gas-well-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");

	_dcurrentval = new Parameter(Type.Numeric, "Текущее значение");

	static get markup() {
		return `
		<div class="gas-well-elem">
			<svg class="svg-container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 55" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="unactive-color">
						<path d="M7.76,26.82a3.21,3.21,0,0,1,0-3.31H6.36A3.92,3.92,0,0,0,6.23,23H5.89a.31.31,0,0,0-.31.31V27a.31.31,0,0,0,.31.31h.34c0-.16.09-.32.13-.49Z"/>
						<path d="M31.92,26.82a3.15,3.15,0,0,0,0-3.31h1.4c0-.17.08-.33.13-.49h.35a.3.3,0,0,1,.3.31V27a.3.3,0,0,1-.3.31h-.35a3.89,3.89,0,0,1-.12-.49Z"/>
						<path d="M3.19,41.84h2a4.59,4.59,0,0,1,0-4.71h-2c0-.23-.12-.46-.19-.69H2.51a.44.44,0,0,0-.43.45v5.2a.44.44,0,0,0,.43.44H3c.07-.23.13-.46.19-.69"/>
						<path d="M36.76,41.84h-2a4.53,4.53,0,0,0,0-4.71h2q.08-.35.18-.69h.5a.44.44,0,0,1,.43.45v5.2a.44.44,0,0,1-.43.44h-.5c-.07-.23-.12-.46-.18-.69"/>
						<path d="M10.59,22.59a2.71,2.71,0,1,0,2.65,2.71,2.68,2.68,0,0,0-2.65-2.71M8.82,25.3a1.81,1.81,0,0,1,.63-1.39l.79,1.39-.79,1.39a1.81,1.81,0,0,1-.63-1.39m1.78,1.82A1.78,1.78,0,0,1,10,27l.79-1.39h1.58a1.8,1.8,0,0,1-1.76,1.5M10.78,25,10,23.59a1.78,1.78,0,0,1,.61-.11A1.8,1.8,0,0,1,12.36,25Z"/>
						<path d="M29.17,22.59a2.71,2.71,0,1,0,2.65,2.71,2.67,2.67,0,0,0-2.65-2.71M27.4,25.3A1.82,1.82,0,0,1,28,23.91l.78,1.39L28,26.69a1.82,1.82,0,0,1-.64-1.39m1.78,1.82a1.78,1.78,0,0,1-.61-.11l.79-1.39h1.58a1.8,1.8,0,0,1-1.76,1.5M29.36,25l-.79-1.39a1.78,1.78,0,0,1,.61-.11A1.8,1.8,0,0,1,30.94,25Z"/>
						<path d="M9.28,35.31a4.28,4.28,0,1,0,4.2,4.27,4.23,4.23,0,0,0-4.2-4.27M6.49,39.58a2.91,2.91,0,0,1,1-2.2l1.25,2.2-1.25,2.2a2.88,2.88,0,0,1-1-2.2m2.82,2.88a2.88,2.88,0,0,1-1-.18l1.25-2.2h2.49a2.83,2.83,0,0,1-2.77,2.38m.28-3.38-1.25-2.2a2.88,2.88,0,0,1,1-.18,2.83,2.83,0,0,1,2.77,2.38Z"/>
						<path d="M30.45,35.31a4.28,4.28,0,1,0,4.19,4.27,4.23,4.23,0,0,0-4.19-4.27m-2.79,4.27a2.91,2.91,0,0,1,1-2.2l1.25,2.2-1.25,2.2a2.88,2.88,0,0,1-1-2.2m2.82,2.88a2.83,2.83,0,0,1-1-.18l1.25-2.2h2.49a2.83,2.83,0,0,1-2.77,2.38m.28-3.38-1.25-2.2a2.78,2.78,0,0,1,3.74,2.2Z"/>
						<path d="M22.15,10.45A4.5,4.5,0,0,0,16,12.29a4.68,4.68,0,0,0,1.8,6.29A4.5,4.5,0,0,0,24,16.74a4.68,4.68,0,0,0-1.8-6.29M17.31,13a3,3,0,0,1,2.08-1.56l.06,2.76-2.31,1.43A3.12,3.12,0,0,1,17.31,13m1.21,4.23a3.05,3.05,0,0,1-.83-.68L20,15.15l2.37,1.33a3,3,0,0,1-3.85.78m2-3.06-.06-2.75a3,3,0,0,1,1,.34,3.14,3.14,0,0,1,1.42,3.73Z"/>
						<path d="M22.37,9.27a5.14,5.14,0,0,1,.85.59V2.36H16.87V9.68a5,5,0,0,1,5.5-.41"/>
						<path d="M27.46,46.25h-.94a.53.53,0,0,1-.48-.52V42.14a4.42,4.42,0,0,1-.76-4.08H23.79a.3.3,0,0,1-.3-.3v-2.3h0v-7h0v-.49a.29.29,0,0,1,.3-.3h2.73a4.46,4.46,0,0,1,0-4.67H23.79a.3.3,0,0,1-.3-.31V19.4a5.82,5.82,0,0,1-7.08,0v3.25a.31.31,0,0,1-.3.31H13.38a4.46,4.46,0,0,1,0,4.67h2.73a.3.3,0,0,1,.3.3v.39h0v9.44a.39.39,0,0,1-.35.3h-1.7a4,4,0,0,1-.77,4.57v3.09a.52.52,0,0,1-.24.44v.09H12.16a.46.46,0,0,0-.46.46v4.77a.46.46,0,0,0,.46.47h15.3a.47.47,0,0,0,.47-.47V46.71a.47.47,0,0,0-.47-.46"/>
					</g>
					<g class="color">
						<path d="M7.76,26.82a3.21,3.21,0,0,1,0-3.31H6.36A3.92,3.92,0,0,0,6.23,23H5.89a.31.31,0,0,0-.31.31V27a.31.31,0,0,0,.31.31h.34c0-.16.09-.32.13-.49Z"/>
						<path d="M31.92,26.82a3.15,3.15,0,0,0,0-3.31h1.4c0-.17.08-.33.13-.49h.35a.3.3,0,0,1,.3.31V27a.3.3,0,0,1-.3.31h-.35a3.89,3.89,0,0,1-.12-.49Z"/>
						<path d="M3.19,41.84h2a4.59,4.59,0,0,1,0-4.71h-2c0-.23-.12-.46-.19-.69H2.51a.44.44,0,0,0-.43.45v5.2a.44.44,0,0,0,.43.44H3c.07-.23.13-.46.19-.69"/>
						<path d="M36.76,41.84h-2a4.53,4.53,0,0,0,0-4.71h2q.08-.35.18-.69h.5a.44.44,0,0,1,.43.45v5.2a.44.44,0,0,1-.43.44h-.5c-.07-.23-.12-.46-.18-.69"/>
						<path d="M10.59,22.59a2.71,2.71,0,1,0,2.65,2.71,2.68,2.68,0,0,0-2.65-2.71M8.82,25.3a1.81,1.81,0,0,1,.63-1.39l.79,1.39-.79,1.39a1.81,1.81,0,0,1-.63-1.39m1.78,1.82A1.78,1.78,0,0,1,10,27l.79-1.39h1.58a1.8,1.8,0,0,1-1.76,1.5M10.78,25,10,23.59a1.78,1.78,0,0,1,.61-.11A1.8,1.8,0,0,1,12.36,25Z"/>
						<path d="M29.17,22.59a2.71,2.71,0,1,0,2.65,2.71,2.67,2.67,0,0,0-2.65-2.71M27.4,25.3A1.82,1.82,0,0,1,28,23.91l.78,1.39L28,26.69a1.82,1.82,0,0,1-.64-1.39m1.78,1.82a1.78,1.78,0,0,1-.61-.11l.79-1.39h1.58a1.8,1.8,0,0,1-1.76,1.5M29.36,25l-.79-1.39a1.78,1.78,0,0,1,.61-.11A1.8,1.8,0,0,1,30.94,25Z"/>
						<path d="M9.28,35.31a4.28,4.28,0,1,0,4.2,4.27,4.23,4.23,0,0,0-4.2-4.27M6.49,39.58a2.91,2.91,0,0,1,1-2.2l1.25,2.2-1.25,2.2a2.88,2.88,0,0,1-1-2.2m2.82,2.88a2.88,2.88,0,0,1-1-.18l1.25-2.2h2.49a2.83,2.83,0,0,1-2.77,2.38m.28-3.38-1.25-2.2a2.88,2.88,0,0,1,1-.18,2.83,2.83,0,0,1,2.77,2.38Z"/>
						<path d="M30.45,35.31a4.28,4.28,0,1,0,4.19,4.27,4.23,4.23,0,0,0-4.19-4.27m-2.79,4.27a2.91,2.91,0,0,1,1-2.2l1.25,2.2-1.25,2.2a2.88,2.88,0,0,1-1-2.2m2.82,2.88a2.83,2.83,0,0,1-1-.18l1.25-2.2h2.49a2.83,2.83,0,0,1-2.77,2.38m.28-3.38-1.25-2.2a2.78,2.78,0,0,1,3.74,2.2Z"/>
						<path d="M22.15,10.45A4.5,4.5,0,0,0,16,12.29a4.68,4.68,0,0,0,1.8,6.29A4.5,4.5,0,0,0,24,16.74a4.68,4.68,0,0,0-1.8-6.29M17.31,13a3,3,0,0,1,2.08-1.56l.06,2.76-2.31,1.43A3.12,3.12,0,0,1,17.31,13m1.21,4.23a3.05,3.05,0,0,1-.83-.68L20,15.15l2.37,1.33a3,3,0,0,1-3.85.78m2-3.06-.06-2.75a3,3,0,0,1,1,.34,3.14,3.14,0,0,1,1.42,3.73Z"/>
						<path d="M22.37,9.27a5.14,5.14,0,0,1,.85.59V2.36H16.87V9.68a5,5,0,0,1,5.5-.41"/>
						<path d="M27.46,46.25h-.94a.53.53,0,0,1-.48-.52V42.14a4.42,4.42,0,0,1-.76-4.08H23.79a.3.3,0,0,1-.3-.3v-2.3h0v-7h0v-.49a.29.29,0,0,1,.3-.3h2.73a4.46,4.46,0,0,1,0-4.67H23.79a.3.3,0,0,1-.3-.31V19.4a5.82,5.82,0,0,1-7.08,0v3.25a.31.31,0,0,1-.3.31H13.38a4.46,4.46,0,0,1,0,4.67h2.73a.3.3,0,0,1,.3.3v.39h0v9.44a.39.39,0,0,1-.35.3h-1.7a4,4,0,0,1-.77,4.57v3.09a.52.52,0,0,1-.24.44v.09H12.16a.46.46,0,0,0-.46.46v4.77a.46.46,0,0,0,.46.47h15.3a.47.47,0,0,0,.47-.47V46.71a.47.47,0,0,0-.47-.46"/>
					</g>
				</g>
				<g class="placeholder">
					<g class="overlay-container" fill="none">
						<path d="M35,55H5a5,5,0,0,1-5-5V5A5,5,0,0,1,5,0H35a5,5,0,0,1,5,5V50a5,5,0,0,1-5,5"/>
					</g>
				</g>
			</svg>
		</div>
		`;
	}

	static get style() {
		return `
		.gas-well-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.gas-well-elem .svg-container {
			max-width: 100%;
			max-height: 100%;
		}
		.gas-well-elem .svg-container .elem .unactive-color {
			fill: var(--underlayer-default-color);
		}
		.gas-well-elem .svg-container .elem .color {
			fill: var(--underlayer-default-color);
			z-index: 1;
		}
		.gas-well-elem .svg-container .placeholder .overlay-container.visible {
			fill: var(--sys-unavailable-color);
		}
		.gas-well-elem .svg-container .placeholder .overlay-container.invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentval', '_scolor'];
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
		let theElemCont = this.shadowRoot.querySelector('.gas-well-elem');
		let coloringElem = theElemCont.querySelector('.svg-container .elem .color');

		coloringElem.style.fill = this.getActiveColor(this._scolor.value);
	}
	
	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.gas-well-elem');
		let colorLayer = theElemCont.querySelector('.svg-container .elem .color');
		let overlayContainer = theElemCont.querySelector('.overlay-container');
		let val = parseInt(this._dcurrentval.value);

		let opacity = 0;

		if (isNaN(val)) {
			//нет сигнала
			overlayContainer.classList.add('visible');
			overlayContainer.classList.remove('invisible');
		} else {
			if (val == 0) {
				//закрыто
				overlayContainer.classList.add('invisible');
				overlayContainer.classList.remove('visible');
			} else if (val == 1) {
				//открыто
				overlayContainer.classList.add('invisible');
				overlayContainer.classList.remove('visible');
				opacity = 1;
			} else if (val == -1) {
				//ошибка
				overlayContainer.classList.add('visible');
				overlayContainer.classList.remove('invisible');
			} else {
				//нет сигнала
				overlayContainer.classList.add('visible');
				overlayContainer.classList.remove('invisible');
			}
		}
		colorLayer.style.opacity = '' + opacity + '';
		this.UpdateStatic();
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.gas-well-elem');

		this.AddTooltip(theElemCont, {});
	}
})

