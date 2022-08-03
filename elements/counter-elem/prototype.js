register("counter-elem", class extends SimpleElement {

	static get markup() {
		return `
		<div class="counter-elem">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.5 33.5" preserveAspectRatio="xMidYMid meet">
				<g class="contour">
					<rect class="cls-1" x="45.86" y="10.57" width="5.64" height="12.37"/>
					<rect class="cls-1" y="10.57" width="5.43" height="12.37"/>
					<path class="cls-1" d="M42.25,16.75A16.66,16.66,0,1,1,25.6,0,16.7,16.7,0,0,1,42.25,16.75"/>
					<path class="cls-1" d="M43.35,26.76H41.49a1.71,1.71,0,0,1-1.69-1.71V8.45a1.71,1.71,0,0,1,1.69-1.71h1.86a1.71,1.71,0,0,1,1.7,1.71v16.6a1.71,1.71,0,0,1-1.7,1.71"/>
					<path class="cls-1" d="M9.72,26.76H7.86a1.71,1.71,0,0,1-1.69-1.71V8.45A1.71,1.71,0,0,1,7.86,6.74H9.72a1.71,1.71,0,0,1,1.7,1.71v16.6a1.71,1.71,0,0,1-1.7,1.71"/>
				</g>
				<path class="circle" d="M11.61,17A14,14,0,1,1,25.61,31,14,14,0,0,1,11.61,17"/>
				<g class="data">
					<path class="cls-3" d="M18.25,19.26H16.93a1.45,1.45,0,0,1-1.45-1.46V12.19a1.45,1.45,0,0,1,1.45-1.45h1.32a1.45,1.45,0,0,1,1.45,1.45V17.8a1.45,1.45,0,0,1-1.45,1.46"/>
					<path class="cls-3" d="M23.82,19.26H22.5a1.45,1.45,0,0,1-1.45-1.46V12.19a1.45,1.45,0,0,1,1.45-1.45h1.32a1.45,1.45,0,0,1,1.45,1.45V17.8a1.45,1.45,0,0,1-1.45,1.46"/>
					<path class="cls-3" d="M29,19.26H27.72a1.45,1.45,0,0,1-1.45-1.46V12.19a1.45,1.45,0,0,1,1.45-1.45H29a1.45,1.45,0,0,1,1.45,1.45V17.8A1.45,1.45,0,0,1,29,19.26"/>
					<path class="cls-3" d="M34.26,19.26H32.94a1.45,1.45,0,0,1-1.45-1.46V12.19a1.45,1.45,0,0,1,1.45-1.45h1.32a1.45,1.45,0,0,1,1.45,1.45V17.8a1.45,1.45,0,0,1-1.45,1.46"/>
				</g>
				<g class="lines">
					<line class="cls-1" x1="15.44" y1="22.03" x2="35.75" y2="22.03"/>
					<line class="cls-1" x1="20.78" y1="24.13" x2="30.41" y2="24.13"/>
				</g>
				<g class="lines-stroke">
					<line class="cls-4" x1="15.44" y1="22.03" x2="35.75" y2="22.03"/>
					<line class="cls-4" x1="20.78" y1="24.13" x2="30.41" y2="24.13"/>
				</g>
			</svg>
		</div>
		`;
	}

	static get style() {
		return `
		.counter-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.counter-elem svg {
			max-width: 100%;
			max-height: 100%;
		}
		.counter-elem svg .contour {
			fill: var(--barrels-fill);
		}
		.counter-elem svg .circle {
			fill: #f2f2f2;
		}
		.counter-elem svg .data {
			fill: #d1d3d3;
		}
		.counter-elem svg .lines {
			fill: var(--barrels-fill);
		}
		.counter-elem svg .lines-stroke {
			fill: none;
			stroke: var(--barrels-fill);
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
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.counter-elem');

		this.AddTooltip(theElemCont, {});
	}
})
