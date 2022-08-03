register("torch-container-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");

	static get markup() {
		return `
		<div class="torch-container-elem">
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.51 147.1" preserveAspectRatio="xMaxYMax meet">
					<path d="M19.62,141.08C8.89,141.1.1,111.05,0,74S8.52,6.78,19.25,6.75Z"/>
					<rect x="19.26" y="0.75" width="9.5" height="145.6"/>
				</svg>
            </div>
            <div class="torch-container-body">
                <div class="left-block">
                    <container-water-pump-elem class="torch-container-water-pump" _scaption="Text"></container-water-pump-elem>
                </div>
				<div class="center-block">
					<naming-elem class="torch-container-naming" _sfontsize="20"></naming-elem>
					<multi-tit-elem class="torch-container-multi-tit" _stitcount="3"></multi-tit-elem>
				</div>
                <div class="right-block">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 49.7 98" preserveAspectRatio="xMaxYMax meet">
                        <path class="dark-layer" d="M49.7,85.59C49.7,93.51,44.65,98,38.48,98H11.22C5.05,98,0,93.51,0,85.59V12.41C0,4.49,5.05,0,11.22,0H38.48C44.65,0,49.7,4.49,49.7,12.41Zm-11.22,10c5.16,0,9.35-3.39,9.35-10V12.41c0-6.62-4.19-10-9.35-10H11.22c-5.16,0-9.35,3.39-9.35,10V85.59c0,6.62,4.19,10,9.35,10Z"/>
                            <g>
                                <path class="bot-layer" d="M10.79,95.6c-5.21,0-9.45-3.39-9.45-10V12.41c0-6.62,4.24-10,9.45-10H38.38c5.21,0,9.45,3.39,9.45,10V85.59c0,6.62-4.24,10-9.45,10Z"/>
                                <path class="mid-layer" d="M10.79,95.6c-5.21,0-9.45-3.39-9.45-10V12.41c0-6.62,4.24-10,9.45-10H38.38c5.21,0,9.45,3.39,9.45,10V85.59c0,6.62-4.24,10-9.45,10Z"/>
                                <path class="top-layer" d="M10.79,95.6c-5.21,0-9.45-3.39-9.45-10V12.41c0-6.62,4.24-10,9.45-10H38.38c5.21,0,9.45,3.39,9.45,10V85.59c0,6.62-4.24,10-9.45,10Z"/>
                            </g>
                    </svg>
					<level-for-barrels-elem class="torch-container-level" _sadditionallines="2" _sorient="0"></level-for-barrels-elem>
                </div>
            </div>
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.21 147.1" preserveAspectRatio="xMaxYMax meet">
					<path d="M11,140.54c10.73,0,19.35-30.11,19.25-67.21S21.32,6.19,10.59,6.21Z"/>
					<rect x="0.75" y="0.75" width="9.5" height="145.6"/>
				</svg>
            </div>
		</div>
		`;
	}
	static get style() {
		return `
		.torch-container-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
        .torch-container-elem .cap {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            box-sizing: border-box;
        }
        .torch-container-elem .cap svg {
            height: 100%;
        }
        .torch-container-elem .cap svg path {
            fill: var(--barrels-fill);
        }
		.torch-container-elem .cap svg rect {
			fill: var(--barrels-fill);
            stroke: #e9e9e9;
			stroke-miterlimit: 10;
			stroke-width: 1.5;
        }
        .torch-container-elem .torch-container-body {
            height: 92.5%;
            flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 3.3% 3.7%;
            background-color: var(--barrels-fill);
            position: relative;
			box-sizing: border-box;
			overflow: hidden;
        }
		.torch-container-elem .torch-container-body .left-block {
			width: 21.5%;
			height: 100%;
			position: relative;
		}
		.torch-container-elem .torch-container-body .right-block {
			height: 100%;
			position: relative;
		}
		.torch-container-elem .torch-container-body .right-block .separator-h-level {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
        .torch-container-elem .torch-container-body .right-block svg {
            height: 100%;
        }
        .torch-container-elem .torch-container-body .right-block svg .dark-layer,
        .torch-container-elem .torch-container-body .right-block svg .bot-layer {
            fill: #7fafae;
        }
        .torch-container-elem .torch-container-body .right-block svg .mid-layer {
            fill: #ffffff;
        }
        .torch-container-elem .torch-container-body .right-block svg .top-layer {
            fill: #7fafae;
            opacity: 0.3;
        }
		.torch-container-elem .torch-container-body .center-block {
			width: 47.3%;
			height: 100%;
			position: relative;
		}
		.torch-container-elem .torch-container-body .center-block .torch-container-naming {
			width: 100%;
			position: absolute;
			top: -8px;
		}
		.torch-container-elem .torch-container-body .center-block .torch-container-multi-tit {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 0);
		}
		.torch-container-elem .torch-container-body .right-block .torch-container-level {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.torch-container-elem .torch-container-body .left-block .torch-container-water-pump {
			width: 100%;
			height: 81.5%;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 0);
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
		let ElemCont = this.shadowRoot.querySelector('.torch-container-elem');
		let leftBlock = ElemCont.querySelector('.torch-container-body .left-block');
		let rightBlock = ElemCont.querySelector('.torch-container-body .right-block');
		let namingContainer = ElemCont.querySelector('.torch-container-body .torch-container-naming');

		if (namingContainer !== null) {
			namingContainer._scaption = this._scaption;
			namingContainer.UpdateStatic();
		}

		// if (this._sleftblock.value == 0 || isNaN(this._sleftblock.value)) {
		// 	leftBlock.classList.add('visible');
		// 	leftBlock.classList.remove('invisible');
		// }
		// else if (this._sleftblock.value == 1) {
		// 	leftBlock.classList.add('invisible');
		// 	leftBlock.classList.remove('visible');
		// }

		// if (this._srightblock.value == 0 || isNaN(this._srightblock.value)) {
		// 	rightBlock.classList.add('visible');
		// 	rightBlock.classList.remove('invisible');
		// }
		// else if (this._srightblock.value == 1) {
		// 	rightBlock.classList.add('invisible');
		// 	rightBlock.classList.remove('visible');
		// }
	}

	onUpdateDynamic = function() {
		let ElemCont = this.shadowRoot.querySelector('.torch-container-elem');
		let waterPump = ElemCont.querySelector('.torch-container-body .left-block .torch-container-water-pump');
		let namingContainer = ElemCont.querySelector('.torch-container-body .center-block .torch-container-naming');
		let miltiTitElem = ElemCont.querySelector('.torch-container-body .center-block .torch-container-multi-tit');
		let rightLevel = ElemCont.querySelector('.torch-container-body .right-block .torch-container-level');

		waterPump.id = 0 + '';
		namingContainer.id = 1 + '';
		miltiTitElem.id = 2 + '';
		rightLevel.id = 3 + '';
		waterPump.UpdateDynamic();
		namingContainer.UpdateDynamic();
		miltiTitElem.UpdateDynamic();
		rightLevel.UpdateDynamic();
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.torch-container-elem');

		this.AddTooltip(theElemCont, {});
	}
})