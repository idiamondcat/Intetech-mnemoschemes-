register("separator-h-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_sleftblock = new Parameter(Type.Numeric, "Показать/скрыть левый блок");
	_sleftblockcontent = new Parameter(Type.String, "pump - level");
	_srightblock = new Parameter(Type.Numeric, "Показать/скрыть правый блок");
	_srightblockcontent = new Parameter(Type.String, "pump - level");
	_stitcount = new Parameter(Type.Numeric, "Количество строк мультитита");
	_sleftpumpcaption = new Parameter(Type.String, "Подписи насоса");
	_srightpumpcaption = new Parameter(Type.String, "Подписи насоса");
	_sstatedisplayer = new Parameter(Type.Numeric, "Показать/скрыть блок состояния");

	static get markup() {
		return `
		<div class="separator-h-elem">
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 128" preserveAspectRatio="xMaxYMax meet">
					<path d="M19.62,122.67C8.89,122.69.1,96.58,0,64.35S8.52,6,19.25,6Z"/>
					<rect x="19.26" y="0.75" width="9.5" height="126.5"/>
				</svg>
            </div>
            <div class="separator-body">
                <div class="left-overlay">
					<div class="separator-h-level-container">
						<div class="mid-overlay">
							<div class="bot-overlay">
								<level-for-barrels-elem class="separator-h-level" _sadditionallines="2" _sorient="1" id="0"></level-for-barrels-elem>
							</div>
						</div>
					</div>
					<div class="water-pump-container">
						<div class="mid-overlay">
							<div class="bot-overlay">
								<container-water-pump-elem class="separator-water-pump" id="1"></container-water-pump-elem>
							</div>
						</div>
					</div>
                </div>
				<div class="center-block">
					<div class="naming-container">
						<div class="naming"></div>
					</div>
						<multi-tit-elem class="separator-h-multi-tit" id="2"></multi-tit-elem>
						<state-displayer-elem class="separator-h-state-displayer" _sfontsize="20" id="3"></state-displayer-elem>
				</div>
                <div class="right-overlay">
					<div class="separator-h-level-container">
						<div class="mid-overlay">
							<div class="bot-overlay">
								<level-for-barrels-elem class="separator-h-level" _sadditionallines="2" _sorient="0" id="4"></level-for-barrels-elem>
							</div>
						</div>
					</div>
					<div class="water-pump-container">
						<div class="mid-overlay">
							<div class="bot-overlay">
								<container-water-pump-elem class="separator-water-pump" id="5"></container-water-pump-elem>
							</div>
						</div>
					</div>
                </div>
				<reservoir-elem class="separator-h-reservoir" id="6"></reservoir-elem>
            </div>
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 128" preserveAspectRatio="xMaxYMax meet">
					<path d="M11,122.2c10.73,0,19.35-26.16,19.25-58.39S21.32,5.48,10.59,5.5Z"/>
					<rect x="0.75" y="0.75" width="9.5" height="126.5"/>
				</svg>
            </div>
		</div>
		`;
	}
	static get style() {
		return `
		.separator-h-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
        .separator-h-elem .cap {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            box-sizing: border-box;
        }
        .separator-h-elem .cap svg {
            height: 100%;
        }
        .separator-h-elem .cap svg path {
            fill: var(--barrels-fill);
        }
		.separator-h-elem .cap svg rect {
			fill: var(--barrels-fill);
            stroke: var(--body-bg-color);
			stroke-miterlimit: 10;
			stroke-width: 1.5;
        }
        .separator-h-elem .separator-body {
            height: 92.5%;
            flex-grow: 1;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			padding: 5% 2% 3.3% 2%;
            background-color: var(--barrels-fill);
            position: relative;
			box-sizing: border-box;
			overflow: hidden;
        }
		.separator-h-elem .separator-body .left-overlay.visible,
		.separator-h-elem .separator-body .right-overlay.visible {
			display: flex;
		}
		.separator-h-elem .separator-body .left-overlay.visible.level,
		.separator-h-elem .separator-body .right-overlay.visible.level {
			height: 100%;
		}
		.separator-h-elem .separator-body .left-overlay.visible.pump,
		.separator-h-elem .separator-body .right-overlay.visible.pump {
			height: 100%;
		}
		.separator-h-elem .separator-body .left-overlay.invisible,
		.separator-h-elem .separator-body .right-overlay.invisible {
			display: none;
		}
		.separator-h-elem .separator-body .left-overlay .separator-h-level-container,
		.separator-h-elem .separator-body .right-overlay .separator-h-level-container {
			display: none;
		}
		.separator-h-elem .separator-body .left-overlay .separator-h-level-container.active,
		.separator-h-elem .separator-body .right-overlay .separator-h-level-container.active {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #7fafae;
			border: 2px solid #7fafae;
			border-radius: 11px;
			box-sizing: border-box;
			overflow: hidden;
		}
		.separator-h-elem .separator-body .left-overlay .separator-h-level-container .mid-overlay,
		.separator-h-elem .separator-body .right-overlay .separator-h-level-container .mid-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #f5f5f8;
		}
		.separator-h-elem .separator-body .left-overlay .separator-h-level-container .mid-overlay .bot-overlay,
		.separator-h-elem .separator-body .right-overlay .separator-h-level-container .mid-overlay .bot-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(127, 175, 174, 0.3);
			position: relative;
		}
		.separator-h-elem .separator-body .left-overlay .separator-h-level-container .mid-overlay .bot-overlay .separator-h-level,
		.separator-h-elem .separator-body .right-overlay .separator-h-level-container .mid-overlay .bot-overlay .separator-h-level {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.separator-h-elem .separator-body .left-overlay .water-pump-container,
		.separator-h-elem .separator-body .right-overlay .water-pump-container {
			display: none;
		}
		.separator-h-elem .separator-body .left-overlay .water-pump-container.active,
		.separator-h-elem .separator-body .right-overlay .water-pump-container.active {
			display: block;
			background-color: #7fafae;
			border: 2px solid #7fafae;
			width: 100%;
			height: 100%;
			border-radius: 11px;
			box-sizing: border-box;
			overflow: hidden;
		}
		.separator-h-elem .separator-body .left-overlay .water-pump-container .mid-overlay,
		.separator-h-elem .separator-body .right-overlay .water-pump-container .mid-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #f5f5f8;
		}
		.separator-h-elem .separator-body .left-overlay .water-pump-container .mid-overlay .bot-overlay,
		.separator-h-elem .separator-body .right-overlay .water-pump-container .mid-overlay .bot-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(127, 175, 174, 0.3);
		}
		.separator-h-elem .separator-body .center-block {
			width: 47%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			position: relative;
		}
		.separator-h-elem .separator-body .center-block .naming-container {
			width: 100%;
			position: absolute;
			top: -14px;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.separator-h-elem .separator-body .center-block .naming-container .naming {
			display: block;
			text-align: center;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 19px;
			font-weight: 400;
			white-space: nowrap;
			color: var(--barrels-txt-color);
		}
		.separator-h-elem .separator-body .center-block .separator-h-multi-tit {
			width: 100%;
			height: 29.7%;
		}
		.separator-h-elem .separator-body .center-block .separator-h-state-displayer {
			display: none;
		}
		.separator-h-elem .separator-body .center-block .separator-h-state-displayer.active {
			display: block;
			width: 100%;
			height: 29.7%;
		}
		.separator-h-elem .separator-body .separator-h-reservoir {
			position: absolute;
			bottom: -2%;
			left: 0;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_sleftblock', '_sleftblockcontent', '_srightblock', '_srightblockcontent', '_scaption', '_sfontsize', '_stitcount', '_sstatedisplayer', '_sleftpumpcaption', '_srightpumpcaption'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let ElemCont = this.shadowRoot.querySelector('.separator-h-elem');
		let çontentBlockWidth = Math.ceil(ElemCont.querySelector('.separator-body').clientWidth - ((ElemCont.clientWidth * 0.03) * 2));
		let çontentBlockHeight = Math.ceil(ElemCont.querySelector('.separator-body').clientHeight - ((ElemCont.clientHeight * 0.05) + (ElemCont.clientHeight * 0.03)));
		let leftBlock = ElemCont.querySelector('.separator-body .left-overlay');
		let rightBlock = ElemCont.querySelector('.separator-body .right-overlay');
		let centerBlock = ElemCont.querySelector('.separator-body .center-block');
		let leftPump = leftBlock.querySelector('.water-pump-container .separator-water-pump');
		let rightPump = rightBlock.querySelector('.water-pump-container .separator-water-pump');
		let namingElem = ElemCont.querySelector('.separator-body .center-block .naming-container .naming');
		let mt = ElemCont.querySelector('.separator-body .center-block .separator-h-multi-tit');
		let stateDisplayerElem = ElemCont.querySelector('.separator-body .center-block .separator-h-state-displayer');
		let reservoir = ElemCont.querySelector('.separator-body .separator-h-reservoir');
		let titCount = parseInt(this._stitcount.value);

		let fs = this._sfontsize.value;
		let caption = this._scaption.value;

		reservoir.style.width = (80 / çontentBlockWidth) * 100 + '%';
		reservoir.style.height = (27 / çontentBlockHeight) * 100 + '%';

		if ((this._sfontsize.value !== undefined) && (this._sfontsize.value !== '')) {
			namingElem.style.height = parseInt(this._sfontsize.value) + 'px';
			namingElem.style.fontSize = parseInt(this._sfontsize.value) + 'px';
		} else {
			namingElem.style.fontSize = '';
			namingElem.style.height = '';
		}

		if ((caption !== undefined) && (caption !== ''))
			namingElem.innerHTML = '' + caption;
		else
			namingElem.innerHTML = '';

		if (mt !== null) {
			mt._stitcount = this._stitcount;
			mt.UpdateStatic();

			if (isNaN(titCount) || titCount == 1) {
				if (this._sstatedisplayer.value == null || this._sstatedisplayer.value == 0) {
					stateDisplayerElem.classList.add('active');
					centerBlock.style.justifyContent = 'flex-end';
					mt.style.marginBottom = '4%';
				} else if (this._sstatedisplayer.value == 1) {
					stateDisplayerElem.classList.remove('active');
					centerBlock.style.justifyContent = 'center';
					mt.style.marginBottom = '0';
				}
			} else if (titCount > 1) {
				stateDisplayerElem.classList.remove('active');

				switch(titCount) {
					case 2: mt.style.height = '59.4%'; mt.style.marginBottom = '0'; centerBlock.style.justifyContent = 'center';
					break;
					case 3: mt.style.height = '89%'; mt.style.marginBottom = '0'; centerBlock.style.justifyContent = 'flex-end';
					break;
				}
			}
		}


		if (this._sleftblock.value == "0" || this._sleftblock.value == undefined) {
			leftBlock.classList.add('visible');
			leftBlock.classList.remove('invisible');

			switch(this._sleftblockcontent.value) {
				case 'level':
					leftBlock.classList.add('level');
					leftBlock.classList.remove('pump'); 
					leftBlock.querySelector('.separator-h-level-container').classList.add('active');
					leftBlock.querySelector('.water-pump-container').classList.remove('active');
					leftBlock.style.width = (71 / çontentBlockWidth) * 100 + '%';
					break;
				case 'pump':
					leftBlock.classList.add('pump');
					leftBlock.classList.remove('level');
					leftBlock.querySelector('.water-pump-container').classList.add('active');
					leftBlock.querySelector('.separator-h-level-container').classList.remove('active');
					leftBlock.style.width = (68 / çontentBlockWidth) * 100 + '%';
					break;
				default:
					leftBlock.classList.add('level');
					leftBlock.classList.remove('pump');
					leftBlock.querySelector('.separator-h-level-container').classList.add('active');
					leftBlock.querySelector('.water-pump-container').classList.remove('active');
					leftBlock.style.width = (71 / çontentBlockWidth) * 100 + '%';
					break;
			}
		}
		else if (this._sleftblock.value == "1") {
			leftBlock.classList.add('invisible');
			leftBlock.classList.remove('visible');
		}

		if (this._srightblock.value == "0" || this._srightblock.value == undefined) {
			rightBlock.classList.add('visible');
			rightBlock.classList.remove('invisible');

			switch(this._srightblockcontent.value) {
				case 'level':
					rightBlock.classList.add('level');
					rightBlock.classList.remove('pump'); 
					rightBlock.querySelector('.separator-h-level-container').classList.add('active');
					rightBlock.querySelector('.water-pump-container').classList.remove('active');
					rightBlock.style.width = ((71 / çontentBlockWidth) * 100).toFixed(1) + '%';
					break;
				case 'pump':
					rightBlock.classList.add('pump');
					rightBlock.classList.remove('level'); 
					rightBlock.querySelector('.water-pump-container').classList.add('active');
					rightBlock.querySelector('.separator-h-level-container').classList.remove('active');
					rightBlock.style.width = (68 / çontentBlockWidth) * 100 + '%';
					break;
				default:
					rightBlock.classList.add('level');
					rightBlock.classList.remove('pump'); 
					rightBlock.querySelector('.separator-h-level-container').classList.add('active');
					rightBlock.querySelector('.water-pump-container').classList.remove('active');
					rightBlock.style.width = (71 / çontentBlockWidth) * 100 + '%';
					break;
			}
		}
		else if (this._srightblock.value == "1") {
			rightBlock.classList.add('invisible');
			rightBlock.classList.remove('visible');
		}

		if (leftPump !== null) {
			if (this._sleftpumpcaption.value !== null && this._sleftpumpcaption.value !== undefined) {
				leftPump._scaption = this._sleftpumpcaption;
				leftPump.UpdateStatic();
			}
		}

		if (rightPump !== null) {
			if (this._srightpumpcaption.value !== null && this._srightpumpcaption.value !== undefined) {
				rightPump._scaption = this._srightpumpcaption;
				rightPump.UpdateStatic();
			}
		}
	}

	onUpdateDynamic = function() {
		let ElemCont = this.shadowRoot.querySelector('.separator-h-elem');
		let leftBlock = ElemCont.querySelector('.separator-body .left-overlay');
		let rightBlock = ElemCont.querySelector('.separator-body .right-overlay');
		let miltiTitElem = ElemCont.querySelector('.separator-body .center-block .separator-h-multi-tit');
		let leftLevel = leftBlock.querySelector('.separator-h-level-container .mid-overlay .bot-overlay .separator-h-level');
		let leftPump = leftBlock.querySelector('.water-pump-container .separator-water-pump');
		let rightLevel = rightBlock.querySelector('.separator-h-level-container .mid-overlay .bot-overlay .separator-h-level');
		let rightPump = rightBlock.querySelector('.water-pump-container .separator-water-pump');
		let stateDisplayerElem = ElemCont.querySelector('.separator-body .center-block .separator-h-state-displayer');
		let reservoir = ElemCont.querySelector('.separator-body .separator-h-reservoir');

		if (!this.getAttribute('id')) {
			leftLevel.removeAttribute('id');
			leftLevel.UpdateDynamic();
			leftPump.removeAttribute('id');
			leftPump.UpdateDynamic();
			miltiTitElem.removeAttribute('id');
			miltiTitElem.UpdateDynamic();
			stateDisplayerElem.removeAttribute('id');
			stateDisplayerElem.UpdateDynamic();
			rightLevel.removeAttribute('id');
			rightLevel.UpdateDynamic();
			rightPump.removeAttribute('id');
			rightPump.UpdateDynamic();
			reservoir.removeAttribute('id');
			reservoir.UpdateStatic();
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.separator-h-elem');

		this.AddTooltip(theElemCont, {});
	}
})