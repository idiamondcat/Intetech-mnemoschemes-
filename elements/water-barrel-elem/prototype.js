register("water-barrel-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_stitcount = new Parameter(Type.Numeric, "Количество строк мультитита");

	static get markup() {
		return `
		<div class="water-barrel-elem">
			<div class="cap">
				<svg class="water-barrel-cap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 266.5 42.75" preserveAspectRatio="xMidYMid meet">
					<rect class="cls-1" x="0.75" y="31" width="265" height="11"/>
					<polygon class="cls-2" points="5.03 30 261.75 30 133.39 0 5.03 30"/>
				</svg>
			</div>
			<div class="water-barrel-body">
				<div class="left">
					<div class="mid-overlay">
						<div class="bot-overlay">
							<level-for-barrels-elem class="water-barrel-level" _sadditionallines="2" _sorient="1" id="0"></level-for-barrels-elem>
						</div>
					</div>
				</div>
				<div class="right">
					<div class="naming-container">
						<div class="naming"></div>
					</div>
					<multi-tit-elem class="water-barrel-multi-tit" id="1"></multi-tit-elem>
				</div>
			</div>
        </div>
		`;
	}

	static get style() {
		return `
		.water-barrel-elem {
			display: flex;
			flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.water-barrel-elem .cap {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            box-sizing: border-box;
        }
        .water-barrel-elem .cap svg {
            width: 100%;
        }
		.water-barrel-elem .cap svg polygon {
			fill: var(--barrels-fill);
		}
		.water-barrel-elem .cap svg rect {
			fill: var(--barrels-fill);
			stroke: var(--body-bg-color);
			stroke-width: 1.5;
		 }
		.water-barrel-elem .water-barrel-body {
			width: 96.5%;
			display: flex;
			flex-grow: 1;
			align-items: center;
			justify-content: space-between;
			padding: 6.8% 4.3% 2.4% 4.3%;
			background-color: var(--barrels-fill);
			border-bottom-left-radius: 12px;
			border-bottom-right-radius: 12px;
			box-sizing: border-box;
			overflow: hidden;
		}
		.water-barrel-elem .water-barrel-body .left {
			display: block;
			height: 100%;
			width: 31.7%;
			background-color: #7fafae;
			border: 2px solid #7fafae;
			border-radius: 11px;
			box-sizing: border-box;
			overflow: hidden;
		}
		.water-barrel-elem .water-barrel-body .left .mid-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #f5f5f8;
		}
		.water-barrel-elem .water-barrel-body .left .mid-overlay .bot-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(127, 175, 174, 0.3);
			position: relative;
		}
		.water-barrel-elem .water-barrel-body .left .mid-overlay .bot-overlay .water-barrel-level {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.water-barrel-elem .water-barrel-body .right {
			width: 59.8%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
		}
		.water-barrel-elem .water-barrel-body .right .naming-container {
			width: 100%;
			position: absolute;
			top: -15px;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.water-barrel-elem .water-barrel-body .right .naming-container .naming {
			display: block;
			text-align: center;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 19px;
			font-weight: 400;
			white-space: nowrap;
			color: var(--barrels-txt-color);
		}
		.water-barrel-elem .water-barrel-body .right .water-barrel-multi-tit {
			width: 100%;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_scaption', '_sfontsize', '_stitcount'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let ElemCont = this.shadowRoot.querySelector('.water-barrel-elem');
		let rightBlock = ElemCont.querySelector('.water-barrel-body .right');
		let namingElem = ElemCont.querySelector('.water-barrel-body .right .naming-container .naming');
		let mt = ElemCont.querySelector('.water-barrel-body .right .water-barrel-multi-tit');
		let titCount = parseInt(this._stitcount.value);

		let fs = this._sfontsize.value;
		let caption = this._scaption.value;

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
				mt.style.height = '32.6%';
				rightBlock.style.justifyContent = 'center';
			} else if (titCount == 2) {
				mt.style.height = '65.3%';
				rightBlock.style.justifyContent = 'center';
			} else if (titCount == 3) {
				mt.style.height = '97.9%';
				rightBlock.style.justifyContent = 'flex-end';
			}
		}
	}

	onUpdateDynamic = function() {
		let ElemCont = this.shadowRoot.querySelector('.water-barrel-elem');
		let level = ElemCont.querySelector('.water-barrel-body .left .water-barrel-level');
		let mt = ElemCont.querySelector('.water-barrel-body .right .water-barrel-multi-tit');

		if (!this.getAttribute('id')) {
			level.removeAttribute('id');
			level.UpdateDynamic();
			mt.removeAttribute('id');
			mt.UpdateDynamic();
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.water-barrel-elem');

		this.AddTooltip(theElemCont, {});
	}
})