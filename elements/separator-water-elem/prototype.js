register("separator-water-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");

	static get markup() {
		return `
		<div class="separator-water-elem">
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.51 128" preserveAspectRatio="xMaxYMax meet">
					<path d="M19.62,122.67C8.89,122.69.1,96.58,0,64.36S8.52,6,19.25,6Z"/>
					<rect x="19.26" y="0.75" width="9.5" height="126.5"/>
				</svg>
            </div>
            <div class="separator-water-body">
				<div class="separator-water-level-container">
					<div class="mid-overlay">
						<div class="bot-overlay">
							<level-for-barrels-elem class="separator-water-level" _sadditionallines="2" _sorient="1" id="0"></level-for-barrels-elem>
						</div>
					</div>
				</div>
				<div class="separator-water-center-container">
					<div class="naming-container">
						<div class="naming"></div>
					</div>
					<multi-tit-elem class="separator-water-multi-tit" _stitcount="2" id="1"></multi-tit-elem>
				</div>
				<div class="separator-water-pumps-container">
					<div class="mid-overlay">
						<div class="bot-overlay">
							<container-water-pump-elem class="separator-water-pump" id="2"></container-water-pump-elem>
							<container-water-pump-elem class="separator-water-pump" id="3"></container-water-pump-elem>
						</div>
					</div>
				</div>
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
		.separator-water-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
        .separator-water-elem .cap {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            box-sizing: border-box;
        }
        .separator-water-elem .cap svg {
            height: 100%;
        }
        .separator-water-elem .cap svg path {
            fill: var(--barrels-fill);
        }
		.separator-water-elem .cap svg rect {
			fill: var(--barrels-fill);
            stroke: var(--body-bg-color);
			stroke-miterlimit: 10;
			stroke-width: 1.5;
        }
        .separator-water-elem .separator-water-body {
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
		.separator-water-elem .separator-water-body .separator-water-level-container {
			display: block;
			width: 16.5%;
			height: 100%;
			background-color: #7fafae;
			border: 2px solid #7fafae;
			border-radius: 11px;
			box-sizing: border-box;
			overflow: hidden;
		}
		.separator-water-elem .separator-water-body .separator-water-level-container .mid-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #f5f5f8;
		}
		.separator-water-elem .separator-water-body .separator-water-level-container .mid-overlay .bot-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(127, 175, 174, 0.3);
			position: relative;
		}
		.separator-water-elem .separator-water-body .separator-water-level-container .mid-overlay .bot-overlay .separator-water-level {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.separator-water-elem .separator-water-body .separator-water-center-container {
			width: 36%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			box-sizing: border-box;
		}
		.separator-water-elem .separator-water-body .separator-water-center-container .separator-water-multi-tit {
			width: 100%;
			height: 65.3%;
		}
		.separator-water-elem .separator-water-body .separator-water-center-container .naming-container {
			position: absolute;
			top: -6px;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.separator-water-elem .separator-water-body .separator-water-center-container .naming-container .naming {
			display: block;
			text-align: center;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 19px;
			font-weight: 400;
			white-space: nowrap;
			color: var(--barrels-txt-color);
		}
		.separator-water-elem .separator-water-body .separator-water-pumps-container,
		.separator-water-elem .separator-water-body .separator-water-pumps-container {
			display: block;
			background-color: #7fafae;
			border: 2px solid #7fafae;
			width: 37.6%;
			height: 100%;
			border-radius: 11px;
			box-sizing: border-box;
			overflow: hidden;
		}
		.separator-water-elem .separator-water-body .separator-water-pumps-container .mid-overlay,
		.separator-water-elem .separator-water-body .separator-water-pumps-container .mid-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #f5f5f8;
		}
		.separator-water-elem .separator-water-body .separator-water-pumps-container .mid-overlay .bot-overlay,
		.separator-water-elem .separator-water-body .separator-water-pumps-container .mid-overlay .bot-overlay {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			background-color: rgba(127, 175, 174, 0.3);
		}
		.separator-water-elem .separator-water-body .separator-water-pumps-container .mid-overlay .bot-overlay .separator-water-pump {
			width: 50%;
			height: 100%;
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
		let ElemCont = this.shadowRoot.querySelector('.separator-water-elem');
		let level = ElemCont.querySelector('.separator-water-body .separator-water-level-container');
		let çontentBlockWidth = Math.ceil(ElemCont.querySelector('.separator-water-body').clientWidth - ((ElemCont.clientWidth * 0.015) * 2));
		let çontentBlockHeight = Math.ceil(ElemCont.querySelector('.separator-water-body').clientHeight - ((ElemCont.clientWidth * 0.022) * 2));
		let namingElem = ElemCont.querySelector('.separator-water-body .separator-water-center-container .naming-container .naming');

		let fs = this._sfontsize.value;
		let caption = this._scaption.value;

		level.style.width = (71 / çontentBlockWidth) * 100 + '%';

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
		let ElemCont = this.shadowRoot.querySelector('.separator-water-elem');
		let miltiTitElem = ElemCont.querySelector('.separator-water-body .separator-water-center-container .separator-water-multi-tit');
		let level = ElemCont.querySelector('.separator-water-body .separator-water-level-container .separator-water-level');
		let waterPumps = ElemCont.querySelectorAll('.separator-water-body .separator-water-pumps-container .separator-water-pump');

		if (!this.getAttribute('id')) {
			miltiTitElem.removeAttribute('id');
			miltiTitElem.UpdateDynamic();

			level.removeAttribute('id');
			level.UpdateDynamic();

			for (let i = 0; i < waterPumps.length; i++) {
				waterPumps[i].removeAttribute('id');
				waterPumps[i].UpdateDynamic();
			}
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.separator-water-elem');

		this.AddTooltip(theElemCont, {});
	}
})