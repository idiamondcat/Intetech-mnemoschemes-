register("candle-elem", class extends SimpleElement {
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Текст");

	static get markup() {
		return `
		<div class="candle-elem">
		<svg class="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.09 40.09" preserveAspectRatio="xMinYMin meet">
			<style type="text/css">
				.st0{fill:#627189;}
				.st1{fill:none;stroke:#627189;stroke-width:3;stroke-linecap:round;stroke-miterlimit:10;}
			</style>
			<path class="candle" d="M4.78,9.89h10.53c2.64,0,4.78,2.14,4.78,4.78V35.3c0,2.64-2.14,4.78-4.78,4.78H4.78C2.14,40.09,0,37.95,0,35.3
				V14.67C0,12.03,2.14,9.89,4.78,9.89"/>
			<line class="wick" x1="17.76" y1="1.5" x2="2.11" y2="12.64"/>
		</svg>
		</div>
		`;
	}

	static get style() {
		return `
		.candle-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.candle-elem .svg-container {
			max-width: 100%;
    		max-height: 100%;
		}
		.candle-elem .svg-container .candle {
			fill: var(--barrels-fill);
		}
		.candle-elem .svg-container .wick {
			fill: none;
			stroke: var(--barrels-fill);
			stroke-width: 3;
			stroke-linecap: round;
			stroke-miterlimit: 10;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return [];
	}

	onAttributeChanged(name, oldValue, newValue) {
		
	}


	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.candle-elem');

		this.AddTooltip(theElemCont, {});
	}
})
