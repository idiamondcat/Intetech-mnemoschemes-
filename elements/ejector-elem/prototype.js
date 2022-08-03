register("ejector-elem", class extends SimpleElement {
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_scaption = new Parameter(Type.String, "Текст");
	_scolor = new Parameter(Type.Color, "Цвет");

	_dcurrentval = new Parameter(Type.Numeric, "Состояние активности, 0-1");

	static get markup() {/* массив имён атрибутов для отслеживания их изменений */
		// language=HTML
		return  `
		<div class="ejector-elem">
			<div class="cont">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 63" preserveAspectRatio="xMinYMin meet">
					<g class="elem">
						<g class="unactive-color">
							<polygon points="76.75,46.5 76.75,26.5 76.75,16.5 92.25,6.81 92.25,56.19 "/>
							<polygon points="11.75,51.5 7.75,51.5 7.75,26.5 7.75,11.5 11.75,11.5 14.75,20.5 36.75,20.5 37.75,13.5 40.75,13.5 
							41.75,20.5 70.75,16.5 70.75,26.5 70.75,46.5 41.75,43.5 40.75,49.5 37.75,49.5 36.75,43.5 14.75,43.5 "/>
						</g>
						<g class="color">
							<polygon points="76.75,46.5 76.75,26.5 76.75,16.5 92.25,6.81 92.25,56.19 "/>
							<polygon points="11.75,51.5 7.75,51.5 7.75,26.5 7.75,11.5 11.75,11.5 14.75,20.5 36.75,20.5 37.75,13.5 40.75,13.5 
							41.75,20.5 70.75,16.5 70.75,26.5 70.75,46.5 41.75,43.5 40.75,49.5 37.75,49.5 36.75,43.5 14.75,43.5 "/>
						</g>
					</g>
					<g class="placeholder">
						<g class="overlay-container" fill="none">
							<path d="M4.83,63h89.33c2.67,0,4.83-2.16,4.83-4.83V4.72C99,2.11,96.89,0,94.28,0H4.72C2.11,0,0,2.11,0,4.72v53.44
						C0,60.84,2.16,63,4.83,63z"/>
						</g>
						<g class="alarm-container" fill="none">
							<path d="M94.22,2C95.76,2,97,3.24,97,4.78v53.44c0,1.53-1.24,2.78-2.78,2.78H4.78C3.24,61,2,59.76,2,58.22V4.78
						C2,3.24,3.24,2,4.78,2H94.22 M94.22,0H4.78C2.14,0,0,2.14,0,4.78v53.44C0,60.86,2.14,63,4.78,63h89.44c2.63,0,4.78-2.14,4.78-4.78
						V4.78C99,2.14,96.86,0,94.22,0L94.22,0z"/>
						</g>
					</g>
				</svg>
				<caption-elem class="ejector-caption" id="0"></caption-elem>
			</div>
		</div>
		`;
	}

	static get style() {/* массив имён атрибутов для отслеживания их изменений */
		return  `
		.ejector-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.ejector-elem .cont {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}
		.ejector-elem .cont svg {
			max-width: 100%;
		}
		.ejector-elem .cont svg .elem .unactive-color {
			fill: var(--underlayer-default-color);
		}
		.ejector-elem .cont svg .elem .color {
			fill: var(--underlayer-default-color);
			z-index: 1;
		}
		.ejector-elem .cont svg .elem.default {
			stroke: none;
		}
		.ejector-elem .cont svg .placeholder .alarm-container.default {
			fill: none;
		}
		.ejector-elem .cont svg .placeholder .alarm-container.error {
			fill: var(--num-value-linecolor-awful);
		}
		.ejector-elem .cont svg .placeholder .overlay-container.visible {
			fill: var(--sys-unavailable-color);
		}
		.ejector-elem .cont svg .placeholder .overlay-container.invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_dcurrentval', '_sfontsize', '_scaption'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();

		if (name.includes('_d'))
			this[name].value = newValue;
		this.UpdateDynamic();
	}

	onUpdateStatic() {
		let theElemCont = this.shadowRoot.querySelector('.ejector-elem');
		let captionElem = theElemCont.querySelector('.cont .ejector-caption');
		let captionText = captionElem.shadowRoot.querySelector('.caption-elem .text-displayer');
		let ejectorElem = theElemCont.querySelector('.cont svg');

		if (captionElem !== null) {
			captionElem._scaption = this._scaption;
			captionElem._sfontsize = this._sfontsize;
			captionElem.UpdateStatic();
		}

		let w = this.offsetWidth;
		let txtWidth = captionText.offsetWidth;
		let imageW = Number(ejectorElem.getBBox().width.toFixed(1));
		let imageH = Number(ejectorElem.getBBox().height.toFixed(1));

		if (this._scaption.value !== null) {
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
				this.style.height = imageH + captionElem.offsetHeight + 5 + 'px';
		} 
		else {
				this.style.width = imageW + 'px';
				this.style.height = imageH + 'px';
		}

		ejectorElem.querySelector('.elem .color').style.fill = this.getActiveColor(this._scolor.value);
	}

	onUpdateDynamic() {
		let theElemCont = this.shadowRoot.querySelector('.ejector-elem');
		let elem = theElemCont.querySelector('.cont svg .elem');
		let captionElem = theElemCont.querySelector('.cont .ejector-caption');
		let colorLayer = elem.querySelector('.color');
		let alarmContainer = theElemCont.querySelector('.cont svg .alarm-container');
		let overlayContainer = theElemCont.querySelector('.cont svg .overlay-container');
		let val = parseInt(this._dcurrentval.value);

		var opacity = 0;

		if (isNaN(val)) {
			//нет сигнала
			alarmContainer.classList.add('default');
			alarmContainer.classList.remove('error');

			overlayContainer.classList.add('visible');
			overlayContainer.classList.remove('invisible');
		} else {
			if (val == 0) {
				//закрыто
				alarmContainer.classList.add('default');
				alarmContainer.classList.remove('error');

				overlayContainer.classList.add('invisible');
				overlayContainer.classList.remove('visible');
			} else if (val == 1) {
				//открыто
				alarmContainer.classList.add('default');
				alarmContainer.classList.remove('error');

				overlayContainer.classList.add('invisible');
				overlayContainer.classList.remove('visible');

				opacity = 1;

			} else if (val == -1) {
				//ошибка
				alarmContainer.classList.add('error');
				alarmContainer.classList.remove('default');

				overlayContainer.classList.add('visible');
				overlayContainer.classList.remove('invisible');
			} else {
				//нет сигнала
				alarmContainer.classList.add('default');
				alarmContainer.classList.remove('error');

				overlayContainer.classList.add('visible');
				overlayContainer.classList.remove('invisible');
			}
		}

		colorLayer.style.opacity = '' + opacity + '';

		if (captionElem !== null) {
			if (this.getAttribute('id') == null) {
				captionElem.removeAttribute('id');
				captionElem.UpdateStatic();
			}
		}

		this.UpdateStatic();
	}

	Init = function () {
		let theElemCont = this.shadowRoot.querySelector('.ejector-elem');

		this.AddTooltip(theElemCont, {});
	}
})

