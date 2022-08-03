register("tit-elem", class extends SimpleElement {
	_scaptionfontsize = new Parameter(Type.Numeric, "Размер шрифта подписи");
	_svaluefontsize = new Parameter(Type.Numeric, "Размер шрифта значения");
	_scaption = new Parameter(Type.String, "Подпись");
	_sdisplaystate = new Parameter(Type.Numeric, "Показываются ли криты: не задано — показываются; задано (1) — не показываются");

	_dlowestval = new Parameter(Type.Numeric, "Нижнее аварийное значение");
	_dhighestval = new Parameter(Type.Numeric, "Верхнее аварийное значение");
	_dlowcrit = new Parameter(Type.Numeric, "Нижняя предупредительная граница");
	_dhighcrit = new Parameter(Type.Numeric, "Верхняя предупредительная граница");
	_dcurrentval = new Parameter(Type.Numeric, "Текущее значение");
	_douterstate = new Parameter(Type.Numeric, "Внешнее состояние");

	static get markup() {
		return `
		<div class="tit-elem">
			<div class="content-wrapper">
				<div class="name-container">
					<div class="info-container-block">
						<div class="caption-block">
						</div>
						<div class="unit-block">
						</div>
					</div>
				</div>
				<div class="val-container">
					<div class="hatch-container"></div>
					<div class="info-container-block">
						<div class="num-vert-container">
							<div class="num-placer"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="line-vert-container">
				<div class="line-element">
					<div class="square"></div>
					<div class="square js-dCurrentVal"></div>
				</div>
			</div>
		</div>
		`;
	}
	
	static get style() {
		return `
		.tit-elem {
			display: flex;
			box-sizing: border-box;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 100%;
		}
		.tit-elem .content-wrapper {
			display: flex;
			flex-direction: row;
			width: 96%;
			height: 100%;
			padding: 3px 4px;
			background-color: var(--tit-name-cont-bg-color);
			box-sizing: border-box;
			z-index: 1;
		}
		
		.tit-elem.higher-than-optim .content-wrapper,
		.tit-elem.higher-than-highest .content-wrapper, 
		.tit-elem.lower-than-optim .content-wrapper,
		.tit-elem.lower-than-lowest .content-wrapper {
			background-color: var(--tit-cont-negative-color);
			border-radius: 2px;
		}
		
		.tit-elem .content-wrapper .name-container {
			display: flex;
			position: relative;
			box-sizing: border-box;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			width: 50%;
			overflow: hidden;
		}
		
		.tit-elem .content-wrapper .val-container {
			display: flex;
			position: relative;
			box-sizing: border-box;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			width: 50%;
		}
		
		.tit-elem .content-wrapper .name-container .info-container-block {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			position: relative;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.tit-elem .content-wrapper .name-container .info-container-block .caption-block {
			display: inline-flex;
			position: relative;
			box-sizing: border-box;
			font-family: 'Ubuntu Light', sans-serif;
			align-items: center;
			justify-content: flex-start;
			overflow: hidden;
			font-size: var(--sys-tit-caption-fontsize);
			color: var(--tit-name-cont-txt-color);
		}
		.tit-elem.higher-than-optim .content-wrapper .name-container .info-container-block .caption-block,
		.tit-elem.higher-than-highest .content-wrapper .name-container .info-container-block .caption-block, 
		.tit-elem.lower-than-optim .content-wrapper .name-container .info-container-block .caption-block,
		.tit-elem.lower-than-lowest .content-wrapper .name-container .info-container-block .caption-block {
			color: var(--tit-cont-txt-negative-color);
		}
		.tit-elem .content-wrapper .name-container .info-container-block .caption-block sup {
			font-size: 60%;
			line-height: 0px;
		}
		.tit-elem .content-wrapper .name-container .info-container-block .caption-block sub {
			font-size: 60%;
			line-height: 0px;
		}
		.tit-elem .content-wrapper .name-container .info-container-block .unit-block {
			display: inline-flex;
			position: relative;
			box-sizing: border-box;
			font-family: 'Ubuntu Condensed', sans-serif;
			align-items: center;
			justify-content: flex-start;
			overflow: hidden;
			height: 100%;
			font-size: var(--sys-tit-unit-fontsize);
			color: var(--tit-name-cont-txt-color);
		}
		.tit-elem.higher-than-optim .content-wrapper .name-container .info-container-block .unit-block,
		.tit-elem.higher-than-highest .content-wrapper .name-container .info-container-block .unit-block, 
		.tit-elem.lower-than-optim .content-wrapper .name-container .info-container-block .unit-block,
		.tit-elem.lower-than-lowest .content-wrapper .name-container .info-container-block .unit-block {
			color: var(--tit-cont-txt-negative-color);
		}
		.tit-elem .content-wrapper .name-container .info-container-block .unit-block sup {
			font-size: 60%;
			line-height: 0px;
		}
		.tit-elem .content-wrapper .name-container .info-container-block .unit-block sub {
			font-size: 60%;
			line-height: 0px;
		}
		
		.tit-elem .content-wrapper .val-container .info-container-block {
			display: flex;
			box-sizing: border-box;
			z-index: 3;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			width: 100%;
			height: 100%;
		}
		.tit-elem .content-wrapper .val-container .info-container-block .num-vert-container {
			height: 100%;
			width: 100%;
			display: flex;
			position: relative;
			box-sizing: border-box;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			overflow: hidden;
		}
		.tit-elem .line-vert-container {
			display: block;
			box-sizing: border-box;
			height: 100%;
			width: 4px;
			text-align: right;
		}
		.tit-elem .content-wrapper .val-container .hatch-container {
			display: block;
			position: absolute;
			box-sizing: border-box;
			z-index: 2;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
		}
		.tit-elem .content-wrapper .val-container .hatch-container,
		.tit-elem.higher-than-optim .content-wrapper .val-container .hatch-container,
		.tit-elem.higher-than-highest .content-wrapper .val-container .hatch-container, 
		.tit-elem.lower-than-optim .content-wrapper .val-container .hatch-container,
		.tit-elem.lower-than-lowest .content-wrapper .val-container .hatch-container {
			background: none;
			opacity: 0;
		}
		.tit-elem .content-wrapper .val-container.hatched .hatch-container {
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
			z-index: 999;
		}
		.tit-elem.higher-than-optim .content-wrapper .val-container.hatched .hatch-container,
		.tit-elem.higher-than-highest .content-wrapper .val-container.hatched .hatch-container, 
		.tit-elem.lower-than-optim .content-wrapper .val-container.hatched .hatch-container,
		.tit-elem.lower-than-lowest .content-wrapper .val-container.hatched .hatch-container {
			background: repeating-linear-gradient(
				-45deg,
				rgba(var(--num-value-hatch-class-unreachable-alternative-color)) 0px,
				rgba(var(--num-value-hatch-class-unreachable-alternative-color)) 1px,
				rgba(0, 0, 0, 0) 1px,
				rgba(0, 0, 0, 0) 6px,
				rgba(var(--num-value-hatch-class-unreachable-alternative-color)) 6px,
				rgba(var(--num-value-hatch-class-unreachable-alternative-color)) 7px,
				rgba(0, 0, 0, 0) 7px,
				rgba(0, 0, 0, 0) 12px
			);
		}
		.tit-elem .content-wrapper .val-container .info-container-block .num-vert-container .num-placer {
			display: inline-flex;
			align-items: center;
			justify-content: flex-end;
			position: relative;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: var(--sys-numvalue-fontsize);
			overflow: hidden;
		}
		.tit-elem .line-vert-container .line-element {
			display: block;
			position: relative;
			box-sizing: border-box;
			width: 4px;
			height: 100%;
		}
		.tit-elem .line-vert-container .line-element .square {
			display: block;
			position: relative;
			box-sizing: border-box;
			width: 100%;
			height: 50%;
		}
		
		
		.tit-elem .content-wrapper .val-container.unknown .info-container-block .num-vert-container .num-placer {
			color: var(--num-value-numcolor-ok);
		}
		.tit-elem .line-vert-container .line-element .square:nth-child(1) {
			background-color: var(--num-value-linecolor-unknown);
		}
		.tit-elem .line-vert-container .line-element .square:nth-child(2) {
			background-color: var(--num-value-linecolor-unknown);
		}
		
		.tit-elem .content-wrapper .val-container.lower-than-lowest .info-container-block .num-vert-container .num-placer {
			color: var(--num-value-numcolor-awful);
		}
		.tit-elem.lower-than-lowest .line-vert-container .line-element .square:nth-child(1) {
			background-color: var(--num-value-linecolor-ok);
		}
		.tit-elem.lower-than-lowest .line-vert-container .line-element .square:nth-child(2) {
			background-color: var(--num-value-linecolor-awful);
		}
		
		.tit-elem .content-wrapper .val-container.lower-than-optim .info-container-block .num-vert-container .num-placer {
			color: var(--num-value-numcolor-bad);
		}
		.tit-elem.lower-than-optim .line-vert-container .line-element .square:nth-child(1) {
			background-color: var(--num-value-linecolor-ok);
		}
		.tit-elem.lower-than-optim .line-vert-container .line-element .square:nth-child(2) {
			background-color: var(--num-value-linecolor-bad);
		}
		
		.tit-elem .content-wrapper .val-container.optimal .info-container-block .num-vert-container .num-placer {
			color: var(--num-value-numcolor-ok);
		}
		.tit-elem .line-vert-container .line-element .square:nth-child(1) {
			background-color: var(--num-value-linecolor-ok);
		}
		.tit-elem .line-vert-container .line-element .square:nth-child(2) {
			background-color: var(--num-value-linecolor-ok);
		}
		
		.tit-elem .content-wrapper .val-container.higher-than-optim .info-container-block .num-vert-container .num-placer {
			color: var(--num-value-numcolor-bad);
		}
		.tit-elem.higher-than-optim .line-vert-container .line-element .square:nth-child(1) {
			background-color: var(--num-value-linecolor-bad);
		}
		.tit-elem.higher-than-optim .line-vert-container .line-element .square:nth-child(2) {
			background-color: var(--num-value-linecolor-ok);
		}
		
		.tit-elem .content-wrapper .val-container.higher-than-highest .info-container-block .num-vert-container .num-placer {
			color: var(--num-value-numcolor-awful);
		}
		.tit-elem.higher-than-highest .line-vert-container .line-element .square:nth-child(1) {
			background-color: var(--num-value-linecolor-awful);
		}
		.tit-elem.higher-than-highest .line-vert-container .line-element .square:nth-child(2) {
			background-color: var(--num-value-linecolor-ok);
		}
		
		.tit-elem .content-wrapper .val-container.disable .info-container-block .num-vert-container .num-placer {
			color: var(--num-value-numcolor-ok);
			opacity: 0.6;
		}
		.tit-elem .line-vert-container .line-element .square:nth-child(1) {
			background-color: var(--num-value-linecolor-ok);
		}
		.tit-elem .line-vert-container .line-element .square:nth-child(2) {
			background-color: var(--num-value-linecolor-ok);
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dlowestval', '_dhighestval', '_dlowcrit', '_dhighcrit', '_dcurrentval', '_douterstate', '_scaption', '_scaptionfontsize','_svaluefontsize','_sdisplaystate'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();

		if (name.includes('_d'))
			this[name].value = newValue;
		this.onUpdateDynamic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.tit-elem');

		let infoContainerBlock = theElemCont.querySelectorAll('.content-wrapper .name-container .info-container-block')[0];
		let captionBlock = infoContainerBlock.querySelectorAll('.caption-block')[0];
		let unitBlock = infoContainerBlock.querySelectorAll('.unit-block')[0];

		let valueBlock = theElemCont.querySelectorAll('.content-wrapper .val-container .num-vert-container .num-placer')[0];

		if ((this._scaptionfontsize.value != undefined) && (this._scaptionfontsize.value != '')) {
			infoContainerBlock.style.height = Math.round((this._scaptionfontsize.value) * 1.143) + 'px';

			captionBlock.style.height = Math.round((this._scaptionfontsize.value) * 1.143) + 'px';
			captionBlock.style.fontSize = parseInt(this._scaptionfontsize.value) + 'px';
			captionBlock.style.lineHeight = parseInt(this._scaptionfontsize.value) + 'px'

			unitBlock.style.height = Math.round((this._scaptionfontsize.value) * 1.357) + 'px';
			unitBlock.style.fontSize = Math.round((this._scaptionfontsize.value) * 0.786) + 'px';
			unitBlock.style.lineHeight = Math.round((this._scaptionfontsize.value) * 0.786) + 'px';
		} else {
			infoContainerBlock.style.height = '';

			captionBlock.style.height = '';
			captionBlock.style.fontSize = '';
			captionBlock.style.lineHeight = '';

			unitBlock.style.height = '';
			unitBlock.style.fontSize = '';
			unitBlock.style.lineHeight = '';
		}

		if ((this._svaluefontsize.value != undefined) && (this._svaluefontsize.value != '')) {
			valueBlock.style.fontSize = this._svaluefontsize.value + 'px';
			valueBlock.style.lineHeight = parseInt(parseInt(this._svaluefontsize.value) + 2) + 'px';
			valueBlock.style.height = parseInt(this._svaluefontsize.value) + 'px';
		} else {
			valueBlock.style.fontSize = '';
			valueBlock.style.lineHeight = '';
			valueBlock.style.height = '';
		}

		if (this._scaption.value == undefined || this._scaption.value == '')
			this._scaption.value = 'none';
		
		if (this._dcurrentval.unit) {
			captionBlock.innerHTML = this._scaption.value + ",\u00A0";
			unitBlock.innerHTML = '' + this._dcurrentval.unit + '';
		} else {
			captionBlock.innerHTML = this._scaption.value;
			unitBlock.innerHTML = '';
		}
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.tit-elem');
		let shadowParent = this.getRootNode().host;

		let valueEntity = theElemCont.querySelector('.content-wrapper .val-container');
		let valueContainer = valueEntity.querySelector('.info-container-block .num-placer');

		let infoContainerBlock = theElemCont.querySelector('.content-wrapper .name-container .info-container-block');
		let captionBlock = infoContainerBlock.querySelector('.caption-block');
		let unitBlock = infoContainerBlock.querySelector('.unit-block');

		let lowestVal = parseValue(this._dlowestval.value);
		let highestVal = parseValue(this._dhighestval.value);
		let lowCrit = parseValue(this._dlowcrit.value);
		let highCrit = parseValue(this._dhighcrit.value);
		let curVal = parseValue(this._dcurrentval.value);
		let curValStr = this._dcurrentval.overrideToString;

		let outerStateVal = parseValue(this._douterstate.value);
		let statDispState = parseValue(this._sdisplaystate.value);

		// let lvCon = this._dlowestval.isConnected;
		// let hvCon = this._dhighestval.isConnected;
		// let lcCon = this._dlowcrit.isConnected;
		// let hcCon = this._dhighcrit.isConnected;
		// let cvCon = this._dcurrentval.isConnected;

		if (curValStr == undefined)
			curValStr = 'Н/Д';

		setElemClasses(valueEntity);

		if (!isNaN(outerStateVal) && !isNaN(statDispState)) {
			if ((outerStateVal !== null) && (outerStateVal !== statDispState)) {
				if (isNaN(curVal) && isNaN(curValStr))
					styleSwitcher('unknown');
				else
					styleSwitcher('disable');
			}
		}

		valueContainer.innerHTML = curValStr;

		if (this._dcurrentval.unit) {
			captionBlock.innerHTML = this._scaption.value + ",\u00A0";
			unitBlock.innerHTML = '' + this._dcurrentval.unit + '';
		} else {
			captionBlock.innerHTML = this._scaption.value;
			unitBlock.innerHTML = '';
		}

		function parseValue(a) {
			let result;

			if ((a === undefined) || (a === '') || (a === 'undefined') || (a === null)) {
				result = NaN;
			} else {
				result = '' + a;
				result = result.replace(',', '.');
				result = parseFloat(result);
			}

			return result;
		}
		console.log(shadowParent.id + ' ' + this.id + ': ' + isNaN(lowestVal) + ' ' + lowestVal + ' ' + typeof this._dlowestval.value + ', ' + isNaN(lowCrit) + ' ' + lowCrit + ' ' + typeof this._dlowcrit.value + ', ' + isNaN(highCrit) + ' ' + highCrit + ' ' + typeof this._dhighcrit.value + ', ' + isNaN(highestVal) + ' ' + highestVal + ' ' + typeof this._dhighestval.value + ', ' + isNaN(curVal) + ' ' + curVal + ' ' + typeof this._dcurrentval.value);

		function setElemClasses(val) {
			// !(lvCon && hvCon && lcCon && hcCon && cvCon)
			if (isNaN(lowestVal) || isNaN(lowCrit) || isNaN(highCrit) || isNaN(highestVal) || isNaN(curVal)) {
				val.classList.add('hatched');
			} else {
				val.classList.remove('hatched');
			}
			if (!(isNaN(lowestVal) && isNaN(lowCrit) && isNaN(highCrit) && isNaN(highestVal) && isNaN(curVal))) {
				if (!isNaN(curVal)) {
					if (!(isNaN(lowestVal) && isNaN(lowCrit) && isNaN(highCrit) && isNaN(highestVal))) {
						if (!isNaN(highestVal) && (curVal >= highestVal))
							styleSwitcher('higher-than-highest');
						else if (!isNaN(highCrit) && (curVal >= highCrit))
							styleSwitcher('higher-than-optim');
						else if (!isNaN(lowestVal) && (curVal <= lowestVal))
							styleSwitcher('lower-than-lowest');
						else if (!isNaN(lowCrit) && (curVal <= lowCrit))
							styleSwitcher('lower-than-optim');
						else
							styleSwitcher('optimal');
					}
					else
						styleSwitcher('unknown');
				}
				else
					styleSwitcher('unknown');
			}
			else
				styleSwitcher('unknown');


			function styleSwitcher(y) {
				val.classList.remove('unknown');
				theElemCont.classList.remove('unknown');

				val.classList.remove('lower-than-lowest');
				theElemCont.classList.remove('lower-than-lowest')

				val.classList.remove('lower-than-optim');
				theElemCont.classList.remove('lower-than-optim');

				val.classList.remove('optimal');
				theElemCont.classList.remove('optimal');

				val.classList.remove('higher-than-optim');
				theElemCont.classList.remove('higher-than-optim');

				val.classList.remove('higher-than-highest');
				theElemCont.classList.remove('higher-than-highest');

				val.classList.remove('disable');
				theElemCont.classList.remove('disable');

				val.classList.add(y);
				theElemCont.classList.add(y);
			}
		}
		if (shadowParent !== undefined && shadowParent.classList.contains('multi-tit-elem')) {
			shadowParent.createBorder();
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.tit-elem');

		this.AddTooltip(theElemCont, {});
	}
})