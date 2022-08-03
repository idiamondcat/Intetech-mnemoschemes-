register("pillar-torch-elem", class extends SimpleElement {
	_storchorient =  new Parameter(Type.String, "Положение факела, h - горизонтальное, v - вертикальное");
	_dcurrentval = new Parameter(Type.Numeric, "Состояние активности");

	static get markup() {
		return `
		<div class="pillar-torch-elem">
			<svg class="vertical-torch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 344 1512.5" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="torch">
						<path d="M331.3,1499.09c0,7.37-7.53,13.41-16.74,13.41H30c-9.21,0-16.74-6-16.74-13.41v-13.42c0-7.37,7.53-13.41,16.74-13.41H314.56c9.21,0,16.74,6,16.74,13.41Z"/>
						<path d="M281.09,1452.14c0,7.37-7.54,13.41-16.74,13.41H80.22c-9.2,0-16.73-6-16.73-13.41V1090c0-7.37,7.53-13.41,16.73-13.41H264.35c9.2,0,16.74,6,16.74,13.41Z"/>
						<path d="M264.35,1063.14c0,3.69-3.77,6.71-8.37,6.71H88.59c-4.6,0-8.37-3-8.37-6.71v-13.41c0-3.69,3.77-6.71,8.37-6.71H256c4.6,0,8.37,3,8.37,6.71Z"/>
						<path d="M239.24,1031.3c0,2.76-3.77,5-8.37,5H113.7c-4.6,0-8.37-2.26-8.37-5V309.15c0-2.76,3.77-5,8.37-5H230.87c4.6,0,8.37,2.25,8.37,5Z"/>
						<path d="M289.46,230.73c4.61,0,8.37,3,8.37,6.71v53.65c0,3.71-3.75,6.71-8.37,6.71H55.12c-4.62,0-8.37-3-8.37-6.71V237.44c0-3.71,3.74-6.71,8.37-6.71H81c15.86,27.72,50.8,47,91.34,47s75.45-19.24,91.32-47Z"/>
						<path d="M97,197.2c0,33.28,33.79,60.36,75.33,60.36s75.32-27.08,75.32-60.36V157h16.74V197.2c0,40.74-41.22,73.77-92.06,73.77s-92.06-33-92.06-73.77V157H97Z"/>
						<g class="flame">
							<path d="M151.45,241.86c-31.51-9-43.29-30.51-43.29-54.77s15.9-33,15.9-55.7c0-7.67-5.53-17.9-5.53-17.9a37,37,0,0,1,13.31,14.75c5.22,10.25-.31,11.8,6.67,18.42s14.33-2.62,12.29-10.82-5.62-16.54-5.18-29c1-42,39.59-53.59,39.59-53.59s-13.16,13.83-3.68,38.14,41.85,41.2,51.51,70.84C250,218.45,197.39,243,197.39,243s10.67-11.24,9.73-30.27-14.46-31.52-14.46-31.52c5.25,11.42.17,25.43-8,23.41-12.88-4.06-3.92-20.6-6.9-33.24-4.25-18.25-13.68-28.86-13.68-28.86a38,38,0,0,1,3.15,26.52c-3.61,15.29-19.95,24.19-24.5,40.26s8.73,32.53,8.73,32.53"/>
						</g>
					</g>
				</g>
				<g class="placeholder">
					<path class="alarm-container" d="M286.42,344H57.58A57.58,57.58,0,0,1,0,286.39V57.57A57.58,57.58,0,0,1,57.58,0H286.42A57.58,57.58,0,0,1,344,57.57V286.39A57.58,57.58,0,0,1,286.42,344"/>
				</g>
			</svg>
			<svg class="horizontal-torch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1239.5 361" preserveAspectRatio="xMinYMin meet">
				<g class="elem">
					<g class="torch">
						<path d="M10.92,246.33c-6,0-10.92-4.15-10.92-9.21V80.53c0-5.06,4.92-9.21,10.92-9.21H21.85c6,0,10.92,4.15,10.92,9.21V237.12c0,5.06-4.92,9.21-10.92,9.21Z"/>
						<path d="M47,223a5.68,5.68,0,0,1-5.46-5.84V100.49A5.67,5.67,0,0,1,47,94.66H57.88a5.67,5.67,0,0,1,5.46,5.83V217.16A5.68,5.68,0,0,1,57.88,223Z"/>
						<path d="M72.88,197.74c-2.24,0-4.08-2.17-4.08-4.84V125.13c0-2.66,1.84-4.84,4.08-4.84H980c2.24,0,4.08,2.18,4.08,4.84V192.9c0,2.67-1.84,4.84-4.08,4.84Z"/>
						<path d="M1043.87,250.09c0,3.76-2.44,6.81-5.46,6.81h-43.7c-3,0-5.46-3-5.46-6.81V59.38c0-3.76,2.45-6.81,5.46-6.81h43.7c3,0,5.46,3,5.46,6.81v21c-22.58,12.91-38.23,41.34-38.23,74.33s15.67,61.41,38.23,74.33Z"/>
						<path d="M1071.18,93.43c-27.1,0-49.16,27.5-49.16,61.31s22.06,61.3,49.16,61.3H1104v13.62h-32.77c-33.18,0-60.08-33.54-60.08-74.92s26.9-74.93,60.08-74.93H1104V93.43Z"/>
						<g class="prop">
							<path d="M229.75,325v0Z"/>
							<rect x="217.46" y="149.15" width="18.91" height="183.58"/>
							<rect x="797.59" y="149.15" width="18.91" height="183.58"/>
							<rect x="199.69" y="339.19" width="54.45" height="21.81"/>
							<rect x="779.82" y="339.19" width="54.45" height="21.81"/>
							<g class="joins">
								<line x1="229.75" y1="358.96" x2="520.72" y2="252.48"/>
								<line x1="807.04" y1="358.94" x2="519.45" y2="252.48"/>
							</g>
						</g>
						<g class="flame">
							<path class="cls-5" d="M1034.81,137.78c7.31-25.64,24.84-35.24,44.6-35.24s26.87,12.94,45.36,12.94c6.26,0,14.58-4.5,14.58-4.5a30,30,0,0,1-12,10.84c-8.35,4.25-9.61-.26-15,5.43s2.13,11.66,8.81,10,13.47-4.58,23.63-4.22c34.18.84,43.65,32.22,43.65,32.22s-11.27-10.71-31.06-3-33.55,34.05-57.69,41.92c-45.81,13.81-65.82-29-65.82-29s9.15,8.69,24.65,7.92,25.67-11.76,25.67-11.76c-9.31,4.27-20.71.13-19.06-6.52,3.3-10.48,16.77-3.19,27.06-5.62,14.86-3.45,23.51-11.13,23.51-11.13a30.94,30.94,0,0,1-21.6,2.56c-12.45-2.94-19.7-16.23-32.79-19.94s-26.49,7.11-26.49,7.11"/>
						</g>
					</g>
				</g>
				<g class="placeholder">
					<path class="alarm-container" d="M1190.62,305.72H990.43a48.86,48.86,0,0,1-48.87-48.85v-208A48.86,48.86,0,0,1,990.43,0h200.19a48.86,48.86,0,0,1,48.88,48.85v208a48.86,48.86,0,0,1-48.88,48.85"/>
				</g>
			</svg>
		</div>
		`;
	}
	static get style() {
		return `
		.pillar-torch-elem {
			display: flex;
			flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
		}
		.pillar-torch-elem svg {
			display: none;
		}
		.pillar-torch-elem svg.active {
			display: inline;
			max-width: 100%;
    		max-height: 100%;
		}
		.pillar-torch-elem .vertical-torch .elem .torch path,
		.pillar-torch-elem .horizontal-torch .elem .torch path {
			fill: var(--barrels-fill);
		}
		.pillar-torch-elem .horizontal-torch .elem .torch .prop {
			fill: var(--barrels-fill);
		}
		.pillar-torch-elem .horizontal-torch .elem .torch .prop .joins {
			fill: none;
			stroke: var(--barrels-fill);
			stroke-width: 2px;
			stroke-miterlimit: 10;
		}
		.pillar-torch-elem .vertical-torch .elem .torch .flame.on,
		.pillar-torch-elem .horizontal-torch .elem .torch .flame.on {
			fill: var(--flame-color);
		}
		.pillar-torch-elem .vertical-torch .elem .torch .flame.off,
		.pillar-torch-elem .horizontal-torch .elem .torch .flame.off {
			fill: rgba(0, 0, 0, 0);
		}
		.pillar-torch-elem .vertical-torch .placeholder .visible,
		.pillar-torch-elem .horizontal-torch .placeholder .visible {
			fill: var(--sys-unavailable-color);
		}
		.pillar-torch-elem .vertical-torch .placeholder .invisible,
		.pillar-torch-elem .horizontal-torch .placeholder .invisible {
			fill: none;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_storchorient', '_dcurrentval'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();

		this.UpdateDynamic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.pillar-torch-elem');
		let vTorch = theElemCont.querySelector('.vertical-torch');
		let hTorch = theElemCont.querySelector('.horizontal-torch');

		if (this._storchorient.value !== undefined || this._storchorient.value !== '') {
			if (this._storchorient.value == 'v') {
				theElemCont.classList.add('vertical');
				theElemCont.classList.remove('horizontal');
				vTorch.classList.add('active');
				hTorch.classList.remove('active');
			} else if (this._storchorient.value == 'h') {
				theElemCont.classList.add('horizontal');
				theElemCont.classList.remove('vertical');
				hTorch.classList.add('active');
				vTorch.classList.remove('active');
			}
		} else {
			theElemCont.classList.add('vertical');
			theElemCont.classList.remove('horizontal');
			vTorch.classList.add('active');
			hTorch.classList.remove('active');
		}
	}
	
	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.pillar-torch-elem');
		let torchElems = theElemCont.querySelectorAll('svg');
		let flame;
		let alarmContainer;
		let val = parseInt(this._dcurrentval.value);

		torchElems.forEach(elem => {
			if (elem.classList.contains('active')) {
				flame = elem.querySelector('.elem .torch .flame');
				alarmContainer = elem.querySelector('.placeholder .alarm-container');

				if (isNaN(val)) {
					//нет сигнала
					flame.classList.remove('on');
					flame.classList.add('off');
		
					alarmContainer.classList.remove('invisible');
					alarmContainer.classList.add('visible');
				} else {
					if (val == 0) {
						//закрыто
						flame.classList.remove('on');
						flame.classList.add('off');
		
						alarmContainer.classList.remove('visible');
						alarmContainer.classList.add('invisible');
					} else if (val == 1) {
						//открыто
						flame.classList.remove('off');
						flame.classList.add('on');
		
						alarmContainer.classList.remove('visible');
						alarmContainer.classList.add('invisible');
					} else {
						//нет сигнала
						flame.classList.remove('on');
						flame.classList.add('off');
		
						alarmContainer.classList.remove('invisible');
						alarmContainer.classList.add('visible');
					}
				}
			}
		})
	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.pillar-torch-elem');

		this.AddTooltip(theElemCont, {});
	}
})