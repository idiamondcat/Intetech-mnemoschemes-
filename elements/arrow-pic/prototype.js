register("arrow-pic", class extends SimpleElement {
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Текст");

	static get markup() {
		return `
		<div class="arrow-pic">
			<div class="cont">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 34" preserveAspectRatio="xMinYMin meet">
						<g class="elem">
							<g class="color">
								<path d="M11.8,0.1L0.4,15.5c-0.6,0.8-0.6,1.8,0,2.6l11.4,15.4c0.2,0.3,0.6,0.1,0.6-0.2v-33C12.4,0,12-0.1,11.8,0.1z"/>
								<path d="M15,0.4v33c0,0.3,0.4,0.5,0.6,0.2L27,18.1c0.6-0.8,0.6-1.8,0-2.6L15.7,0.1C15.5-0.1,15,0,15,0.4z"/>
							</g>
						</g>
						<g class="placeholder">
							<rect fill="none" width="28" height="34"/>
						</g>
					</svg>
				<caption-elem class="arrow-pic-caption" id="0"></caption-elem>
			</div>	
		</div>
		`;
	}

	static get style() {
		return `
		.arrow-pic {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.arrow-pic .cont {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}
		.arrow-pic .cont svg {
			min-height: 34px;
			max-width: 100%;
		}
		.arrow-pic .cont svg .elem .color {
			fill: var(--main-object-fill-color);
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
		let theElemCont = this.shadowRoot.querySelector('.arrow-pic');
		let arrowPic = theElemCont.querySelector('.cont svg');
		let captionElem = theElemCont.querySelector('.arrow-pic-caption');
		let captionText = captionElem.shadowRoot.querySelector('.caption-elem .text-displayer');

		if (captionElem !== null) {
			if (this.getAttribute('id') == null) {
				captionElem.removeAttribute('id');
			}
			captionElem._scaption = this._scaption;
			captionElem._sfontsize = this._sfontsize;
			captionElem.UpdateStatic();
		}

		if (this._scaption.value !== undefined && this._scaption.value !== '' && this._scaption.value !== null) {
			let w = this.offsetWidth;
			let txtWidth = captionText.offsetWidth;

			if (txtWidth > w) {
				captionElem.style.width = txtWidth + 'px';
				this.style.width  = txtWidth + 'px';	
			} else {
				captionElem.style.width = Number(arrowPic.getBBox().width.toFixed(1)) + 'px';
				this.style.width = Number(arrowPic.getBBox().width.toFixed(1)) + 'px';
			}
			captionElem.style.marginTop = '7px';
			this.style.height = Number(arrowPic.getBBox().height.toFixed(1)) + captionElem.offsetHeight + 7 + 'px';
		} else if (this._scaption.value == null) {
			captionElem.style.marginTop = '';
			this.style.width = Number(arrowPic.getBBox().width.toFixed(1)) + 'px';
			this.style.height = Number(arrowPic.getBBox().height.toFixed(1)) + 'px';
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.arrow-pic');

		this.AddTooltip(theElemCont, {});
	}
})
