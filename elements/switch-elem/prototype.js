register("switch-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.String, "Подпись");

	_dcurrentval = new Parameter(Type.Numeric, "Вкачан или выкачан, 0-1");

	static get markup() {
		return `
		<div class="switch-elem">
			<svg class="svg-container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 37" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<rect class="wrapper" x="0.5" y="0.5" width="21" height="36"/>
					<path d="M21,1V36H1V1H21m1-1H0V37H22V0Z"/>
					<g class="unactive-color">
						<rect class="color-rect" x="1" y="8.5" width="20" height="20"/>
					</g>
					<g class="color">
						<rect class="color-rect" x="1" y="8.5" width="20" height="20"/>
					</g>
					<line class="switch" x1="16" y1="18.5" x2="6" y2="18.5"/>
				</g>
			</svg>
		</div>
		`;
	}
	static get style() {
		return `
		.switch-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;
		}
		.switch-elem .svg-container {
			max-width: 100%;
			max-height: 100%;
		}
		.switch-elem .svg-container .elem .wrapper {
			fill: var(--body-bg-color);
		}
		.switch-elem .svg-container .elem .unactive-color {
			fill: var(--underlayer-default-color);
		}
		.switch-elem .svg-container .elem .color {
			fill: var(--underlayer-default-color);
			z-index: 999;
		}
		.switch-elem .svg-container .elem .switch {
			fill: none;
			stroke: #000000;
			stroke-width: 2;
			stroke-miterlimit: 10;
		}
		.switch-elem .svg-container .elem .switch.unactive {
			transform-origin: center;
			transform: rotate(0deg);
		}
		.switch-elem .svg-container .elem .switch.active {
			transform-origin: center;
			transform: rotate(90deg);
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
		let theElemCont = this.shadowRoot.querySelector('.switch-elem');
		let colorElem = theElemCont.querySelector('.svg-container .elem .color');

		colorElem.style.fill = this.getActiveColor(this._scolor.value);
	}
	
	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.switch-elem');
		let colorElem = theElemCont.querySelector('.svg-container .elem .color');
		let switchLine = theElemCont.querySelector('.svg-container .elem .switch');
		let val = parseInt(this._dcurrentval.value);

		if (isNaN(val)) {
			switchLine.classList.add('unactive');
			switchLine.classList.remove('active');
			colorElem.style.opacity = 0;
		} else {
			if (val == 0) {
				switchLine.classList.add('active');
				switchLine.classList.remove('unactive');
				colorElem.style.opacity = 1;
			} else if (val == 1) {
				switchLine.classList.add('unactive');
				switchLine.classList.remove('active');
				colorElem.style.opacity = 0;
			}
		}
		this.UpdateStatic();
	}

	Init = function() {
		var theElemCont = this.shadowRoot.querySelector('.switch-elem');

		this.AddTooltip(theElemCont, {});
	}
})