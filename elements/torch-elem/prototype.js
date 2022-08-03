register("torch-elem", class extends SimpleElement {
	_dcurrentval = new Parameter(Type.Numeric, "Состояние активности");

	static get markup() {
		return `
		<div class="torch-elem">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="color">
						<g class="torch">
							<path d="M36,22c0.552,0,1,0.448,1,1v8c0,0.552-0.447,1-1,1H8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.447-1,1-1h3.086
								c1.896,4.133,6.07,7,10.914,7c4.843,0,9.016-2.869,10.912-7H36z"/>
							<path d="M13,17c0,4.962,4.037,9,9,9s9-4.038,9-9v-6h2v6c0,6.075-4.925,11-11,11s-11-4.925-11-11v-6h2V17z"/>
						</g>
						<g class="flame">
							<path d="M19.511,23.692c-3.765-1.079-5.173-3.67-5.173-6.588s1.9-3.97,1.9-6.701c0-0.924-0.661-2.154-0.661-2.154
								s0.966,0.54,1.59,1.774c0.624,1.234-0.037,1.419,0.798,2.216s1.712-0.314,1.468-1.301c-0.242-0.987-0.672-1.99-0.619-3.491
								C18.937,2.398,23.544,1,23.544,1s-1.572,1.664-0.439,4.588c1.134,2.924,5,4.956,6.154,8.522c2.027,6.767-4.26,9.723-4.26,9.723
								s1.275-1.352,1.163-3.641c-0.112-2.29-1.728-3.792-1.728-3.792c0.627,1.375,0.02,3.06-0.957,2.816
								c-1.539-0.488-0.469-2.478-0.825-3.998c-0.507-2.196-1.634-3.472-1.634-3.472s0.808,1.351,0.376,3.19s-2.384,2.91-2.928,4.843
								S19.511,23.692,19.511,23.692z"/>
						</g>
					</g>
				</g>
				<g class="placeholder">
					<rect fill="none" width="44" height="44"/>
					<rect class="alarm-container" fill="none" width="44" height="44"/>
				</g>
			</svg>
		</div>
		`;
	}
	static get style() {
		return `
		.torch-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.torch-elem svg {
			max-width: 100%;
    		max-height: 100%
		}
		.torch-elem svg .elem .color .torch {
			fill: var(--barrels-fill);
		}
		.torch-elem svg .elem .color .flame.off {
			fill: rgba(0, 0, 0, 0);
		}
		.torch-elem svg .elem .color .flame.on {
			fill: var(--flame-color);
		}
		.torch-elem svg .placeholder .visible {
			fill: var(--sys-unavailable-color);
		}
		.torch-elem svg .placeholder .invisible {
			fill: none;
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
		this.UpdateDynamic();
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.torch-elem');
		let flame = theElemCont.querySelector('svg .elem .color .flame');
		let alarmContainer = theElemCont.querySelector('svg .alarm-container');
		let val = parseInt(this._dcurrentval.value);

		if (isNaN(val)) {
			//нет сигнала
			flame.classList.remove('on');
			flame.classList.add('off');

			alarmContainer.classList.remove('invisible');
			alarmContainer.classList.add('visible');
		} else {
			if (val == 0) {
				//закрыто
				flame.classList.remove('on');
				flame.classList.add('off');

				alarmContainer.classList.remove('visible');
				alarmContainer.classList.add('invisible');
			} else if (val == 1) {
				//открыто
				flame.classList.remove('off');
				flame.classList.add('on');

				alarmContainer.classList.remove('visible');
				alarmContainer.classList.add('invisible');
			} else {
				//нет сигнала
				flame.classList.remove('on');
				flame.classList.add('off');

				alarmContainer.classList.remove('invisible');
				alarmContainer.classList.add('visible');
			}
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.torch-elem');

		this.AddTooltip(theElemCont, {});
	}
})