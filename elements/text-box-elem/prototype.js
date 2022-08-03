register("text-box-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");

	static get markup() {
		return `
		<div class="text-box-elem">
			<div class="text-displayer"></div>
		</div>
		`;
	}
	static get style() {
		return `
		.text-box-elem {
			display: flex;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			padding: 3px 5px;
			background-color: var(--body-bg-color);
			border-radius: 5px;
		}
		
		.text-box-elem .text-displayer {
			display: inline-flex;
			box-sizing: border-box;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 13px;
			line-height: 13px;
			font-weight: 300;
			align-items: center;
			justify-content: center;
			text-align: center;
			white-space: nowrap;
			color: var(--text-box-color);
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_scaption', '_sfontsize'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.text-box-elem');
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

		if ((caption !== undefined) && (caption !== '')) {
			displayedValue.innerHTML = '' + caption;
			theElemCont.style.display = 'flex';

		} else {
			displayedValue.innerHTML = '';
			theElemCont.style.display = 'none';
		}
		if (Number(this.style.width.replace(/[a-z]/g, '')) < displayedValue.offsetWidth) {
			this.style.width = displayedValue.offsetWidth + 10 + 'px';
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.text-box-elem');

		this.AddTooltip(theElemCont, {});
	}
})