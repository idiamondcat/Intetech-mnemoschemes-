register("reservoir-elem", class extends SimpleElement {
	_sshowreservoir = new Parameter(Type.Numeric, "Показать-скрыть элемент, 0 (по умолч.) - скрыть, 1 - показать");

	static get markup() {
		return `
		<div class="reservoir-elem">
			<svg class="svg-container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 27" preserveAspectRatio="xMinYMin meet">
				<g class="color">
					<polygon points="74.95 0 74.95 15 5.05 15 5.05 0 0 0 0 15 0 20 5.05 20 37.48 20 37.48 27 42.52 27 42.52 20 74.95 20 80 20 80 15 80 0 74.95 0"/>
				</g>
				<g class="placeholder">
					<rect fill="none" width="80" height="27"/>
				</g>
			</svg>
		</div>
		`;
	}

	static get style() {
		return `
		.reservoir-elem {
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.reservoir-elem.default {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.reservoir-elem.hidden {
			display: none;
		}
		.reservoir-elem .svg-container {
			max-width: 100%;
    		max-height: 100%;
		}
		.reservoir-elem .svg-container .color {
			fill: var(--underlayer-default-color);
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_sshowreservoir'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
				this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.reservoir-elem');
		let showElemParam = parseInt(this._sshowreservoir.value);

		if (showElemParam) {
			if (showElemParam == 1) {
				theElemCont.classList.add('hidden');
				theElemCont.classList.remove('default');
			} else if (showElemParam == 0) {
				theElemCont.classList.add('default');
				theElemCont.classList.remove('hidden');
			} else {
				theElemCont.classList.add('default');
				theElemCont.classList.remove('hidden');
			}
		} else {
			theElemCont.classList.add('default');
			theElemCont.classList.remove('hidden');
		}
	}


	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.reservoir-elem');

		this.AddTooltip(theElemCont, {});
	}
})
