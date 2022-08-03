register("disconnector-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.String, "Подпись");
	_dcurrentval = new Parameter(Type.Numeric, "Открыт/закрыт, 1-0");

	static get markup() {
		return `
		<div class="disconnector-elem">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 11">
				<g class="elem">
					<line class="cls-1" x1="15.25" y1="3.82" x2="15.25" y2="7.32"/>
					<line class="cls-1" x1="0.25" y1="3.82" x2="0.25" y2="7.32"/>
					<line class="movable-elem" x1="7.75" x2="7.75" y2="11.14"/>
				</g>
			</svg>
		</div>
		`;
	}

	static get style() {
		return `
		.disconnector-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.disconnector-elem svg {
			background-color: var(--body-bg-color);
			max-width: 100%;
			max-height: 100%;
		}
		.disconnector-elem svg .elem {
			fill: none;
			stroke: var(--main-object-fill-color);
			stroke-width: 0.5;
			stroke-miterlimit: 10;
		}
		.disconnector-elem svg .elem .movable-elem.active {
			transform-box: fill-box;
			  transform-origin: right;
			transform: rotate(90deg);
		}
		.disconnector-elem svg .elem .movable-elem.default {
			transform-box: fill-box;
			  transform-origin: right;
			transform: rotate(0deg);
			stroke: var(--main-object-fill-color);
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_scolor', '_dcurrentval'];
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
		this.OnThemeChanged();
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.disconnector-elem');
		let colorElem = theElemCont.querySelector('svg .elem .movable-elem');
		let val = parseInt(this._dcurrentval.value);

		if (isNaN(val)) { //Неизвестен
			colorElem.classList.add('default');
			colorElem.classList.remove('active');
		} else {
			if (val == 1) { //Открыт
				colorElem.classList.add('default');
				colorElem.classList.remove('active');
			} else if (val == 0) { //Закрыт
				colorElem.classList.add('active');
				colorElem.classList.remove('default');
			}
		}
		this.UpdateStatic();
	}

	OnThemeChanged = function() {
		let theElemCont = this.shadowRoot.querySelector('.disconnector-elem');
		let colorElem = theElemCont.querySelector('svg .elem .movable-elem');
		let activePartColor;

		if (colorElem.classList.contains('active')) {
			activePartColor = this.getActiveColor(this._scolor.value);
			colorElem.style.strokeWidth = '2';
		} else if (colorElem.classList.contains('default')) {
			activePartColor = GetCurrentThemeStyle('--main-object-fill-color');
			colorElem.style.strokeWidth = '0.5';
		}
		colorElem.style.stroke = activePartColor;
	}

	Init = function() {
		var theElemCont = this.shadowRoot.querySelector('.disconnector-elem');

		this.AddTooltip(theElemCont, {});
	}
})