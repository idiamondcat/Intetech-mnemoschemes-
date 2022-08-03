register("color-rect-state-stat-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");

	_dcurrentval = new Parameter(Type.Numeric, "Текущее значение");

	static get markup() {
		return `
		<div class="color-rect-state-stat-elem">
			<div class="color-container"></div>
			<div class="content-container">
				<div class="text-displayer"></div>
			</div>
		</div>
		`;
	}
	static get style() {
		return `
		.color-rect-state-stat-elem {
			display: flex;
			box-sizing: border-box;
			flex-direction: column-reverse;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			padding: 4.5px;
			background-color: var(--body-bg-color);
			border: 2px solid var(--toggle-fill-color-a0);
			border-radius: 7px;
			overflow: hidden;
			width: 100%;
			height: 100%;
		}
		.color-rect-state-stat-elem .color-container {
			width: 100%;
			height: 4px;
			background-color: var(--toggle-fill-color-a0);
		}
		.color-rect-state-stat-elem.a-0 {
			border-color: var(--toggle-fill-color-a0);
		}
		.color-rect-state-stat-elem.a-1 {
			border-color: var(--toggle-fill-color-a1);
		}
		.color-rect-state-stat-elem.a-2 {
			border-color: var(--toggle-fill-color-a2);
		}
		.color-rect-state-stat-elem.a-3 {
			border-color: var(--toggle-fill-color-a3);
		}
		.color-rect-state-stat-elem.a-4 {
			border-color: var(--toggle-fill-color-a4);
		}
		.color-rect-state-stat-elem.a-5 {
			border-color: var(--toggle-fill-color-a5);
		}
		.color-rect-state-stat-elem .color-container.a-0 {
			background-color: var(--toggle-fill-color-a0);
		}
		.color-rect-state-stat-elem .color-container.a-1 {
			background-color: var(--toggle-fill-color-a1);
		}
		.color-rect-state-stat-elem .color-container.a-2 {
			background-color: var(--toggle-fill-color-a2);
		}
		.color-rect-state-stat-elem .color-container.a-3 {
			background-color: var(--toggle-fill-color-a3);
		}
		.color-rect-state-stat-elem .color-container.a-4 {
			background-color: var(--toggle-fill-color-a4);
		}
		.color-rect-state-stat-elem .color-container.a-5 {
			background-color: var(--toggle-fill-color-a5);
		}
		.color-rect-state-stat-elem .content-container {
			display: flex;
			box-sizing: border-box;
			width: 100%;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
		}
		.color-rect-state-stat-elem .content-container .text-displayer {
			display: block;
			box-sizing: border-box;
			width: 100%;
			height: var(--state-disp-fontsize);
			font-family: 'Ubuntu Condensed', sans-serif;
			font-size: var(--state-disp-fontsize);
			line-height: var(--state-disp-lineheight);
			font-weight: 400;
			text-align: center;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: var(--tit-name-cont-txt-color);
			overflow: hidden;
		}`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_scaption', '_dcurrentval'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.color-rect-state-stat-elem');

		let contentCont = theElemCont.querySelector('.content-container');
		let displayedValue = contentCont.querySelector('.text-displayer');


		let fs = this._sfontsize.value;
		let caption = this._scaption.value;

		if ((fs !== undefined) && (fs !== '')) {
			displayedValue.style.height = parseInt(fs) + 'px';
			displayedValue.style.fontSize = parseInt(fs) + 'px';
			// displayedValue.style.lineHeight = Math.round(fs * 1.143) + 'px';
		} else {
			displayedValue.style.fontSize = '';
			// displayedValue.style.lineHeight = '';
			displayedValue.style.height = '';
		}

		if ((caption !== undefined) && (caption !== '')) {
			displayedValue.innerHTML = '' + caption;
		} else {
			displayedValue.innerHTML = '';
		}
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.color-rect-state-stat-elem');
		let colorContainer = theElemCont.querySelector('.color-container');

		let dyn = parseValue(this._dcurrentval.value);
		let appearanceNum;

		if (isNaN(dyn)) {
			assignDynamicClass(theElemCont, 'a-0');
			assignDynamicClass(colorContainer, 'a-0');
		} else {
			appearanceNum = parseInt(this._dcurrentval.appearance);
			if ((appearanceNum == 0) || (isNaN(appearanceNum)))
				classStr = 'a-0';
			else 
				classStr = 'a-' + appearanceNum;
		
			assignDynamicClass(theElemCont, classStr);
			assignDynamicClass(colorContainer, classStr);
		}

		function assignDynamicClass(elem, c) {
			killAllClasses(elem);
			if (elem == theElemCont) {
				elem.classList.add('color-rect-state-stat-elem');
			} else if (elem == colorContainer) {
				elem.classList.add('color-container');
			}

			if (c)
				elem.classList.add(c);


			function killAllClasses(targ) {
				var existingClasses = targ.classList;
				var classStorage = [];

				for (var i = 0; i < existingClasses.length; i++)
					classStorage[i] = existingClasses[i];

				for (var j = 0; j < classStorage.length; j++)
					targ.classList.remove(classStorage[j]);
			}
		}

		function parseValue(a) {
			var result;

			if ((a === undefined) || (a === '') || (a === 'undefined')) {
				result = NaN;
			} else {
				result = '' + a;
				result = result.replace(',', '.');
				result = parseFloat(result);
			}
			return result;
		}
	}

	Init = function() {
		var theElemCont = this.shadowRoot.querySelector('.color-rect-state-stat-elem');

		this.AddTooltip(theElemCont, {});
	}
})