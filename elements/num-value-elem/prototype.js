register("num-value-elem", class extends SimpleElement {
	_dcurrentval = new Parameter(Type.Numeric, "Входящий параметр - число");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");

	static get markup() {
		return `
		<div class="num-value-elem">
			<div class="hatch-container"></div>
			<div class="value-displayer"></div>
		</div>
		`;
	}
	static get style() {
		return `
		.num-value-elem {
			display: flex;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			padding: 3% 5.3%;
			position: relative;
			background-color: var(--body-bg-color);
			border: 1px solid rgba(94, 94, 94, 1);
			border-radius: 8px;
			overflow: hidden;
		}
		.num-value-elem .hatch-container {
			display: block;
			position: absolute;
			box-sizing: border-box;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 999;
			background: none;
			opacity: 0;
		}
		.num-value-elem.hatched .hatch-container {
			background: repeating-linear-gradient(
				-45deg,
				rgba(var(--num-value-hatch-class-unreachable-color)) 0px,
				rgba(var(--num-value-hatch-class-unreachable-color)) 1px,
				rgba(0, 0, 0, 0) 1px,
				rgba(0, 0, 0, 0) 6px,
				rgba(var(--num-value-hatch-class-unreachable-color)) 6px,
				rgba(var(--num-value-hatch-class-unreachable-color)) 7px,
				rgba(0, 0, 0, 0) 7px,
				rgba(0, 0, 0, 0) 12px
			);
			opacity: var(--num-value-hatch-opacity);
		}
		.num-value-elem .value-displayer {
			display: block;
			box-sizing: border-box;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-weight: 400;
			text-align: center;
			white-space: wrap;
			color: var(--tit-name-cont-txt-color);
			overflow: hidden;
			text-overflow: ellipsis;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentval', '_sfontsize'];
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
		let theElemCont = this.shadowRoot.querySelector('.num-value-elem');
		let displayedValue = theElemCont.querySelector('.value-displayer');
		let fs = this._sfontsize.value;

		if ((fs !== undefined) && (fs !== '')) {
			displayedValue.style.fontSize = parseInt(fs) + 'px';
			displayedValue.style.lineHeight = Math.round(fs * 1.143) + 'px';
		} else {
			displayedValue.style.fontSize = '';
			displayedValue.style.lineHeight = '';
		}
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.num-value-elem');
		let displayedValue = theElemCont.querySelector('.value-displayer');
		let curVal = this._dcurrentval.value;
		let curValStr;

		console.log('Num-value-placer, id:' + this.id + ', Current val: ' + this._dcurrentval.value + ' ' + typeof this._dcurrentval.value + ', Parse Value: ' + curVal + ' ' + typeof curVal);

		if ((curVal === undefined) || (curVal === '') || (curVal === 'undefined') || (curVal === null)) {
			displayedValue.innerHTML = 'Н/Д';
			theElemCont.classList.add('hatched');
		} else {
			curValStr = parseFloat(curVal).toFixed(2) + '';
			curValStr = curValStr.replace(',', '.');
			curValStr = curValStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
			console.log(typeof curValStr);
			displayedValue.innerHTML = curValStr;
			theElemCont.classList.remove('hatched');
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.num-value-elem');

		this.AddTooltip(theElemCont, {});
	}
})