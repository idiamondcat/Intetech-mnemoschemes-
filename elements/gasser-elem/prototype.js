register("gasser-elem", class extends SimpleElement {
	_scolor = new Parameter(Type.Color, "Цвет");

	_dcurrentval = new Parameter(Type.Numeric, "Текущее значение");
	_dnzstate = new Parameter(Type.Numeric, "Текущее значение надкоренной задвижки");
	_dbzstate = new Parameter(Type.Numeric, "Текущее значение боковой задвижки");
	_dpkostate = new Parameter(Type.Numeric, "Текущее значение подземного крана");

	static get markup() {
		return `
		<div class="gasser-elem">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 160 301.5">
				<g class="elem">
					<path class="valve-big" d="M80,116.8c-10.9,0-19.7,8.8-19.7,19.7s8.8,19.7,19.7,19.7s19.7-8.8,19.7-19.7C99.7,125.7,90.9,116.8,80,116.8z M66.8,136.4
					c0-6.5,4.7-12,11-13v11.7L67.7,141C67.1,139.5,66.8,138,66.8,136.4L66.8,136.4z M80,149.7c-4.1,0-7.7-1.8-10.2-4.7l10.2-5.9
					l10.2,5.9C87.7,147.9,84.1,149.7,80,149.7z M92.5,141l-10.2-5.9v-11.7c6.2,1.1,11,6.5,11,13C93.3,138,93,139.5,92.5,141z"/>
					<path class="valve-small" d="M124.1,74.7c-8.2,0-14.9,6.7-14.9,14.9s6.7,14.9,14.9,14.9S139,97.8,139,89.6S132.3,74.7,124.1,74.7z M114.2,89.6
					c0-3.1,1.4-5.8,3.6-7.7l4.4,7.7l-4.4,7.7C115.6,95.4,114.2,92.7,114.2,89.6z M124.2,99.6c-1.2,0-2.3-0.2-3.4-0.6l4.4-7.7h8.8
					C133.2,96,129.1,99.6,124.2,99.6z M125.2,87.8l-4.4-7.7c1.1-0.4,2.2-0.6,3.4-0.6c4.9,0,9,3.6,9.8,8.3
					C134,87.8,125.2,87.8,125.2,87.8z"/>
					<g class="main-elem">
						<path d="M80,24.6c-10.9,0-19.7,8.9-19.7,19.7S69.1,64,80,64s19.7-8.8,19.7-19.7S90.9,24.6,80,24.6z M66.8,44.2c0-6.5,4.7-12,11-13
						v11.7l-10.1,5.9C67.1,47.3,66.8,45.8,66.8,44.2z M80,57.5c-4.1,0-7.7-1.8-10.2-4.7L80,46.9l10.2,5.9C87.7,55.6,84.1,57.5,80,57.5z
						M92.5,48.8l-10.2-5.9V31.2c6.2,1.1,11,6.5,11,13C93.3,45.8,93,47.3,92.5,48.8z M64.8,243.4h35.4c0.7,0,1.3,0.6,1.3,1.3v5.4
						c-2.1,0.7-4.1,1.2-6.3,1.7v2.9c0,0.7-0.6,1.3-1.3,1.3H66.1c-0.7,0-1.3-0.6-1.3-1.3v-2.9c-2.1-0.5-4.2-1-6.3-1.7v-5.4
						c0-0.7,0.6-1.3,1.3-1.3H64.8 M35.9,74.7c-8.2,0-14.9,6.7-14.9,14.9s6.7,14.9,14.9,14.9s14.9-6.7,14.9-14.9S44.1,74.7,35.9,74.7z
						M26,89.6c0-3.1,1.4-5.8,3.6-7.7l4.4,7.7l-4.4,7.7C27.4,95.4,26,92.7,26,89.6z M36,99.6c-1.2,0-2.3-0.2-3.4-0.6l4.4-7.7h8.8
						C45,96,40.9,99.6,36,99.6z M37,87.8l-4.4-7.7c1.1-0.4,2.2-0.6,3.4-0.6c4.9,0,9,3.6,9.8,8.3C45.8,87.8,37,87.8,37,87.8z M80,111.1
						c2.2,0,4.2,0.3,6.3,0.8c3.3,0.8,6.3,2.3,8.9,4.2v-15.4c0-0.7,0.6-1.3,1.3-1.3h11.7c-1.8-2.9-2.8-6.2-2.8-9.8c0-3.6,1-7,2.8-9.8
						H96.5c-0.7,0-1.3-0.6-1.3-1.3V64.8c-4.2,3.2-9.5,5-15.2,5s-10.9-1.9-15.2-5v13.7c0,0.7-0.6,1.3-1.3,1.3H51.9
						c1.8,2.9,2.8,6.2,2.8,9.8c0,3.6-1,7-2.8,9.8h11.7c0.7,0,1.3,0.6,1.3,1.3v15.4c2.6-2,5.7-3.4,8.9-4.2
						C75.8,111.4,77.9,111.1,80,111.1z M20,99.4c-1.8-2.9-2.8-6.2-2.8-9.8c0-3.6,1-7,2.8-9.8h-8.5c-0.2-1-0.5-1.9-0.8-2.9H8.6
						c-1,0-1.8,0.8-1.8,1.8v21.6c0,1,0.8,1.8,1.8,1.8h2.1c0.3-0.8,0.6-1.7,0.8-2.7C11.5,99.4,20,99.4,20,99.4z M80,236.2h20.2
						c0.7,0,1.3-0.6,1.3-1.3v-5.4c-2.1-0.7-4.1-1.2-6.3-1.7v-29.2c0-0.7,0.6-1.3,1.3-1.3h11.7c-1.8-2.9-2.8-6.2-2.8-9.8s1-7,2.8-9.8
						H96.5c-0.7,0-1.3-0.6-1.3-1.3V157c-4.2,3.2-9.5,5-15.2,5s-10.9-1.9-15.2-5v19.4c0,0.7-0.6,1.3-1.3,1.3H51.9
						c1.8,2.9,2.8,6.2,2.8,9.8s-1,7-2.8,9.8h11.7c0.7,0,1.3,0.6,1.3,1.3v29.2c-2.1,0.5-4.2,1-6.3,1.7v5.4c0,0.7,0.6,1.3,1.3,1.3H80z
						M35.9,172.7c-8.2,0-14.9,6.7-14.9,14.9s6.7,14.9,14.9,14.9s14.9-6.7,14.9-14.9S44.1,172.7,35.9,172.7z M26,187.5
						c0-3.1,1.4-5.8,3.6-7.7l4.4,7.7l-4.4,7.7C27.4,193.4,26,190.6,26,187.5z M36,197.5c-1.2,0-2.3-0.2-3.4-0.6l4.4-7.7h8.8
						C45,194,40.9,197.5,36,197.5z M37,185.8l-4.4-7.7c1.1-0.4,2.2-0.6,3.4-0.6c4.9,0,9,3.6,9.8,8.3H37z M11.5,197.4H20
						c-1.8-2.9-2.8-6.2-2.8-9.8s1-7,2.8-9.8h-8.5c-0.2-1-0.5-1.9-0.8-2.9H8.6c-1,0-1.8,0.8-1.8,1.8v21.6c0,1,0.8,1.8,1.8,1.8h2.1
						C11,199.3,11.3,198.3,11.5,197.4z M80,18.8c2.2,0,4.2,0.3,6.3,0.8c3.3,0.8,6.3,2.3,8.9,4.2v-8.7c2.1-0.5,4.2-1,6.3-1.7V8.1
						c0-0.7-0.6-1.3-1.3-1.3H59.8c-0.7,0-1.3,0.6-1.3,1.3v5.4c2.1,0.7,4.1,1.2,6.3,1.7V24c2.6-2,5.7-3.4,8.9-4.2
						C75.8,19.1,77.9,18.8,80,18.8z M148.5,99.4H140c1.8-2.9,2.8-6.2,2.8-9.8c0-3.6-1-7-2.8-9.8h8.4c0.2-1,0.5-1.9,0.8-2.9h2.1
						c1,0,1.8,0.8,1.8,1.8v21.6c0,1-0.8,1.8-1.8,1.8h-2C149,101.3,148.8,100.4,148.5,99.4z M124.1,172.7c-8.2,0-14.9,6.7-14.9,14.9
						s6.7,14.9,14.9,14.9s14.9-6.7,14.9-14.9S132.3,172.7,124.1,172.7z M124,177.5c1.2,0,2.3,0.2,3.4,0.6l-4.4,7.7h-8.8
						C115,181.1,119.1,177.5,124,177.5z M124,197.5c-4.9,0-9-3.6-9.8-8.3h8.8l4.4,7.7C126.4,197.3,125.2,197.5,124,197.5z M130.5,195.2
						l-4.4-7.7l4.4-7.7c2.2,1.8,3.6,4.6,3.6,7.7C134,190.6,132.7,193.4,130.5,195.2z M148.5,197.4H140c1.8-2.9,2.8-6.2,2.8-9.8
						s-1-7-2.8-9.8h8.4c0.2-1,0.5-1.9,0.8-2.9h2.1c1,0,1.8,0.8,1.8,1.8v21.6c0,1-0.8,1.8-1.8,1.8h-2C149,199.3,148.8,198.3,148.5,197.4
						z"/>
					</g>
					<g class="tap">
						<path d="M53.8,265.9v31c0,0.2,0.2,0.4,0.4,0.4h1.6c0.2,0,0.4-0.2,0.4-0.4v-2.3c0-0.2,0.1-0.5,0.2-0.6l6.6-9.9
						c0.2-0.3,0.4-0.4,0.8-0.4h1.7c0.4,0,0.6,0.3,0.6,0.6v1.7c0,0.2,0.2,0.4,0.4,0.4h3.4c0.2,0,0.4-0.2,0.4-0.4v-9.2
						c0-0.2-0.2-0.4-0.4-0.4h-3.4c-0.2,0-0.4,0.2-0.4,0.4v1.7c0,0.4-0.3,0.6-0.6,0.6h-1.7c-0.3,0-0.6-0.2-0.8-0.4l-6.6-9.9
						c-0.1-0.2-0.2-0.4-0.2-0.6v-2.3c0-0.2-0.2-0.4-0.4-0.4h-1.6C53.9,265.5,53.8,265.7,53.8,265.9L53.8,265.9z M59.4,279
						c0.1,0.2,0.2,0.3,0.2,0.5v3.8c0,0.2-0.1,0.4-0.2,0.5l-3.2,4.8v-14.4L59.4,279L59.4,279z M80,301.3h7.6c0.7,0,1.3-0.6,1.3-1.3v-1.5
						c-0.8-0.3-1.7-0.5-2.6-0.7v-35.1c0.9-0.2,1.7-0.4,2.6-0.7v-1.5c0-0.7-0.6-1.3-1.3-1.3H72.4c-0.7,0-1.3,0.6-1.3,1.3v1.5
						c0.8,0.3,1.7,0.5,2.6,0.7v35.1c-0.9,0.2-1.7,0.4-2.6,0.7v1.5c0,0.7,0.6,1.3,1.3,1.3H80z"/>
					</g>	
				</g>
				<g class="placeholder">
					<g class="overlay-container" fill="none">
						<path d="M153.5,258.3H7.4c-4.1,0-7.4-3.3-7.4-7.4V8.9C0,4,4,0,8.9,0h143.7c4.1,0,7.4,3.3,7.4,7.4v244.9
						C160,255.1,156.4,258.3,153.5,258.3z"/>
					</g>
					<g class="alarm-container" fill="none">
						<path d="M153,2c2.7,0,4.9,2.2,4.9,4.9l0.1,244.6c0,2.7-2.2,4.9-4.9,4.9H7c-2.7,0-4.9-2.2-4.9-4.9L2,8.4
						C2,4.9,4.9,2,8.4,2H153 M153,0H8.4C3.8,0,0,3.8,0,8.4l0.1,243.1c0,3.8,3.1,6.9,6.9,6.9h146.1c3.8,0,6.9-3.1,6.9-6.9L159.9,6.9
						C159.9,3.1,156.8,0,153,0z"/>
					</g>
				</g>
			</svg>
		</div>
		`;
	}

	static get style() {
		return `
		.gasser-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.gasser-elem svg {
			max-width: 100%;
			max-height: 100%;
		}
		.gasser-elem svg .elem .gasser-big {
			fill: var(--underlayer-default-color);
		}
		.gasser-elem svg .elem .valve-small {
			fill: var(--underlayer-default-color);
		}
		.gasser-elem svg .elem .main-elem {
			fill: var(--body-bg-color);
			stroke: var(--underlayer-default-color);
			stroke-width: 2;
		}
		.gasser-elem svg .elem .tap {
			fill: var(--body-bg-color);
			stroke: var(--underlayer-default-color);
			stroke-width: 2;
		}
		.gasser-elem svg .placeholder .alarm-container.default {
			fill: none;
		}
		.gasser-elem svg .placeholder .alarm-container.error {
			fill: var(--num-value-linecolor-awful);
		}
		.gasser-elem svg .placeholder .overlay-container.visible {
			fill: var(--sys-unavailable-color);
		}
		.gasser-elem svg .placeholder .overlay-container.invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentval', '_dnzstate', '_dbzstate', '_dpkostate', '_scolor'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.gasser-elem');
		let elem = theElemCont.querySelector('svg .elem');

		for (let i = 0; i < elem.children.length; i++) {
			let child = elem.children[i];
			this.OnThemeChanged(child);
		}
	}
	
	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.gasser-elem');
		let elem = theElemCont.querySelector('svg .elem');
		let mainElem = elem.querySelector('svg .elem .main-elem');
		let pko = elem.querySelector('svg .elem .tap');
		let nz = elem.querySelector('svg .elem .valve-big');
		let bz = elem.querySelector('svg .elem .valve-small');
		let alarmContainer = theElemCont.querySelector('.alarm-container');
		let overlayContainer = theElemCont.querySelector('.overlay-container');

		this.valueOfElem(this._dcurrentval.value, mainElem);
		this.valueOfElem(this._dnzstate.value, nz);
		this.valueOfElem(this._dbzstate.value, bz);
		this.valueOfElem(this._dpkostate.value, pko);


		let childElems = Array.prototype.slice.call(elem.children);
		if (childElems.some(child => child.classList.contains('error'))) {
			alarmContainer.classList.add('error');
			alarmContainer.classList.remove('default');

			overlayContainer.classList.add('visible');
			overlayContainer.classList.remove('invisible');

			childElems.forEach(item => {
				if (!item.classList.contains('tap')) {
					item.classList.remove('active');
					if (item == mainElem || item == pko)
						item.style.stroke = GetCurrentThemeStyle('--underlayer-default-color');
					else if (item == nz || item == bz)
						item.style.fill = GetCurrentThemeStyle('--underlayer-default-color');
				}
			})
		} else {
			alarmContainer.classList.add('default');
			alarmContainer.classList.remove('error');

			overlayContainer.classList.add('invisible');
			overlayContainer.classList.remove('visible');
		}

		this.UpdateStatic();
	}

	valueOfElem = function(val, item) {
		let theElemCont = this.shadowRoot.querySelector('.gasser-elem');
		let elem = theElemCont.querySelector('svg .elem');
		let mainElem = elem.querySelector('svg .elem .main-elem');
		let pko = elem.querySelector('svg .elem .tap');
		let nz = elem.querySelector('svg .elem .valve-big');
		let bz = elem.querySelector('svg .elem .valve-small');

		if (!item.classList.contains('tap')) {
			if (isNaN(val) || val == undefined) {
				item.classList.remove('error');
				item.classList.remove('active');
				item.classList.add('default');
			} else {
				if (val == 0) {
					item.classList.remove('error');
					item.classList.remove('active');
					item.classList.add('default');
				}
				else if (val == 1) {
					item.classList.remove('error');
					item.classList.remove('default');
					item.classList.add('active');
				}
				else if (val == -1) {
					item.classList.remove('default');
					item.classList.remove('active');
					item.classList.add('error');
				}
			}
		} else {
			if (isNaN(val) || val == undefined) {
				item.classList.remove('error');
				item.classList.remove('active');
				item.classList.add('default');
			} else {
				if (val == 0) {
					item.classList.remove('error');
					item.classList.remove('active');
					item.classList.add('default');
				}
				else if (val == 1) {
					item.classList.remove('error');
					item.classList.remove('default');
					item.classList.add('active');
				}
			}
		}	

		if (item.classList.contains('default')) {
			if (item == mainElem || item == pko)
				item.style.stroke = GetCurrentThemeStyle('--underlayer-default-color');
			else if (item == nz || item == bz)
				item.style.fill = GetCurrentThemeStyle('--underlayer-default-color');
		}
	}

	OnThemeChanged = function(item) {
		let theElemCont = this.shadowRoot.querySelector('.gasser-elem');
		let elem = theElemCont.querySelector('svg .elem');
		let mainElem = elem.querySelector('svg .elem .main-elem');
		let pko = elem.querySelector('svg .elem .tap');
		let nz = elem.querySelector('svg .elem .valve-big');
		let bz = elem.querySelector('svg .elem .valve-small');
		let activePartColor = this.getActiveColor(this._scolor.value);

		if (item != undefined) {
			if (item.classList.contains('active')) {
				if (item == mainElem || item == pko)
					item.style.stroke = activePartColor;
				else if (item == nz || item == bz)
					item.style.fill = activePartColor;
			}
		}
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.gasser-elem');

		this.AddTooltip(theElemCont, {});
	}
})

