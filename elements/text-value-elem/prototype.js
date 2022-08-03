register("text-value-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");

	static get markup() {
		return `
		<div class="text-value-elem">
			<div class="text-displayer"></div>
		</div>
		`;
	}
	static get style() {
		return `
		.text-value-elem {
			display: flex;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			padding: 3px 5px;
		}
		
		.text-value-elem .text-displayer {
			display: inline-flex;
			box-sizing: border-box;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 21px;
			line-height: 25px;
			font-weight: 400;
			align-items: center;
			justify-content: center;
			text-align: center;
			white-space: normal;
			color: rgba(144, 144, 145, 1);
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
		let theElemCont = this.shadowRoot.querySelector('.text-value-elem');
		let displayedValue = theElemCont.querySelector('.text-displayer');

		let fs = parseInt(this._sfontsize.value);
		let caption = this._scaption.value;

		if (fs !== null) {
			displayedValue.style.fontSize = fs + 'px';
			displayedValue.style.lineHeight = Math.round(fs * 1.143) + 'px';
		}

		if ((caption !== undefined) && (caption !== '')) {
			displayedValue.innerHTML = '' + caption;
		} else {
			displayedValue.innerHTML = '';
		}
		if (Number(this.style.width.replace(/[a-z]/g, '')) < displayedValue.offsetWidth) {
			this.style.width = displayedValue.offsetWidth + 10 + 'px';
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.text-value-elem');

		this.AddTooltip(theElemCont, {});
	}
})