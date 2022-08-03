register("barrel-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");

	static get markup() {
		return `
		<div class="barrel-elem">
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 25.75 78.5" preserveAspectRatio="xMaxYMax meet">
					<path d="M14,75.75C7.49,75.77.05,60,0,39.75s7.49-37,14-37Z"/>
					<rect x="15" y="0.75" width="10" height="77"/>
				</svg>
            </div>
            <div class="barrel-body">
				<div class="naming-container">
					<div class="naming"></div>
				</div>
			</div>
            <div class="cap">
				<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24.75 78.5" preserveAspectRatio="xMaxYMax meet">
					<path d="M10.75,75.75c6.51,0,14-15.78,14-36s-7.49-37-14-37Z"/>
					<rect x="0.75" y="0.75" width="10" height="77"/>
				</svg>
            </div>
        </div>
		`;
	}

	static get style() {
		return `
		.barrel-elem {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
        }
        .barrel-elem .cap {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            box-sizing: border-box;
        }
        .barrel-elem .cap svg {
            height: 100%;
        }
        .barrel-elem .cap svg path {
            fill: var(--barrels-fill);
        }
		.barrel-elem .cap svg rect {
			fill: var(--barrels-fill);
            stroke: var(--body-bg-color);
			stroke-miterlimit: 10;
			stroke-width: 1.5;
		}
        .barrel-elem .barrel-body {
            height: 94.8%;
            flex-grow: 1;
            background-color: var(--barrels-fill);
			position: relative;
			overflow: hidden;
        }
		.barrel-elem .barrel-body .naming-container {
			position: absolute;
			width: 100%;
			top: 5px;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.barrel-elem .barrel-body .naming-container .naming {
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
		let ElemCont = this.shadowRoot.querySelector('.barrel-elem');
		let namingContainer = ElemCont.querySelector('.barrel-body .naming-container');
		let captionBlock = namingContainer.querySelector('.naming');

		if (this._scaption.value !== undefined)
			captionBlock.innerHTML = '' + this._scaption.value + '';
		else
			captionBlock.innerHTML = '';
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.barrel-elem');

		this.AddTooltip(theElemCont, {});
	}
})