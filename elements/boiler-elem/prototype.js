register("boiler-elem", class extends SimpleElement {
	_stitle = new Parameter(Type.String, "Подпись");
	_scaption = new Parameter(Type.String, "Подпись котла");
	_smtcaptions = new Parameter(Type.String, "Подписи мульти-тита");
	_dcurrentval = new Parameter(Type.Numeric, "Состояние горелки");

	static get markup() {
		return `
		<div class="boiler-elem">
				<div class="left">
					<svg class="heater" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 27.5" x="0" y="0" preserveAspectRatio="none">
						<rect class="heater-body" x="14" y="1.75" width="20" height="23"/>
						<rect class="heater-rect" x="9.69" y="0.75" width="4.28" height="26"/>
						<path class="heater-cap" d="M6.43,1.75C3,1.75,0,6.9,0,13.25s3,11.5,6.43,11.5H9v-23Z"/>
						<rect class="heater-hearth" x="17" y="3.75" width="14" height="19" rx="2.12"/>
						<path class="heater-fire" d="M22.46,20a4,4,0,0,1-3.22-4.1c0-1.82,1.19-2.47,1.19-4.17A3.5,3.5,0,0,0,20,10.36a2.65,2.65,0,0,1,1,1.1c.39.77,0,.88.5,1.38s1.07-.2.91-.81A6.94,6.94,0,0,1,22,9.86a4.35,4.35,0,0,1,2.94-4A2.75,2.75,0,0,0,24.7,8.7c.71,1.82,3.11,3.09,3.83,5.31a5.07,5.07,0,0,1-2.65,6,3.24,3.24,0,0,0,.72-2.27,3.79,3.79,0,0,0-1.07-2.36c.39.86,0,1.91-.6,1.75-1-.3-.29-1.54-.51-2.49a5.41,5.41,0,0,0-1-2.16,2.9,2.9,0,0,1,.24,2c-.27,1.14-1.49,1.81-1.83,3A3.12,3.12,0,0,0,22.46,20"/>
					</svg>
				</div>
				<div class="right">
					<div class="title-container">
						<div class="title"></div>
					</div>
						<div class="naming-container">
							<div class="naming"></div>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 37.25" x="0" y="0" preserveAspectRatio="none">
							<rect x="0.75" y="25.42" width="78.5" height="11.08"/>
							<path d="M76.56,19.2C76.56,12.49,60.19,7.05,40,7.05S3.44,12.49,3.44,19.2v5.21H76.56Z"/>
							<path d="M49.64,7V0H30.36V7c3.07-.23,6.3-.34,9.64-.34s6.57.11,9.64.34"/>
						</svg>
						<div class="barrel-body">
							<multi-tit-elem class="boiler-multi-tit" id="0"></multi-tit-elem>
							<state-displayer-elem class="boiler-state-displayer" id="1"></state-displayer-elem>
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.93 30.52" x="0" y="0" preserveAspectRatio="none">
							<path d="M3.41,17.38c0,7.26,16.37,13.14,36.56,13.14s36.55-5.88,36.55-13.14V11.75H3.41Z"/>
							<rect x="0.75" y="0.75" width="78.43" height="11"/>
						</svg>
				</div>
		</div>
		`;
	}

	static get style() {
		return `
		.boiler-elem {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
        }
		.boiler-elem .left {
			display: block;
			height: 100%;
			width: 29.5%;
			position: relative;
		}
		.boiler-elem .left .heater {
			position: absolute;
			right: 0;
			top: 70%;
			transform: translate(0, -70%);
			max-width: 100%;
    		max-height: 100%;
		}
		.boiler-elem .left .heater .heater-body,
		.boiler-elem .left .heater .heater-cap {
			fill: var(--barrels-fill);
		}
		.boiler-elem .left .heater .heater-rect {
			fill: var(--barrels-fill);
            stroke: var(--body-bg-color);
			stroke-width: 1.5px;
			stroke-miterlimit: 10;
		}
		.boiler-elem .left .heater .heater-hearth {
			fill: none;
			stroke-width: 0.25px;
            stroke: #E9E9E9;
		}
		.boiler-elem .left .heater .heater-fire.default {
			fill: #E9E9E9;
		}
		.boiler-elem .left .heater .heater-fire.active {
			fill: var(--flame-color);
		}
		.boiler-elem .right {
			position: relative;
			display: flex;
			flex-direction: column;
            align-items: center;
            justify-content: center;
			width: 70.5%;
            height: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
        .boiler-elem .right svg {
			width: 100%;
			max-height: 100%;
        }
        .boiler-elem .right svg path {
            fill: var(--barrels-fill);
        }
		.boiler-elem .right svg rect {
            fill: var(--barrels-fill);
            stroke: var(--body-bg-color);
			stroke-width: 1.5px;
			stroke-miterlimit: 10;
        }
		.boiler-elem .right .naming-container {
			position: absolute;
			top: 17%;
			transform: translate(0, -17%);
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.boiler-elem .right .naming-container .naming {
			display: block;
			text-align: center;
			font-family: 'Ubuntu', sans-serif;
			font-weight: 300;
			font-size: 23px;
			line-height: 27px;
			color: var(--barrels-txt-color);
		}
        .boiler-elem .right .barrel-body {
			position: relative;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
            width: 93.2%;
			padding: 12px 8px;
            background-color: var(--barrels-fill);
			box-sizing: border-box;
			overflow: hidden;
        }
		.title-container {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			overflow: hidden;
			box-sizing: border-box;
		}
		.title-container .title {
			display: block;
			font-family: 'Ubuntu', sans-serif;
			font-weight: 300;
			font-size: 19px;
			line-height: 24px;
			color: rgb(87, 90, 99);
		}
		.boiler-elem .right .barrel-body .boiler-multi-tit {
			width: 100%;
			height: 67.3%;
		}
		.boiler-elem .right .barrel-body .boiler-state-displayer {
			width: 100%;
			height: 25%;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_stitle' ,'_scaption', '_dcurrentval', '_smtcaptions'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();

		if (name.includes('_d'))
			this[name].value = newValue;
		this.onUpdateDynamic();
	}

	onUpdateStatic = function() {
		let ElemCont = this.shadowRoot.querySelector('.boiler-elem');
		let namingContainer = ElemCont.querySelector('.right .naming-container');
		let captionBlock = namingContainer.querySelector('.naming');
		let titleContainer =  ElemCont.querySelector('.right .title-container');
		let titleBlock = titleContainer.querySelector('.title');
		let mtElem = ElemCont.querySelector('.right .barrel-body .boiler-multi-tit');

		if (this._scaption.value !== undefined || this._scaption.value !== '')
			captionBlock.innerHTML = '' + this._scaption.value + '';
		else
			captionBlock.innerHTML = '';

		if (this._stitle.value !== undefined || this._scaption.value !== '')
			titleBlock.innerHTML = '' + this._stitle.value + '';
		else
			titleBlock.innerHTML = '';

		if (mtElem !== null) {
			mtElem._scaptions = this._smtcaptions;
			mtElem.onUpdateStatic();
		}
	}

	onUpdateDynamic = function() {
		let ElemCont = this.shadowRoot.querySelector('.boiler-elem');
		let mtElem = ElemCont.querySelector('.right .barrel-body .boiler-multi-tit');
		let sd = ElemCont.querySelector('.right .barrel-body .boiler-state-displayer');
		let flame = ElemCont.querySelector('.left .heater .heater-fire');
		let curVal = parseInt(this._dcurrentval.value);

		if (isNaN(curVal)) {
			flame.classList.add('default');
			flame.classList.remove('active');
		} else {
			if (curVal == 0) {
				flame.classList.add('default');
				flame.classList.remove('active');
			} else if (curVal == 1) {
				flame.classList.add('active');
				flame.classList.remove('default');
			}
		}

		if (this.getAttribute('id') == null) {
			mtElem.removeAttribute('id');
			mtElem.UpdateDynamic();
			sd.removeAttribute('id');
			sd.UpdateDynamic();
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.boiler-elem');

		this.AddTooltip(theElemCont, {});
	}
})