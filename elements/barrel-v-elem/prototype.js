register("barrel-v-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");

	static get markup() {
		return `
		<div class="barrel-v-elem">
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69 17.7" preserveAspectRatio="none">
					<path class="cls-1" d="M0,17.74C0,8.12,15.42.17,34.51,0S69.1,7.49,69.13,17.12Z"/>
				</svg>
            </div>
            <div class="rectangle"></div>
            <div class="barrel-body">
				<div class="naming-container">
					<div class="naming"></div>
				</div>
			</div>
            <div class="rectangle"></div>
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.13 17.74" preserveAspectRatio="none">
					<path class="cls-1" d="M0,.62c0,9.63,15.53,17.29,34.62,17.12S69.16,9.63,69.13,0Z"/>
				</svg>
            </div>
        </div>
		`;
	}

	static get style() {
		return `
		.barrel-v-elem {
            display: flex;
			flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
        }
        .barrel-v-elem .cap {
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: 100%;
            box-sizing: border-box;
        }
        .barrel-v-elem .cap svg {
			width: 92%;
        }
        .barrel-v-elem .cap svg path {
            fill: var(--barrels-fill);
        }
        .barrel-v-elem .rectangle {
            height: 6.5%;
            width: 100%;
            background-color: var(--barrels-fill);
            border: 0.15em solid var(--body-bg-color);
        }
        .barrel-v-elem .barrel-body {
			display: flex;
			align-items: center;
			justify-content: center;
            height: 100%;
            width: 92%;
            background-color: var(--barrels-fill);
        }
		.barrel-v-elem .barrel-body .naming-container {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.barrel-v-elem .barrel-body .naming-container .naming {
			display: block;
			text-align: center;
			font-family: 'Ubuntu', sans-serif;
			font-weight: 300;
			font-size: 16px;
			line-height: 19px;
			color: var(--barrels-txt-color);
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
		let ElemCont = this.shadowRoot.querySelector('.barrel-v-elem');
		let namingContainer = ElemCont.querySelector('.barrel-body .naming-container');
		let captionBlock = namingContainer.querySelector('.naming');

		if (this._scaption.value !== undefined)
			captionBlock.innerHTML = '' + this._scaption.value + '';
		else
			captionBlock.innerHTML = '';
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.barrel-v-elem');

		this.AddTooltip(theElemCont, {});
	}
})