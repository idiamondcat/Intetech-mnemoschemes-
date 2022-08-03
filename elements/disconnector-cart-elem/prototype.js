register("disconnector-cart-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.String, "Подпись");
	_dcurrentval = new Parameter(Type.Numeric, "Вкачан или выкачан, 0-1");

	static get markup() {
		return `
		<div class="disconnector-cart-elem">
			<svg class="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 14 58">
				<g class="elem">
					<g class="outside-arrow">
						<polyline points="14.15,5.31 7.15,0.31 0.15,5.31"/>
						<polyline points="0.15,52.31 7.15,57.31 14.15,52.31"/>
					</g>
					<g class="inside-arrow">
						<polyline points="14.15,10.31 7.15,5.31 0.15,10.31"/>
						<polyline points="0.15,47.31 7.15,52.31 14.15,47.31"/>
					</g>
					<line x1="7.15" y1="5.31" x2="7.15" y2="52.31"/>
				</g>
			</svg>
			<disconnector-elem class="disconnector" id="0"></disconnector-elem>
		</div>
		`;
	}

	static get style() {
		return `
		.disconnector-cart-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;
		}
		.disconnector-cart-elem .svg-container {
			max-width: 100%;
			max-height: 100%;
		}
		.disconnector-cart-elem .svg-container .elem {
			fill: none;
			stroke: var(--main-object-fill-color);
			stroke-miterlimit: 10;
			stroke-width: 0.5px;
		}
		.disconnector-cart-elem .svg-container .elem .inside-arrow.invisible,
		.disconnector-cart-elem .svg-container .elem line.invisible {
			opacity: 0;
		}
		.disconnector-cart-elem .svg-container .elem .inside-arrow.visible,
		.disconnector-cart-elem .svg-container .elem line.visible {
			opacity: 1;
		}
		.disconnector-cart-elem .disconnector {
			height: 27.6%;
			width: 78.5%;
			position: absolute;
			transform-origin: center;
			z-index: 10;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(90deg);
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
		let theElemCont = this.shadowRoot.querySelector('.disconnector-cart-elem');
		this.OnThemeChanged();
	}
	
	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.disconnector-cart-elem');
		let colorArrows = theElemCont.querySelector('.svg-container .elem .inside-arrow');
		let line = theElemCont.querySelector('.svg-container .elem line');
		let disconnectorElem = theElemCont.querySelector('.disconnector');
		let val = parseInt(this._dcurrentval.value);

		if (isNaN(val)) {
			colorArrows.classList.add('visible');
			line.classList.add('visible');
			colorArrows.classList.remove('invisible');
			line.classList.remove('invisible');
			colorArrows.classList.remove('color');
			colorArrows.classList.add('default');
			colorArrows.style.strokeWidth = "0.5";
		} else {
			if (val == 0) {
				colorArrows.classList.add('visible');
				line.classList.add('visible');
				colorArrows.classList.remove('invisible');
				line.classList.remove('invisible');
				colorArrows.classList.remove('default');
				colorArrows.classList.add('color');
				colorArrows.style.strokeWidth = "2";
			} else if (val == 1) {
				colorArrows.classList.remove('visible');
				line.classList.remove('visible');
				colorArrows.classList.add('invisible');
				line.classList.add('invisible');
				colorArrows.style.strokeWidth = "0.5";
			}
		}

		if (disconnectorElem) {
			if (this.getAttribute('id') == null) {
				disconnectorElem.removeAttribute('id');
				disconnectorElem.UpdateDynamic();
			}
			disconnectorElem._dcurrentval = this._dcurrentval;
			disconnectorElem.UpdateDynamic();
		}
	}

	OnThemeChanged = function() {
		let theElemCont = this.shadowRoot.querySelector('.disconnector-cart-elem');
		let colorArrows = theElemCont.querySelector('.svg-container .elem .inside-arrow');
		let disconnectorElem = theElemCont.querySelector('.disconnector');

		if (disconnectorElem) {
			disconnectorElem._scolor.value = this._scolor.value;
		}
		
		colorArrows.style.stroke = this.getActiveColor(this._scolor.value);
	}

	Init = function() {
		var theElemCont = this.shadowRoot.querySelector('.disconnector-cart-elem');

		this.AddTooltip(theElemCont, {});
	}
})