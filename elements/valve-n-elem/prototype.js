register("valve-n-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Текст");
	_svalveorient = new Parameter(Type.String, "Положение насоса, h - горизонтальное, v - вертикальное");
	_sshowpercent = new Parameter(Type.Numeric, "Показать процент открытия, 1 - показать, 0 - скрыть");

	_dcurrentval = new Parameter(Type.Numeric, "Состояние активности, 0-1");
	_dcurrentpercent = new Parameter(Type.Numeric, "Процент открытия, 0-100");

	static get markup() {
		return `
		<div class="valve-n-elem">
			<div class="percent-container">
				<div class="arrow-wrapper">
					<div class="arrow"></div>
					<div class="inside-wrapper">
						<div class="percent-val"></div>
					</div>
				</div>
			</div>
			<div class="cont">
				<svg class="horizontal-valve" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71 67" preserveAspectRatio="xMinYMin meet">
					<g class="elem">
						<g class="unactive-color">
							<path d="M12,45.3l0,10.3c0,0.3-0.2,0.6-0.5,0.6l-3.8,0c-0.3,0-0.6-0.2-0.6-0.6l0-10.3L7,35c0-0.3,0.2-0.6,0.5-0.6
								l3.8,0c0.3,0,0.6,0.2,0.6,0.6L12,45.3z"/>
							<path d="M59.1,45l0,10.3c0,0.3,0.2,0.6,0.6,0.6l3.8,0c0.3,0,0.5-0.3,0.5-0.6L64,45l0-10.3c0-0.3-0.2-0.6-0.6-0.6
								l-3.8,0c-0.3,0-0.5,0.3-0.5,0.6L59.1,45z"/>
							<path d="M35.6,59.5c3.8,0,7.3-1.6,9.8-4.2c1.6-1.7,3.9-2.5,6.2-2.5l4.6,0c0.3,0,0.5-0.3,0.5-0.6l-0.1-14.2
								c0-0.3-0.2-0.6-0.6-0.6l-4.7,0c-2.3,0-4.5-1-6.2-2.6c-0.8-0.8-1.7-1.5-2.7-2.1l-6.9,0l-6.9,0c-1,0.6-1.9,1.3-2.7,2.1
								c-1.7,1.6-3.8,2.7-6.1,2.7l-4.7,0c-0.3,0-0.5,0.3-0.5,0.6l0.1,14.2c0,0.3,0.2,0.6,0.6,0.6l4.6,0c2.3,0,4.5,0.8,6.2,2.5
								C28.3,57.9,31.8,59.5,35.6,59.5"/>
							<path d="M56.3,7.5L35.4,7.6L14.5,7.7c-0.3,0-0.5,0.3-0.5,0.6l0,2.2c0,0.3,0.2,0.6,0.6,0.6l3.1,0
								c0.3,0,0.6,0.1,0.9,0.3l13.4,9c0.3,0.2,0.5,0.6,0.5,1l0,2.3c0,0.5-0.4,0.9-0.9,0.9l-2.3,0c-0.3,0-0.5,0.3-0.5,0.6l0,4.7
								c0,0.3,0.2,0.6,0.6,0.6l6.2,0l6.2,0c0.3,0,0.5-0.3,0.5-0.6l0-4.7c0-0.3-0.2-0.6-0.6-0.6l-2.3,0c-0.5,0-0.9-0.4-0.9-0.9l0-2.3
								c0-0.4,0.2-0.8,0.5-1l13.3-9.1c0.3-0.2,0.6-0.3,0.9-0.3l3.1,0c0.3,0,0.5-0.3,0.5-0.6l0-2.2C56.8,7.7,56.6,7.5,56.3,7.5 M39.3,16.1
								c-0.2,0.2-0.5,0.3-0.8,0.3l-3.1,0l-3.1,0c-0.3,0-0.6-0.1-0.8-0.2L23.7,11l11.6-0.1L47,10.9L39.3,16.1z"/>
						</g>
						<g class="color">
							<path d="M12,45.3l0,10.3c0,0.3-0.2,0.6-0.5,0.6l-3.8,0c-0.3,0-0.6-0.2-0.6-0.6l0-10.3L7,35c0-0.3,0.2-0.6,0.5-0.6
								l3.8,0c0.3,0,0.6,0.2,0.6,0.6L12,45.3z"/>
							<path d="M59.1,45l0,10.3c0,0.3,0.2,0.6,0.6,0.6l3.8,0c0.3,0,0.5-0.3,0.5-0.6L64,45l0-10.3c0-0.3-0.2-0.6-0.6-0.6
								l-3.8,0c-0.3,0-0.5,0.3-0.5,0.6L59.1,45z"/>
							<path d="M35.6,59.5c3.8,0,7.3-1.6,9.8-4.2c1.6-1.7,3.9-2.5,6.2-2.5l4.6,0c0.3,0,0.5-0.3,0.5-0.6l-0.1-14.2
								c0-0.3-0.2-0.6-0.6-0.6l-4.7,0c-2.3,0-4.5-1-6.2-2.6c-0.8-0.8-1.7-1.5-2.7-2.1l-6.9,0l-6.9,0c-1,0.6-1.9,1.3-2.7,2.1
								c-1.7,1.6-3.8,2.7-6.1,2.7l-4.7,0c-0.3,0-0.5,0.3-0.5,0.6l0.1,14.2c0,0.3,0.2,0.6,0.6,0.6l4.6,0c2.3,0,4.5,0.8,6.2,2.5
								C28.3,57.9,31.8,59.5,35.6,59.5"/>
							<path d="M56.3,7.5L35.4,7.6L14.5,7.7c-0.3,0-0.5,0.3-0.5,0.6l0,2.2c0,0.3,0.2,0.6,0.6,0.6l3.1,0
								c0.3,0,0.6,0.1,0.9,0.3l13.4,9c0.3,0.2,0.5,0.6,0.5,1l0,2.3c0,0.5-0.4,0.9-0.9,0.9l-2.3,0c-0.3,0-0.5,0.3-0.5,0.6l0,4.7
								c0,0.3,0.2,0.6,0.6,0.6l6.2,0l6.2,0c0.3,0,0.5-0.3,0.5-0.6l0-4.7c0-0.3-0.2-0.6-0.6-0.6l-2.3,0c-0.5,0-0.9-0.4-0.9-0.9l0-2.3
								c0-0.4,0.2-0.8,0.5-1l13.3-9.1c0.3-0.2,0.6-0.3,0.9-0.3l3.1,0c0.3,0,0.5-0.3,0.5-0.6l0-2.2C56.8,7.7,56.6,7.5,56.3,7.5 M39.3,16.1
								c-0.2,0.2-0.5,0.3-0.8,0.3l-3.1,0l-3.1,0c-0.3,0-0.6-0.1-0.8-0.2L23.7,11l11.6-0.1L47,10.9L39.3,16.1z"/>
						</g>
					</g>
					<g class="placeholder">
						<g class="overlay-container" fill="none">
							<path d="M66.8,67H4.2C1.9,67,0,65.1,0,62.8V4.2C0,1.9,1.9,0,4.2,0h62.6C69.1,0,71,1.9,71,4.2v58.6C71,65.1,69.1,67,66.8,67z"/>
						</g>
						<g class="alarm-container" fill="none">
						<path d="M66.8,2A2.23,2.23,0,0,1,69,4.2V62.8A2.23,2.23,0,0,1,66.8,65H4.2A2.23,2.23,0,0,1,2,62.8V4.2A2.23,2.23,0,0,1,4.2,2H66.8m0-2H4.2A4.23,4.23,0,0,0,0,4.2V62.8A4.23,4.23,0,0,0,4.2,67H66.8A4.23,4.23,0,0,0,71,62.8V4.2A4.23,4.23,0,0,0,66.8,0Z"/>
						</g>
					</g>
				</svg>
				<svg class="vertical-valve" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 71" preserveAspectRatio="xMinYMin meet">
					<g class="elem">
							<g class="unactive-color">
								<path d="M45.2,59.1l10.3,0c0.3,0,0.6,0.2,0.6,0.5l0,3.8c0,0.3-0.3,0.5-0.6,0.5l-10.3,0l-10.3,0
									c-0.3,0-0.6-0.2-0.6-0.5l0-3.8c0-0.3,0.3-0.5,0.6-0.5L45.2,59.1z"/>
								<path d="M45.2,12l10.3,0c0.3,0,0.6-0.2,0.6-0.5l0-3.8c0-0.3-0.3-0.5-0.6-0.5l-10.3,0l-10.3,0c-0.3,0-0.6,0.2-0.6,0.5
									l0,3.8c0,0.3,0.3,0.5,0.6,0.5L45.2,12z"/>
								<path d="M59.5,35.5c0-3.8-1.6-7.3-4.1-9.8c-1.6-1.6-2.5-3.9-2.5-6.2l0-4.6c0-0.3-0.3-0.5-0.6-0.5l-14.2,0
									c-0.3,0-0.6,0.2-0.6,0.5l0,4.7c0,2.3-1,4.5-2.7,6.1c-0.8,0.8-1.5,1.7-2.1,2.7l0,6.9l0,6.9c0.6,1,1.3,1.9,2.1,2.7
									c1.6,1.7,2.7,3.8,2.7,6.1l0,4.7c0,0.3,0.3,0.5,0.6,0.5l14.2,0c0.3,0,0.6-0.2,0.6-0.5l0-4.6c0-2.3,0.9-4.5,2.5-6.2
									C58,42.8,59.5,39.4,59.5,35.5"/>
								<path d="M7.6,14.6l0,20.9l0,20.9c0,0.3,0.3,0.5,0.6,0.5l2.2,0c0.3,0,0.6-0.2,0.6-0.5l0-3.1c0-0.3,0.1-0.6,0.3-0.9
									l9-13.4c0.2-0.3,0.6-0.5,1-0.5l2.3,0c0.5,0,0.9,0.4,0.9,0.9l0,2.3c0,0.3,0.3,0.5,0.6,0.5l4.7,0c0.3,0,0.6-0.2,0.6-0.5l0-6.2l0-6.2
									c0-0.3-0.3-0.5-0.6-0.5l-4.7,0c-0.3,0-0.6,0.2-0.6,0.6l0,2.3c0,0.5-0.4,0.9-0.9,0.9l-2.3,0c-0.4,0-0.8-0.2-1-0.5l-9-13.4
									C11.1,18.3,11,18,11,17.7l0-3.1c0-0.3-0.3-0.5-0.6-0.5l-2.2,0C7.9,14.1,7.6,14.3,7.6,14.6 M16.2,31.6c0.2,0.2,0.3,0.5,0.3,0.8
									l0,3.1l0,3.1c0,0.3-0.1,0.6-0.3,0.8L11,47.1l0-11.6l0-11.6L16.2,31.6z"/>
							</g>
							<g class="color">
								<path d="M45.2,59.1l10.3,0c0.3,0,0.6,0.2,0.6,0.5l0,3.8c0,0.3-0.3,0.5-0.6,0.5l-10.3,0l-10.3,0
									c-0.3,0-0.6-0.2-0.6-0.5l0-3.8c0-0.3,0.3-0.5,0.6-0.5L45.2,59.1z"/>
								<path d="M45.2,12l10.3,0c0.3,0,0.6-0.2,0.6-0.5l0-3.8c0-0.3-0.3-0.5-0.6-0.5l-10.3,0l-10.3,0c-0.3,0-0.6,0.2-0.6,0.5
									l0,3.8c0,0.3,0.3,0.5,0.6,0.5L45.2,12z"/>
								<path d="M59.5,35.5c0-3.8-1.6-7.3-4.1-9.8c-1.6-1.6-2.5-3.9-2.5-6.2l0-4.6c0-0.3-0.3-0.5-0.6-0.5l-14.2,0
									c-0.3,0-0.6,0.2-0.6,0.5l0,4.7c0,2.3-1,4.5-2.7,6.1c-0.8,0.8-1.5,1.7-2.1,2.7l0,6.9l0,6.9c0.6,1,1.3,1.9,2.1,2.7
									c1.6,1.7,2.7,3.8,2.7,6.1l0,4.7c0,0.3,0.3,0.5,0.6,0.5l14.2,0c0.3,0,0.6-0.2,0.6-0.5l0-4.6c0-2.3,0.9-4.5,2.5-6.2
									C58,42.8,59.5,39.4,59.5,35.5"/>
								<path d="M7.6,14.6l0,20.9l0,20.9c0,0.3,0.3,0.5,0.6,0.5l2.2,0c0.3,0,0.6-0.2,0.6-0.5l0-3.1c0-0.3,0.1-0.6,0.3-0.9
									l9-13.4c0.2-0.3,0.6-0.5,1-0.5l2.3,0c0.5,0,0.9,0.4,0.9,0.9l0,2.3c0,0.3,0.3,0.5,0.6,0.5l4.7,0c0.3,0,0.6-0.2,0.6-0.5l0-6.2l0-6.2
									c0-0.3-0.3-0.5-0.6-0.5l-4.7,0c-0.3,0-0.6,0.2-0.6,0.6l0,2.3c0,0.5-0.4,0.9-0.9,0.9l-2.3,0c-0.4,0-0.8-0.2-1-0.5l-9-13.4
									C11.1,18.3,11,18,11,17.7l0-3.1c0-0.3-0.3-0.5-0.6-0.5l-2.2,0C7.9,14.1,7.6,14.3,7.6,14.6 M16.2,31.6c0.2,0.2,0.3,0.5,0.3,0.8
									l0,3.1l0,3.1c0,0.3-0.1,0.6-0.3,0.8L11,47.1l0-11.6l0-11.6L16.2,31.6z"/>
							</g>
					</g>
					<g class="placeholder">
						<g class="overlay-container" fill="none">
							<path d="M62.8,71H4.2C1.9,71,0,69.1,0,66.8V4.2C0,1.9,1.9,0,4.2,0h58.6C65.1,0,67,1.9,67,4.2v62.6C67,69.1,65.1,71,62.8,71z"/>
						</g>
						<g class="alarm-container" fill="none">
							<path d="M62.8,2A2.23,2.23,0,0,1,65,4.2V66.8A2.23,2.23,0,0,1,62.8,69H4.2A2.23,2.23,0,0,1,2,66.8V4.2A2.23,2.23,0,0,1,4.2,2H62.8m0-2H4.2A4.23,4.23,0,0,0,0,4.2V66.8A4.23,4.23,0,0,0,4.2,71H62.8A4.23,4.23,0,0,0,67,66.8V4.2A4.23,4.23,0,0,0,62.8,0Z"/>
						</g>
					</g>
				</svg>
				<caption-elem class="valve-n-caption" id="0"></caption-elem>
			</div>
		</div>
		`;
	}
	
	static get style() {
		return `
		.valve-n-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.valve-n-elem .percent-container {
			display: block;
			position: absolute;
			width: 76px;
			text-align: center;
			box-sizing: border-box;
			padding: 3px 9.5px;
			background-color: var(--tit-name-cont-bg-color);
			border: 2px solid var(--main-object-fill-color);
			border-radius: 8px;
		}
		.valve-n-elem.horizontal .percent-container {
			top: -43px;
			margin-left: auto;
			margin-right: auto;
		}
		.valve-n-elem.vertical .percent-container {
			left: -80px;
			top: 50%;
			transform: translate(0, -50%);
		}
		.valve-n-elem .percent-container .arrow-wrapper {
			width: 100%;
			height: 100%;
			position: relative;
		}
		.valve-n-elem .percent-container .arrow-wrapper .arrow {
			display: block;
			width: 10px;
			height: 10px;
			position: absolute;
			background-color: var(--tit-name-cont-bg-color);
			border-right:2px solid var(--main-object-fill-color);
			border-bottom: 2px solid var(--main-object-fill-color);
			box-sizing: border-box;
		}
		.valve-n-elem.horizontal .percent-container .arrow-wrapper .arrow {
			bottom: -9px;
			left: calc(50% - 5px);
			transform: rotate(45deg);
			-moz-transform:rotate(45deg);
			-webkit-transform:rotate(45deg);
		}
		.valve-n-elem.vertical .percent-container .arrow-wrapper .arrow {
			top: calc(50% - 5px);
			right: -16px;
			transform: rotate(-45deg);
			-moz-transform:rotate(-45deg);
			-webkit-transform:rotate(-45deg);
		}
		.valve-n-elem .percent-container.unactive {
			visibility: hidden;
		}
		.valve-n-elem .percent-container.active {
			visibility: visible;
		}
		.valve-n-elem .percent-container .inside-wrapper {
			text-align: center;
			margin: 0 auto;
			overflow: hidden;
		}
		.valve-n-elem .percent-container .percent-val {
			display: inline;
			box-sizing: border-box;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: var(--sys-numvalue-fontsize);
			line-height: var(--sys-numvalue-lineheight);
			color: var(--tit-name-cont-txt-color);
			white-space: nowrap;
		}
		.valve-n-elem .cont {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}
		.valve-n-elem.horizontal .cont {
			flex-direction: column;
		}
		.valve-n-elem.vertical .cont {
			flex-direction: row;
		}
		.valve-n-elem .cont svg {
			display: none;
		}
		.valve-n-elem.horizontal .cont svg.active {
			display: block;
			max-width: 100%;
			min-height: 67px;
		}
		.valve-n-elem.vertical .cont svg.active {
			display: block;
			max-height: 100%;
			min-width: 67px;
		}
		.valve-n-elem .cont svg .elem .unactive-color {
			fill: var(--underlayer-default-color);
		}
		.valve-n-elem .cont svg .elem .color {
			fill: var(--underlayer-default-color);
			z-index: 1;
		}
		.valve-n-elem .cont svg .elem.default {
			stroke: none;
		}
		.valve-n-elem .cont svg .placeholder .alarm-container.default {
			fill: none;
		}
		.valve-n-elem .cont svg .placeholder .alarm-container.error {
			fill: var(--num-value-linecolor-awful);
		}
		.valve-n-elem .cont svg .placeholder .alarm-container.unknown {
			fill: var(--underlayer-default-color);
		}
		.valve-n-elem .cont svg .placeholder .visible {
			fill: var(--sys-unavailable-color);
		}
		.valve-n-elem .cont svg .placeholder .invisible {
			fill: none;
		}
		.valve-n-elem .cont svg .placeholder .overlay-container.visible {
			fill: var(--sys-unavailable-color);
		}
		.valve-n-elem .cont svg .placeholder .overlay-container.invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentpercent', '_dcurrentval', '_sfontsize', '_scaption', '_svalveorient', '_scolor', '_sshowpercent'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();

		if (name.includes('_d'))
			this[name].value = newValue;
		this.UpdateDynamic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.valve-n-elem');
		let percentBlock = theElemCont.querySelector('.percent-container');
		let valveCont = theElemCont.querySelectorAll('.cont svg');
		let hValve = theElemCont.querySelector('.cont .horizontal-valve');
		let vValve = theElemCont.querySelector('.cont .vertical-valve');
		let captionElem = theElemCont.querySelector('.cont .valve-n-caption');
		let captionText = captionElem.shadowRoot.querySelector('.text-displayer');

		if (captionElem) {
			captionElem._scaption = this._scaption;
			captionElem._sfontsize = this._sfontsize;
			captionElem.UpdateStatic();
		}

		
		switch(this._svalveorient.value) {
			case 'h': 
				theElemCont.classList.add('horizontal');
				theElemCont.classList.remove('vertical');
				hValve.classList.add('active');
				vValve.classList.remove('active');
				break;
			case 'v':
				theElemCont.classList.add('vertical');
				theElemCont.classList.remove('horizontal');
				hValve.classList.remove('active');
				vValve.classList.add('active');
				break;
			default:
				theElemCont.classList.add('horizontal');
				hValve.classList.add('active');
				break;
		}
		this.onUpdateDynamic();

		let w = this.offsetWidth;
		let txtWidth = captionText.offsetWidth;
		let imageW;
		let imageH;
		valveCont.forEach(elem => {
			if (elem.classList.contains('active')) {
				imageW = Number(elem.getBBox().width.toFixed(1));
				imageH = Number(elem.getBBox().height.toFixed(1));
			}
		})

		if (this._scaption.value) {
			if (theElemCont.classList.contains('horizontal')) {
				this.style.width = imageW + 'px';
				w = imageW;
				if (txtWidth > w) {
					captionElem.style.width = txtWidth + 'px';
					this.style.width = txtWidth + 'px';
				} 
				else {
					this.style.width = w + 'px';
					captionElem.style.width = w + 'px';
				}
				captionElem.style.marginTop = '0.5px';
				captionElem.style.marginLeft = '0';
				this.style.height = imageH + captionElem.offsetHeight + 0.5 + 'px';
			} 
			else if (theElemCont.classList.contains('vertical')) {
				captionElem.style.width = txtWidth + 'px';
				captionElem.style.marginTop = '0';
				captionElem.style.marginLeft = '0.5px';
				this.style.width = imageW + captionElem.offsetWidth + 0.5 + 'px';
				this.style.height = imageH + 'px';
			}
		} 
		else {
			if (theElemCont.classList.contains('horizontal')) {
				this.style.width = imageW + 'px';
				captionElem.style.marginTop = '0';
				captionElem.style.marginLeft = '0';
				this.style.height = imageH + 'px';
			} else if (theElemCont.classList.contains('vertical')) {
				captionElem.style.marginTop = '0';
				captionElem.style.marginLeft = '0';
				this.style.height = imageW + 'px';
				this.style.width = imageH + 'px';
			}
		}

		if (!this._sshowpercent.value) {
			percentBlock.classList.add('unactive');
			percentBlock.classList.remove('active');
		} else {
			if (this._sshowpercent.value == 0) {
				percentBlock.classList.add('unactive');
				percentBlock.classList.remove('active');
			} else if (this._sshowpercent.value == 1) {
				percentBlock.classList.add('active');
				percentBlock.classList.remove('unactive');
			}
		}

		let activeElem = theElemCont.querySelector('.cont svg.active .elem');
		activeElem.querySelector('.color').style.fill = this.getActiveColor(this._scolor.value);
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.valve-n-elem');
		let percentBlock = theElemCont.querySelector('.percent-container');
		let percentCont = percentBlock.querySelector('.percent-val');
		let stateVal = parseInt(this._dcurrentval.value);
		let percentVal;
		let captionElem = theElemCont.querySelector('.cont .valve-n-caption');
		let valveCont = theElemCont.querySelectorAll('.cont svg');
		let element;
		let colorLayer;
		let alarmContainer;
		let overlayContainer;
		let colorPercent;

		valveCont.forEach(elem => {
			if (elem.classList.contains('active')) {
				element = elem.querySelector('.elem');
				colorLayer = element.querySelector('.color');
				alarmContainer = elem.querySelector('.alarm-container');
				overlayContainer = elem.querySelector('.overlay-container');

				colorLayer.style.opacity = 0;

				if (this._dcurrentpercent.value && this._dcurrentpercent.value !== null) {
					percentBlock.style.display = 'inline-block';

					alarmContainer.classList.add('default');
					alarmContainer.classList.remove('unknown');
					alarmContainer.classList.remove('error');
	
					overlayContainer.classList.add('invisible');
					overlayContainer.classList.remove('visible');
	
					colorLayer.classList.add('default');
					colorLayer.classList.remove('error');

					percentVal = parseFloat(this._dcurrentpercent.value);

						if (percentVal <= 0) {
							colorPercent = 0;
							percentCont.innerHTML = '0%';
							colorLayer.style.opacity = "" + colorPercent + "";
						} else {
							colorPercent = percentVal.toFixed(1);
							percentCont.innerHTML = percentVal.toFixed(1) + '%';
							let finalOpacity = (0.8 * colorPercent + 20) / 100;
							colorLayer.style.opacity = "" + finalOpacity + "";
						}
				} else {
					percentBlock.style.display = 'none';
					percentCont.innerHTML = '';
					colorLayer.style.opacity = 0;

					overlayContainer.classList.add('visible');
					overlayContainer.classList.remove('invisible');

					alarmContainer.classList.add('unknown');
					alarmContainer.classList.remove('default');
					alarmContainer.classList.remove('error');

					colorLayer.classList.add('default');
					colorLayer.classList.remove('error');

					if (isNaN(stateVal) || stateVal == null) {
						//нет сигнала
						alarmContainer.classList.add('unknown');
						alarmContainer.classList.remove('default');
						alarmContainer.classList.remove('error');
			
						overlayContainer.classList.add('visible');
						overlayContainer.classList.remove('invisible');
			
						colorLayer.classList.add('default');
						colorLayer.classList.remove('error');		
					} else {
						if (stateVal == 0) {
							//закрыто
							alarmContainer.classList.add('default');
							alarmContainer.classList.remove('unknown');
							alarmContainer.classList.remove('error');
			
							overlayContainer.classList.add('invisible');
							overlayContainer.classList.remove('visible');
			
							colorLayer.classList.add('default');
							colorLayer.classList.remove('error');
						} else if (stateVal == 1) {
							//открыто
							alarmContainer.classList.add('default');
							alarmContainer.classList.remove('unknown');
							alarmContainer.classList.remove('error');
			
							overlayContainer.classList.add('invisible');
							overlayContainer.classList.remove('visible');
			
							colorLayer.classList.add('default');
							colorLayer.classList.remove('error');

							colorLayer.style.opacity = 1;
						} else if (stateVal == -1) {
							//ошибка
							alarmContainer.classList.add('error');
							alarmContainer.classList.remove('unknown');
							alarmContainer.classList.remove('default');
			
							overlayContainer.classList.add('visible');
							overlayContainer.classList.remove('invisible');
			
							colorLayer.classList.add('error');
							colorLayer.classList.remove('default');
						} else if (stateVal == 2) {
							//неопределенное состояние
							alarmContainer.classList.add('default');
							alarmContainer.classList.remove('unknown');
							alarmContainer.classList.remove('error');
				
							overlayContainer.classList.add('visible');
							overlayContainer.classList.remove('invisible');
				
							colorLayer.classList.add('default');
							colorLayer.classList.remove('error');			
						} else {
							//нет сигнала
							alarmContainer.classList.add('unknown');
							alarmContainer.classList.remove('default');
							alarmContainer.classList.remove('error');
				
							overlayContainer.classList.add('visible');
							overlayContainer.classList.remove('invisible');
				
							colorLayer.classList.add('default');
							colorLayer.classList.remove('error');	
						}
					}
				}
			}
			
		});

		if (captionElem) {
			if (!this.getAttribute('id')) {
				captionElem.removeAttribute('id');
				captionElem.UpdateStatic();
			}
		}		
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.valve-n-elem');

		this.AddTooltip(theElemCont, {});
	}
})
