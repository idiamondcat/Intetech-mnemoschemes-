register("switch-cart-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.String, "Подпись");

	_dcurrentval = new Parameter(Type.Numeric, "Вкачан или выкачан, 0-1");

	static get markup() {
		return `
		<div class="switch-cart-elem">
			<svg class="svg-container" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 14.3 69.6" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="outside-arrow">
						<polyline points="14.15 5.3 7.15 0.31 0.14 5.3"/>
						<polyline points="0.14 64.31 7.15 69.31 14.15 64.31"/>
					</g>
					<g class="inside-arrow">
						<g class="unactive-color">
							<polyline points="14.15 10.3 7.15 5.31 0.14 10.3"/>
							<polyline points="0.14 59.31 7.15 64.31 14.15 59.31"/>
						</g>
						<g class="color">
							<polyline points="14.15 10.3 7.15 5.31 0.14 10.3"/>
							<polyline points="0.14 59.31 7.15 64.31 14.15 59.31"/>
						</g>
					</g>
					<line x1="7.15" y1="64.31" x2="7.15" y2="5.3"/>
				</g>
			</svg>
			<switch-elem class="switch" id="0"></switch-elem>
		</div>
		`;
	}
	static get style() {
		return `
		.switch-cart-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;
		}
		.switch-cart-elem .svg-container {
			max-width: 100%;
    		max-height: 100%;
		}
		.switch-cart-elem .svg-container .elem {
			fill: none;
			stroke: var(--main-object-fill-color);
			stroke-miterlimit: 10;
			stroke-width: 0.5px;
		}
		.switch-cart-elem .svg-container .elem .inside-arrow.invisible,
		.switch-cart-elem .svg-container .elem line.invisible {
			opacity: 0;
		}
		.switch-cart-elem .svg-container .elem .inside-arrow.visible,
		.switch-cart-elem .svg-container .elem line.visible {
			opacity: 1;
		}
		.switch-cart-elem .svg-container .elem .inside-arrow.unactive-color {
			stroke: var(--main-object-fill-color);
		}
		.switch-cart-elem .svg-container .elem .inside-arrow.color {
			stroke: var(--main-object-fill-color);
			z-index: 999;
		}
		.switch {
			z-index: 10;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 53%;
			width: 100%;
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
		let theElemCont = this.shadowRoot.querySelector('.switch-cart-elem');
		let colorArrows = theElemCont.querySelector('.svg-container .elem .inside-arrow .color');
		let switchElem = theElemCont.querySelector('.switch');

		if (switchElem) {
			switchElem._scolor = this._scolor;
			switchElem.UpdateStatic();
		}

		colorArrows.style.stroke = this.getActiveColor(this._scolor.value);
	}
	
	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.switch-cart-elem');
		let arrows = theElemCont.querySelector('.svg-container .elem .inside-arrow');
		let colorArrows = theElemCont.querySelector('.svg-container .elem .inside-arrow .color');
		let line = theElemCont.querySelector('.svg-container .elem line');
		let switchElem = theElemCont.querySelector('.switch');
		let val = parseInt(this._dcurrentval.value);

		switchElem._dcurrentval = this._dcurrentval;
		if (this.getAttribute('id') == null) {
			switchElem.removeAttribute('id');
		}
		switchElem.UpdateDynamic();

		if (isNaN(val)) {
			arrows.classList.add('visible');
			line.classList.add('visible');
			arrows.classList.remove('invisible');
			line.classList.remove('invisible');
			colorArrows.style.opacity = 0;
			arrows.style.strokeWidth = "0.5";
		} else {
			if (val == 0) {
				arrows.classList.add('visible');
				line.classList.add('visible');
				arrows.classList.remove('invisible');
				line.classList.remove('invisible');
				colorArrows.style.opacity = 1;
				arrows.style.strokeWidth = "2";
			} else if (val == 1) {
				arrows.classList.remove('visible');
				line.classList.remove('visible');
				arrows.classList.add('invisible');
				line.classList.add('invisible');
				colorArrows.style.opacity = 0;
				arrows.style.strokeWidth = "0.5";
			}
		}
		this.UpdateStatic();
	}

	Init = function() {
		var theElemCont = this.shadowRoot.querySelector('.switch-cart-elem');

		this.AddTooltip(theElemCont, {});
	}
})