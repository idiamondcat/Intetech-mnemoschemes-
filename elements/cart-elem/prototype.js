register("cart-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.String, "Подпись");

	_dcurrentval = new Parameter(Type.Numeric, "Вкачан или выкачан, 0-1");

	static get markup() {
		return `
		<div class="cart-elem">
			<svg class="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="14.29px" height="57.61px" viewBox="0 0 14.29 57.61">
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
		</div>
		`;
	}

	static get style() {
		return `
		.cart-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;
		}
		.cart-elem .svg-container {
			max-width: 100%;
    		max-height: 100%;
		}
		.cart-elem .svg-container .elem {
			fill: none;
			stroke: var(--main-object-fill-color);
			stroke-miterlimit: 10;
			stroke-width: 0.5px;
		}
		.cart-elem .svg-container .elem .inside-arrow.invisible,
		.cart-elem .svg-container .elem line.invisible {
			opacity: 0;
		}
		.cart-elem .svg-container .elem .inside-arrow.visible,
		.cart-elem .svg-container .elem line.visible {
			opacity: 1;
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
		let theElemCont = this.shadowRoot.querySelector('.cart-elem');
		this.OnThemeChanged();
	}
	
	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.cart-elem');
		let colorArrows = theElemCont.querySelector('.svg-container .elem .inside-arrow');
		let line = theElemCont.querySelector('.svg-container .elem line');
		let val = parseInt(this._dcurrentval.value);

		if (isNaN(val)) {
			colorArrows.classList.add('visible');
			line.classList.add('visible');
			colorArrows.classList.remove('invisible');
			line.classList.remove('invisible');
			colorArrows.classList.remove('color');
			colorArrows.classList.add('default');
		} else {
			if (val == 0) {
				colorArrows.classList.add('visible');
				line.classList.add('visible');
				colorArrows.classList.remove('invisible');
				line.classList.remove('invisible');
				colorArrows.classList.remove('default');
				colorArrows.classList.add('color');
			} else if (val == 1) {
				colorArrows.classList.remove('visible');
				line.classList.remove('visible');
				colorArrows.classList.add('invisible');
				line.classList.add('invisible');
			}
		}
		this.UpdateStatic();
	}

	OnThemeChanged = function() {
		let theElemCont = this.shadowRoot.querySelector('.cart-elem');
		let colorArrows = theElemCont.querySelector('.svg-container .elem .inside-arrow');
		let activePartColor;
		let pipeType = this._scolor.value;

		if(colorArrows.classList.contains('color')) {
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
		} else if (colorArrows.classList.contains('default')) {
			activePartColor = GetCurrentThemeStyle("--main-object-fill-color");
		}
		colorArrows.style.stroke = activePartColor;
		colorArrows.style.strokeWidth = "1";		
	}

	Init = function() {
		var theElemCont = this.shadowRoot.querySelector('.cart-elem');

		this.AddTooltip(theElemCont, {});
	}
})