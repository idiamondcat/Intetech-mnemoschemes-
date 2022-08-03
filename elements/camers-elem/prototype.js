register("camers-elem", class extends SimpleElement {
	_sfunction = new Parameter(Type.Color, "Назначение, kp-kz");

	static get markup() {
		return `
		<div class="camers-elem">
			<svg class="kp" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.89 34.94">
				<path d="M46.66,34.93h6.18c0.58,0,1.05-0.47,1.05-1.05V1.05c0-0.58-0.47-1.05-1.05-1.05h-6.18c-0.58,0-1.05,0.47-1.05,1.05v32.83C45.61,34.46,46.08,34.93,46.66,34.93"/>
				<path d="M0.46,18.79l13.52,15.67c0.26,0.3,0.6,0.47,0.96,0.47l26.9,0.01c0.78,0,1.42-0.8,1.42-1.79V1.79c0-0.99-0.63-1.79-1.41-1.79L14.94,0c-0.35,0-0.7,0.17-0.96,0.47L0.46,16.16C-0.15,16.87-0.15,18.08,0.46,18.79"/>
			</svg>
			<svg class="kz" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.89 34.94">
				<path d="M7.23,34.93H1.05C0.47,34.93,0,34.46,0,33.88V1.05C0,0.47,0.47,0,1.05,0h6.18c0.58,0,1.05,0.47,1.05,1.05v32.83C8.28,34.46,7.81,34.93,7.23,34.93"/>
				<path d="M53.43,18.79L39.91,34.46c-0.26,0.3-0.6,0.47-0.96,0.47l-26.9,0.01c-0.78,0-1.42-0.8-1.42-1.79V1.79c0-0.99,0.63-1.79,1.41-1.79L38.95,0c0.35,0,0.7,0.17,0.96,0.47l13.52,15.69C54.04,16.87,54.04,18.08,53.43,18.79"/>
			</svg>
			<div class="naming">
				<div class="text-displayer"></div>
			</div>
		</div>
		`;
	}
	
	static get style() {
		return `
		.camers-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;
		}
		.camers-elem .kp path, 
		.camers-elem .kz path {
			fill: var(--barrels-fill);
		}
		.camers-elem .kp, 
		.camers-elem .kz {
			display: none;
		}
		.camers-elem .kp.active, 
		.camers-elem .kz.active {
			display: block;
			max-width: 100%;
			max-height: 100%;
		}
		.camers-elem .naming {
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
			left: 0px;
			right: 0;
			bottom: 0;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			overflow: hidden;
		}
		.camers-elem .naming .text-displayer {
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: 24px;
			font-weight: 400;
			line-height: 29px;
			color: #ffffff;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_sfunction'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.camers-elem');
		let kpElem = theElemCont.querySelector('.kp');
		let kzElem = theElemCont.querySelector('.kz');
		let textElem = theElemCont.querySelector('.naming .text-displayer');
		let functionVal = this._sfunction.value;

		if (functionVal === undefined) {
			functionVal = 'kp';
		}

		switch (functionVal) {
			case 'kp': kpElem.classList.add('active'); kzElem.classList.remove('active'); textElem.innerHTML = 'КП'; break;
			case 'kz': kzElem.classList.add('active'); kpElem.classList.remove('active'); textElem.innerHTML = 'КЗ'; break;
			default: kpElem.classList.add('active'); kzElem.classList.remove('active'); textElem.innerHTML = 'КП'; break;
		}
		
	}

	onUpdateDynamic = function() {
		
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.camers-elem');

		this.AddTooltip(theElemCont, {});
	}
})
