register("heat-exchanger-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Подпись");

	static get markup() {
		return `
		<div class="heat-exchanger-elem">
			<svg version="1.1" class="svg-container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 62" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="main-elem">
						<rect x="35.1" y="1" width="102.3" height="12"/>
						<rect x="35.1" y="49" width="102.3" height="12"/>
						<rect class="text-container" x="35.1" y="13" width="102.3" height="36"/>
					</g>
					<g class="polygons">
						<polygon points="35.1,13 35.1,1 22.3,1 1.2,31 22.3,61 35.1,61 35.1,49"/>
						<polygon points="150.1,1 137.4,1 137.4,13 137.4,49 137.4,61 150.1,61 171.2,31"/>
					</g>
					<g class="lines">
						<path d="M19.8,26.4c-0.2-0.3-0.4-0.5-0.6-0.7c-0.2-0.2-0.4-0.4-0.7-0.5C18.4,25,18.3,25,18.2,25
							c-0.2,0-0.3,0.2-0.3,0.4c0.1,0.3,0.2,0.5,0.3,0.7c0.1,0.2,0.1,0.4,0.2,0.6c0.1,0.4,0.1,0.8,0,1.2c0,0.2-0.1,0.4-0.2,0.6l-0.3,0.7
							c-0.1,0.2-0.2,0.5-0.3,0.7c-0.2,0.5-0.4,1-0.6,1.4c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.3-0.2,0.6-0.2,0.9
							c0,0.6,0.1,1.2,0.4,1.8c0.2,0.3,0.4,0.5,0.6,0.7c0.2,0.2,0.4,0.4,0.7,0.5C18,37,18.1,37,18.3,37c0.2,0,0.3-0.2,0.3-0.4
							c-0.1-0.3-0.2-0.5-0.3-0.7c-0.1-0.2-0.1-0.4-0.2-0.6c-0.1-0.4-0.1-0.8,0-1.2c0-0.2,0.1-0.4,0.2-0.6l0.3-0.7
							c0.1-0.2,0.2-0.5,0.3-0.7c0.2-0.5,0.4-1,0.6-1.4c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.3,0.2-0.6,0.2-0.9
							C20.2,27.5,20.1,26.9,19.8,26.4z"/>
						<path d="M23.8,26.4c-0.2-0.3-0.4-0.5-0.6-0.7c-0.2-0.2-0.4-0.4-0.7-0.5C22.4,25,22.3,25,22.2,25
							c-0.2,0-0.3,0.2-0.3,0.4c0.1,0.3,0.2,0.5,0.3,0.7c0.1,0.2,0.1,0.4,0.2,0.6c0.1,0.4,0.1,0.8,0,1.2c0,0.2-0.1,0.4-0.2,0.6l-0.3,0.7
							c-0.1,0.2-0.2,0.5-0.3,0.7c-0.2,0.5-0.4,1-0.6,1.4c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.3-0.2,0.6-0.2,0.9
							c0,0.6,0.1,1.2,0.4,1.8c0.2,0.3,0.4,0.5,0.6,0.7c0.2,0.2,0.4,0.4,0.7,0.5C22,37,22.1,37,22.3,37c0.2,0,0.3-0.2,0.3-0.4
							c-0.1-0.3-0.2-0.5-0.3-0.7c-0.1-0.2-0.1-0.4-0.2-0.6c-0.1-0.4-0.1-0.8,0-1.2c0-0.2,0.1-0.4,0.2-0.6l0.3-0.7
							c0.1-0.2,0.2-0.5,0.3-0.7c0.2-0.5,0.4-1,0.6-1.4c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.3,0.2-0.6,0.2-0.9
							C24.2,27.5,24.1,26.9,23.8,26.4z"/>
						<path d="M27.8,26.4c-0.2-0.3-0.4-0.5-0.6-0.7c-0.2-0.2-0.4-0.4-0.7-0.5C26.4,25,26.3,25,26.2,25
							c-0.2,0-0.3,0.2-0.3,0.4c0.1,0.3,0.2,0.5,0.3,0.7c0.1,0.2,0.1,0.4,0.2,0.6c0.1,0.4,0.1,0.8,0,1.2c0,0.2-0.1,0.4-0.2,0.6l-0.3,0.7
							c-0.1,0.2-0.2,0.5-0.3,0.7c-0.2,0.5-0.4,1-0.6,1.4c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.3-0.2,0.6-0.2,0.9
							c0,0.6,0.1,1.2,0.4,1.8c0.2,0.3,0.4,0.5,0.6,0.7c0.2,0.2,0.4,0.4,0.7,0.5C26,37,26.1,37,26.3,37c0.2,0,0.3-0.2,0.3-0.4
							c-0.1-0.3-0.2-0.5-0.3-0.7c-0.1-0.2-0.1-0.4-0.2-0.6c-0.1-0.4-0.1-0.8,0-1.2c0-0.2,0.1-0.4,0.2-0.6l0.3-0.7
							c0.1-0.2,0.2-0.5,0.3-0.7c0.2-0.5,0.4-1,0.6-1.4c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.3,0.2-0.6,0.2-0.9
							C28.2,27.5,28.1,26.9,27.8,26.4z"/>
					</g>
					<g class="lines">
						<path d="M147.8,26.4c-0.2-0.3-0.4-0.5-0.6-0.7c-0.2-0.2-0.4-0.4-0.7-0.5c-0.1-0.1-0.2-0.1-0.3-0.1
							c-0.2,0-0.3,0.2-0.3,0.4c0.1,0.3,0.2,0.5,0.3,0.7c0.1,0.2,0.1,0.4,0.2,0.6c0.1,0.4,0.1,0.8,0,1.2c0,0.2-0.1,0.4-0.2,0.6l-0.3,0.7
							c-0.1,0.2-0.2,0.5-0.3,0.7c-0.2,0.5-0.4,1-0.6,1.4c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.3-0.2,0.6-0.2,0.9
							c0,0.6,0.1,1.2,0.4,1.8c0.2,0.3,0.4,0.5,0.6,0.7c0.2,0.2,0.4,0.4,0.7,0.5c0.1,0.1,0.2,0.1,0.3,0.1c0.2,0,0.3-0.2,0.3-0.4
							c-0.1-0.3-0.2-0.5-0.3-0.7c-0.1-0.2-0.1-0.4-0.2-0.6c-0.1-0.4-0.1-0.8,0-1.2c0-0.2,0.1-0.4,0.2-0.6l0.3-0.7
							c0.1-0.2,0.2-0.5,0.3-0.7c0.2-0.5,0.4-1,0.6-1.4c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.3,0.2-0.6,0.2-0.9
							C148.2,27.5,148.1,26.9,147.8,26.4z"/>
						<path d="M151.8,26.4c-0.2-0.3-0.4-0.5-0.6-0.7c-0.2-0.2-0.4-0.4-0.7-0.5c-0.1-0.1-0.2-0.1-0.3-0.1
							c-0.2,0-0.3,0.2-0.3,0.4c0.1,0.3,0.2,0.5,0.3,0.7c0.1,0.2,0.1,0.4,0.2,0.6c0.1,0.4,0.1,0.8,0,1.2c0,0.2-0.1,0.4-0.2,0.6l-0.3,0.7
							c-0.1,0.2-0.2,0.5-0.3,0.7c-0.2,0.5-0.4,1-0.6,1.4c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.3-0.2,0.6-0.2,0.9
							c0,0.6,0.1,1.2,0.4,1.8c0.2,0.3,0.4,0.5,0.6,0.7c0.2,0.2,0.4,0.4,0.7,0.5c0.1,0.1,0.2,0.1,0.3,0.1c0.2,0,0.3-0.2,0.3-0.4
							c-0.1-0.3-0.2-0.5-0.3-0.7c-0.1-0.2-0.1-0.4-0.2-0.6c-0.1-0.4-0.1-0.8,0-1.2c0-0.2,0.1-0.4,0.2-0.6l0.3-0.7
							c0.1-0.2,0.2-0.5,0.3-0.7c0.2-0.5,0.4-1,0.6-1.4c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.3,0.2-0.6,0.2-0.9
							C152.2,27.5,152.1,26.9,151.8,26.4z"/>
						<path d="M155.8,26.4c-0.2-0.3-0.4-0.5-0.6-0.7c-0.2-0.2-0.4-0.4-0.7-0.5c-0.1-0.1-0.2-0.1-0.3-0.1
							c-0.2,0-0.3,0.2-0.3,0.4c0.1,0.3,0.2,0.5,0.3,0.7c0.1,0.2,0.1,0.4,0.2,0.6c0.1,0.4,0.1,0.8,0,1.2c0,0.2-0.1,0.4-0.2,0.6l-0.3,0.7
							c-0.1,0.2-0.2,0.5-0.3,0.7c-0.2,0.5-0.4,1-0.6,1.4c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.2-0.2,0.5-0.3,0.7c-0.1,0.3-0.2,0.6-0.2,0.9
							c0,0.6,0.1,1.2,0.4,1.8c0.2,0.3,0.4,0.5,0.6,0.7c0.2,0.2,0.4,0.4,0.7,0.5c0.1,0.1,0.2,0.1,0.3,0.1c0.2,0,0.3-0.2,0.3-0.4
							c-0.1-0.3-0.2-0.5-0.3-0.7c-0.1-0.2-0.1-0.4-0.2-0.6c-0.1-0.4-0.1-0.8,0-1.2c0-0.2,0.1-0.4,0.2-0.6l0.3-0.7
							c0.1-0.2,0.2-0.5,0.3-0.7c0.2-0.5,0.4-1,0.6-1.4c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.3,0.2-0.6,0.2-0.9
							C156.2,27.5,156.1,26.9,155.8,26.4z"/>
					</g>
				</g>
			</svg>
			<div class="main-container">
				<div class="naming-container">
					<div class="naming">
					</div>
				</div>
			</div>
		</div>
		`;
	}

	static get style() {
		return `
		.heat-exchanger-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.heat-exchanger-elem .svg-container {
			max-width: 100%;
			max-height: 100%;
		}
		.heat-exchanger-elem .svg-container .elem .main-elem {
			fill: var(--barrels-fill);
			stroke: #E9E9E9;
			stroke-width: 2;
		}
		.heat-exchanger-elem .svg-container .elem .polygons {
			fill: var(--barrels-fill);
			stroke: #E9E9E9;
			stroke-width: 2;
		}
		.heat-exchanger-elem .main-container {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			position: absolute;
			top: 50%;
    		transform: translate(0, -50%);
			left: 0px;
			right: 0;
			bottom: 0;
			margin: 0 auto;
			overflow: hidden;
		}
		.heat-exchanger-elem .main-container .naming-container {
			display: block;
			width: 100%;
			padding: 3px;
			box-sizing: border-box;
		}
		.heat-exchanger-elem .main-container .naming-container .naming {
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			text-align: center;
			font-family: 'Ubuntu', sans-serif;
			font-size: 16px;
			font-weight: 300;
			line-height: 19px;
			color: var(--barrels-txt-color);
			overflow: hidden;
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
		let theElemCont = this.shadowRoot.querySelector('.heat-exchanger-elem');
		let arrowCont = theElemCont.querySelector('.svg-container')
		let elem = theElemCont.querySelector('.elem');
		let lines = elem.querySelectorAll('.lines');
		let txtContW = elem.querySelector('.main-elem .text-container').getBBox().width.toFixed(1);
		let txtContH = elem.querySelector('.main-elem .text-container').getBBox().height.toFixed(1);

		let mainContainer = theElemCont.querySelector('.main-container');
		mainContainer.style.width = Number(txtContW) + 'px';
		mainContainer.style.height = Number(txtContH) + 'px';
		
		let namingContainer = mainContainer.querySelector('.naming-container');
		let captionBlock = namingContainer.querySelector('.naming');


		if ((this._sfontsize.value != undefined) || (this._sfontsize.value != '')) {
			captionBlock.style.fontSize = parseInt(this._sfontsize.value) + 'px';
			captionBlock.style.lineHeight = (parseInt(this._sfontsize.value) + 2) + 'px';
		} else {
			captionBlock.style.fontSize = '';
			captionBlock.style.lineHeight = '';
		}


		if (this._scaption.value != undefined)
			captionBlock.innerHTML = "" + this._scaption.value + "";
		else
			captionBlock.innerHTML = "";

		lines.forEach(line => {
			line.style.fill = this.getActiveColor(this._scolor.value);
		})
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.heat-exchanger-elem');

		this.AddTooltip(theElemCont, {});
	}
})