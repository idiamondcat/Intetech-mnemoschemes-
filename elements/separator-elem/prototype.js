register("separator-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	
	_sbottomblock = new Parameter(Type.Numeric, "Показать/скрыть нижний блок, 1-0");
	
	static get markup() {
		return `
		<div class="separator-elem">
			<div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.46 32.5" >
					<path d="M6.36,21.71C6.36,9.72,39.88,0,81.23,0s74.86,9.72,74.86,21.71Z"/>
					<rect x="0.75" y="22.39" width="160.96" height="9.36"/>
				</svg>
			</div>
			<div class="separator-body">
				<svg class="decorative-elem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134.61 6.7" preserveAspectRatio="xMidYMid meet">
					<polygon points="25.92 0.38 25.4 0.38 22.68 3.09 19.97 0.38 19.45 0.38 22.42 3.35 19.45 6.32 19.97 6.32 22.68 3.61 25.4 6.32 25.92 6.32 22.95 3.35 25.92 0.38"/>
					<polygon points="14.77 0.38 14.24 0.38 11.53 3.09 8.82 0.38 8.29 0.38 11.27 3.35 8.29 6.32 8.82 6.32 11.53 3.61 14.24 6.32 14.77 6.32 11.79 3.35 14.77 0.38"/>
					<polygon points="37.08 0.38 36.55 0.38 33.84 3.09 31.13 0.38 30.6 0.38 33.58 3.35 30.6 6.32 31.13 6.32 33.84 3.61 36.55 6.32 37.08 6.32 34.1 3.35 37.08 0.38"/>
					<polygon points="3.61 0.38 3.09 0.38 0.38 3.09 0.38 3.61 3.09 6.32 3.61 6.32 0.64 3.35 3.61 0.38"/>
					<polygon points="48.23 0.38 47.7 0.38 44.99 3.09 42.28 0.38 41.76 0.38 44.73 3.35 41.76 6.32 42.28 6.32 44.99 3.61 47.7 6.32 48.23 6.32 45.26 3.35 48.23 0.38"/>
					<polygon points="131 6.32 131.52 6.32 134.23 3.61 134.23 3.09 131.52 0.38 131 0.38 133.97 3.35 131 6.32"/>
					<polygon points="104 0.38 103.48 0.38 100.77 3.09 98.06 0.38 97.53 0.38 100.5 3.35 97.53 6.32 98.06 6.32 100.77 3.61 103.48 6.32 104 6.32 101.03 3.35 104 0.38"/>
					<polygon points="115.16 0.38 114.63 0.38 111.92 3.09 109.21 0.38 108.69 0.38 111.66 3.35 108.69 6.32 109.21 6.32 111.92 3.61 114.63 6.32 115.16 6.32 112.19 3.35 115.16 0.38"/>
					<polygon points="126.31 0.38 125.79 0.38 123.08 3.09 120.37 0.38 119.84 0.38 122.81 3.35 119.84 6.32 120.37 6.32 123.08 3.61 125.79 6.32 126.31 6.32 123.34 3.35 126.31 0.38"/>
					<polygon points="59.39 0.38 58.86 0.38 56.15 3.09 53.44 0.38 52.91 0.38 55.89 3.35 52.91 6.32 53.44 6.32 56.15 3.61 58.86 6.32 59.39 6.32 56.41 3.35 59.39 0.38"/>
					<polygon points="92.85 0.38 92.32 0.38 89.61 3.09 86.9 0.38 86.38 0.38 89.35 3.35 86.38 6.32 86.9 6.32 89.61 3.61 92.32 6.32 92.85 6.32 89.88 3.35 92.85 0.38"/>
					<polygon points="70.54 0.38 70.02 0.38 67.3 3.09 64.59 0.38 64.07 0.38 67.04 3.35 64.07 6.32 64.59 6.32 67.3 3.61 70.02 6.32 70.54 6.32 67.57 3.35 70.54 0.38"/>
					<polygon points="81.7 0.38 81.17 0.38 78.46 3.09 75.75 0.38 75.22 0.38 78.2 3.35 75.22 6.32 75.75 6.32 78.46 3.61 81.17 6.32 81.7 6.32 78.72 3.35 81.7 0.38"/>
				</svg>
				<div class="separator-multi-tit-container">
					<multi-tit-elem class="separator-multi-tit" _stitcount="2" id="0"></multi-tit-elem>
				</div>
				<div class="naming-container">
					<div class="naming"></div>
				</div>
				<div class="separator-level-container">
					<div class="mid-overlay">
						<div class="bot-overlay">
							<level-for-barrels-elem class="separator-level right" _sadditionallines="2" id="1"></level-for-barrels-elem>
							<level-for-barrels-elem class="separator-level left" _sadditionallines="2" _sorient="1" id="2"></level-for-barrels-elem>
						</div>
					</div>
					
				</div>
			</div>
			<div class="cap" preserveAspectRatio="xMidYMid meet">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.5 10.86">
					<rect x="0.75" y="0.75" width="161" height="9.36"/>
				</svg>
			</div>
		</div>
		`;
	}
	static get style() {
		return `
		.separator-elem {
			display: flex;
			flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.separator-elem .cap {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            box-sizing: border-box;
        }
        .separator-elem .cap svg {
            width: 100%;
        }
        .separator-elem .cap svg path {
            fill: var(--barrels-fill);
        }
		.separator-elem .cap svg rect {
			fill: var(--barrels-fill);
            stroke: var(--body-bg-color);
			stroke-miterlimit: 10;
			stroke-width: 1.5;
        }
		.separator-elem .separator-body {
			width: 93%;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			padding: 4%;
			background-color: var(--barrels-fill);
			box-sizing: border-box;
			overflow: hidden;
		}
		.separator-elem .separator-body .decorative-elem {
			width: 100%;
			fill: none;
			stroke: #e5e5e5;
			stroke-miterlimit: 10;
			stroke-width: 0.75;
		}
		.separator-elem .separator-body .separator-multi-tit-container {
			width: 100%;
			height: 33.5%;
			border: 2px solid #bfcacd;
			border-radius: 11px;
			padding: 2.5px;
			box-sizing: border-box;
			overflow: hidden;
			background-color: rgba(127, 175, 174, 0.2);
		}
		.separator-elem .separator-body .separator-multi-tit-container .separator-multi-tit {
			width: 100%;
		}
		.separator-elem .separator-body .separator-naming-container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-top: 1.5px solid #e5e5e5;
			border-bottom: 1.5px solid #e5e5e5;
			box-sizing: border-box;
			overflow: hidden;
		}
		.separator-elem .separator-body .naming-container {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-top: 1.5px solid #e5e5e5;
			border-bottom: 1.5px solid #e5e5e5;
			box-sizing: border-box;
			overflow: hidden;
		}
		.separator-elem .separator-body .naming-container .naming {
			display: block;
			text-align: center;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 19px;
			line-height: 19px;
			font-weight: 400;
			white-space: nowrap;
			color: var(--barrels-txt-color);
		}
		.separator-elem .separator-body .separator-level-container {
			display: block;
			width: 100%;
			height: 46.4%;
			background-color: #7fafae;
			border: 2px solid #7fafae;
			border-radius: 11px;
			box-sizing: border-box;
			overflow: hidden;
		}
		.separator-elem .separator-body .separator-level-container .mid-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #f5f5f8;
		}
		.separator-elem .separator-body .separator-level-container .mid-overlay .bot-overlay {
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(127, 175, 174, 0.3);
			position: relative;
		}
		.separator-elem .separator-body .separator-level-container.visible {
			visibility: visible;
		}
		.separator-elem .separator-body .separator-level-container.invisible {
			visibility: hidden;
		}
		.separator-elem .separator-body .separator-level-container .mid-overlay .bot-overlay .separator-level {
			height: 100%;
			width: 47.9%;
			position: absolute;
			top: 0;
		}
		.separator-elem .separator-body .separator-level-container .mid-overlay .bot-overlay .separator-level.left {
			left: 0;
		}
		.separator-elem .separator-body .separator-level-container .mid-overlay .bot-overlay .separator-level.right {
			right: 0;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_scaption', '_sfontsize', '_sbottomblock'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let ElemCont = this.shadowRoot.querySelector('.separator-elem');
		let bottomBlock = ElemCont.querySelector('.separator-body .separator-level-container');
		let namingElem = ElemCont.querySelector('.separator-body .naming-container .naming');

		let fs = this._sfontsize.value;
		let caption = this._scaption.value;

		if ((this._sfontsize.value !== undefined) && (this._sfontsize.value !== '')) {
			namingElem.style.height = parseInt(this._sfontsize.value) + 'px';
			namingElem.style.fontSize = parseInt(this._sfontsize.value) + 'px';
			namingElem.style.lineHeight = parseInt(this._sfontsize.value) + 'px';
		} else {
			namingElem.style.fontSize = '';
			namingElem.style.height = '';
			namingElem.style.lineHeight = '';
		}

		if ((caption !== undefined) && (caption !== '')) {
			namingElem.innerHTML = '' + caption;
		} else {
			namingElem.innerHTML = '';
		}

		if (this._sbottomblock.value == "0" || this._sbottomblock.value == undefined) {
			bottomBlock.classList.add('visible');
			bottomBlock.classList.remove('invisible');
		}
		else if (this._sbottomblock.value == "1") {
			bottomBlock.classList.add('invisible');
			bottomBlock.classList.remove('visible');
		}
	}

	onUpdateDynamic = function() {
		let ElemCont = this.shadowRoot.querySelector('.separator-elem');
		let miltiTitElem = ElemCont.querySelector('.separator-body .separator-multi-tit-container .separator-multi-tit');
		let leftLevel = ElemCont.querySelector('.separator-body .separator-level-container .mid-overlay .bot-overlay .separator-level.left');
		let rightLevel = ElemCont.querySelector('.separator-body .separator-level-container .mid-overlay .bot-overlay .separator-level.right');
		
		if (this.getAttribute('id') == null) {
			miltiTitElem.removeAttribute('id');
			leftLevel.removeAttribute('id');
			rightLevel.removeAttribute('id');
			miltiTitElem.UpdateDynamic();
			leftLevel.UpdateDynamic();
			rightLevel.UpdateDynamic();
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.separator-elem');

		this.AddTooltip(theElemCont, {});
	}
})