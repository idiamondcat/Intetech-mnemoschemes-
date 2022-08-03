register("container-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");

	static get markup() {
		return `
		<div class="container-elem">
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.5 128" preserveAspectRatio="xMidYMid meet">
					<path d="M15.29,123.54C6.92,123.56.08,97.31,0,64.9S6.64,6.21,15,6.18Z"/>
					<rect x="14.96" y="0.75" width="9.5" height="126.5"/>
				</svg>
            </div>
            <div class="container-body">
				<div class="center-block">
					<div class="naming-container">
						<div class="naming"></div>
					</div>
					<multi-tit-elem class="container-multi-tit" _stitcount="3" id="0"></multi-tit-elem>
				</div>
                <div class="right-overlay">
					<div class="wrapper-level">
						<div class="mid-overlay">
							<div class="bot-overlay">
								<level-for-barrels-elem class="container-level" _sadditionallines="2" _sorient="0" id="1"></level-for-barrels-elem>
							</div>
						</div>
					</div>
                </div>
            </div>
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 128" preserveAspectRatio="xMidYMid meet">
					<path d="M11.2,123.22c8.37,0,15.09-26.23,15-58.54S19.29,6.2,10.92,6.22Z"/>
					<rect x="0.75" y="0.75" width="9.5" height="126.5"/>
				</svg>
            </div>
		</div>
		`;
	}
	static get style() {
		return `
		.container-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
        .container-elem .cap {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            box-sizing: border-box;
        }
        .container-elem .cap svg {
            height: 100%;
        }
        .container-elem .cap svg path {
            fill: var(--barrels-fill);
        }
		.container-elem .cap svg rect {
			fill: var(--barrels-fill);
            stroke: var(--body-bg-color);
			stroke-miterlimit: 10;
			stroke-width: 1.5;
        }
        .container-elem .container-body {
            height: 92.5%;
            flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 4.3% 3.3% 2.8% 3.3%;
            background-color: var(--barrels-fill);
            position: relative;
			box-sizing: border-box;
			overflow: hidden;
        }
		.container-elem .container-body .right-overlay {
			height: 100%;
			display: flex;
		}
		.container-elem .container-body .right-overlay .wrapper-level {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #7fafae;
			border: 2px solid #7fafae;
			border-radius: 11px;
			box-sizing: border-box;
			overflow: hidden;
		}
		.container-elem .container-body .right-overlay .wrapper-level .mid-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #f5f5f8;
		}
		.container-elem .container-body .right-overlay .wrapper-level .mid-overlay .bot-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(127, 175, 174, 0.3);
			position: relative;
		}
		.container-elem .container-body .right-overlay .wrapper-level .bot-overlay .container-level {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.container-elem .container-body .center-block {
			width: 63.6%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			box-sizing: border-box;
			position: relative;
		}
		.container-elem .container-body .center-block .naming-container {
			width: 100%;
			position: absolute;
			top: -7px;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.container-elem .container-body .center-block .naming-container .naming {
			display: block;
			text-align: center;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 19px;
			font-weight: 400;
			white-space: nowrap;
			color: var(--barrels-txt-color);
		}
		.container-elem .container-body .center-block .container-multi-tit {
			width: 100%;
			height: 80%;
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
		let ElemCont = this.shadowRoot.querySelector('.container-elem');
		let çontentBlockWidth = Math.ceil(ElemCont.querySelector('.container-body').clientWidth - ((ElemCont.clientWidth * 0.03) * 2));
		let rightBlock = ElemCont.querySelector('.container-body .right-overlay');
		let namingElem = ElemCont.querySelector('.container-body .center-block .naming-container .naming');

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

		rightBlock.style.width = (71 / çontentBlockWidth) * 100 + '%';
	}

	onUpdateDynamic = function() {
		let ElemCont = this.shadowRoot.querySelector('.container-elem');
		let miltiTitElem = ElemCont.querySelector('.container-body .center-block .container-multi-tit');
		let rightLevel = ElemCont.querySelector('.container-body .right-overlay .container-level');

		if (this.getAttribute('id') == null) {
			miltiTitElem.removeAttribute('id');
			rightLevel.removeAttribute('id');
			miltiTitElem.UpdateDynamic();
			rightLevel.UpdateDynamic();
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.container-elem');

		this.AddTooltip(theElemCont, {});
	}
})