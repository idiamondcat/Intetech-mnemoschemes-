register("caption-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");

	static get markup() {
		return `
		<div class="caption-elem">
			<div class="text-displayer"></div>
		</div>
		`;
	}
	static get style() {
		return `
		.caption-elem {
			display: inline-flex;
			box-sizing: border-box;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
            width: 100%;
		}
		
		.caption-elem .text-displayer {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			font-family: 'Ubuntu', sans-serif;
			font-size: 16px;
			line-height: 16px;
			font-weight: 300;
			white-space: nowrap;
			color: var(--text-box-color);
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_scaption'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.caption-elem');
		let displayedValue = theElemCont.querySelector('.text-displayer');

		let fs = this._sfontsize.value;
		let caption = this._scaption.value;

		if ((fs !== undefined) && (fs !== '')) {
			displayedValue.style.height = parseInt(fs) + 'px';
			displayedValue.style.fontSize = parseInt(fs) + 'px';
			// displayedValue.style.lineHeight = Math.round(fs * 1.143) + 'px';
		} else {
			displayedValue.style.fontSize = '';
			// displayedValue.style.lineHeight = '';
			displayedValue.style.height = '';
		}

		if (caption) {
			displayedValue.innerHTML = '' + caption;
			theElemCont.style.display = 'inline-flex';

		} else {
			displayedValue.innerHTML = '';
			theElemCont.style.display = 'none';
		}
		// this.style.width = theElemCont.offsetWidth;
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.caption-elem');

		this.AddTooltip(theElemCont, {});
	}
})