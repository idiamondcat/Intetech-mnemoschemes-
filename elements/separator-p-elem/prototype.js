register("separator-p-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");

	static get markup() {
		return `
		<div class="separator-p-elem">
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.51 128" preserveAspectRatio="xMaxYMax meet">
					<path d="M19.62,122.67C8.89,122.69.1,96.58,0,64.36S8.52,6,19.25,6Z"/>
					<rect x="19.26" y="0.75" width="9.5" height="126.5"/>
				</svg>
            </div>
            <div class="separator-p-body">
				<div class="separator-p-level-container">
					<div class="mid-overlay">
						<div class="bot-overlay">
							<level-for-barrels-elem class="separator-p-level" _sadditionallines="2" _sorient="1" id="0"></level-for-barrels-elem>
						</div>
					</div>
				</div>
				<div class="separator-p-level-container">
					<div class="mid-overlay">
						<div class="bot-overlay">
							<level-for-barrels-elem class="separator-p-level" _sadditionallines="2" _sorient="1" id="1"></level-for-barrels-elem>
						</div>
					</div>
				</div>
				<div class="separator-p-center-container">
					<div class="naming-container">
						<div class="naming"></div>
					</div>
					<multi-tit-elem class="separator-p-multi-tit" _stitcount="2" id="2"></multi-tit-elem>
				</div>
				<div class="separator-p-level-container">
					<div class="mid-overlay">
						<div class="bot-overlay">
							<level-for-barrels-elem class="separator-p-level" _sadditionallines="2" _sorient="0" id="3"></level-for-barrels-elem>
						</div>
					</div>
				</div>
				<reservoir-elem class="separator-p-reservoir" id="4"></reservoir-elem>
            </div>
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.21 128" preserveAspectRatio="xMaxYMax meet">
					<path d="M11,122.2c10.73,0,19.35-26.16,19.25-58.39S21.32,5.48,10.59,5.5Z"/>
					<rect x="0.75" y="0.75" width="9.5" height="126.5"/>
				</svg>
            </div>
		</div>
		`;
	}
	static get style() {
		return `
		.separator-p-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
        .separator-p-elem .cap {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            box-sizing: border-box;
        }
        .separator-p-elem .cap svg {
            height: 100%;
        }
        .separator-p-elem .cap svg path {
            fill: var(--barrels-fill);
        }
		.separator-p-elem .cap svg rect {
			fill: var(--barrels-fill);
            stroke: var(--body-bg-color);
			stroke-miterlimit: 10;
			stroke-width: 1.5;
        }
        .separator-p-elem .separator-p-body {
            height: 92.5%;
            flex-grow: 1;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			padding: 2.2% 1.5%;
            background-color: var(--barrels-fill);
            position: relative;
			box-sizing: border-box;
			overflow: hidden;
        }
		.separator-p-elem .separator-p-body .separator-p-level-container {
			display: block;
			width: 16.5%;
			height: 100%;
			background-color: #7fafae;
			border: 2px solid #7fafae;
			border-radius: 11px;
			box-sizing: border-box;
			overflow: hidden;
		}
		.separator-p-elem .separator-p-body .separator-p-level-container .mid-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #f5f5f8;
		}
		.separator-p-elem .separator-p-body .separator-p-level-container .mid-overlay .bot-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(127, 175, 174, 0.3);
			position: relative;
		}
		.separator-p-elem .separator-p-body .separator-p-level-container .mid-overlay .bot-overlay .separator-p-level {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.separator-p-elem .separator-p-body .separator-p-center-container {
			width: 36%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			box-sizing: border-box;
		}
		.separator-p-elem .separator-p-body .separator-p-center-container .separator-p-multi-tit {
			width: 100%;
			height: 65.3%;
		}
		.separator-p-elem .separator-p-body .separator-p-center-container .naming-container {
			position: absolute;
			top: -6px;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.separator-p-elem .separator-p-body .separator-p-center-container .naming-container .naming {
			display: block;
			text-align: center;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 19px;
			font-weight: 400;
			white-space: nowrap;
			color: var(--barrels-txt-color);
		}
		.separator-p-elem .separator-p-body .separator-p-reservoir {
			position: absolute;
			bottom: -2%;
			left: 21%;
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
		let ElemCont = this.shadowRoot.querySelector('.separator-p-elem');
		let levels = ElemCont.querySelectorAll('.separator-p-body .separator-p-level-container');
		let çontentBlockWidth = Math.ceil(ElemCont.querySelector('.separator-p-body').clientWidth - ((ElemCont.clientWidth * 0.015) * 2));
		let çontentBlockHeight = Math.ceil(ElemCont.querySelector('.separator-p-body').clientHeight - ((ElemCont.clientWidth * 0.022) * 2));
		let namingElem = ElemCont.querySelector('.separator-p-body .separator-p-center-container .naming-container .naming');
		let reservoir = ElemCont.querySelector('.separator-p-body .separator-p-reservoir');

		let fs = this._sfontsize.value;
		let caption = this._scaption.value;

		levels.forEach(elem => {
			elem.style.width = (71 / çontentBlockWidth) * 100 + '%';
		});

		reservoir.style.width = (80 / çontentBlockWidth) * 100 + '%';
		reservoir.style.height = (27 / çontentBlockHeight) * 100 + '%';


		if ((this._sfontsize.value !== undefined) && (this._sfontsize.value !== '')) {
			namingElem.style.height = parseInt(this._sfontsize.value) + 'px';
			namingElem.style.fontSize = parseInt(this._sfontsize.value) + 'px';
		} else {
			namingElem.style.fontSize = '';
			namingElem.style.height = '';
		}

		if ((caption !== undefined) && (caption !== '')) {
			namingElem.innerHTML = '' + caption;
		} else {
			namingElem.innerHTML = '';
		}
	}

	onUpdateDynamic = function() {
		let ElemCont = this.shadowRoot.querySelector('.separator-p-elem');
		let miltiTitElem = ElemCont.querySelector('.separator-p-body .separator-p-center-container .separator-p-multi-tit');
		let level = ElemCont.querySelectorAll('.separator-p-body .separator-p-level-container .separator-p-level');
		let reservoir = ElemCont.querySelector('.separator-p-body .separator-p-reservoir');

		if (!this.getAttribute('id')) {
			miltiTitElem.removeAttribute('id');
			miltiTitElem.UpdateDynamic();

			for (let i = 0; i < level.length; i++) {
				level[i].removeAttribute('id');
				level[i].UpdateDynamic();
			}

			reservoir.removeAttribute('id');
			reservoir.UpdateStatic();
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.separator-p-elem');

		this.AddTooltip(theElemCont, {});
	}
})