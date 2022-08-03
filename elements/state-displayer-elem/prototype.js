register("state-displayer-elem", class extends SimpleElement {
	_sfontsize = new Parameter(Type.Numeric, "Размер шрифта");
	_dcurrentval = new Parameter(Type.String, "Текущее значение");

	static get markup() {
		return `
		<div class="state-displayer-elem">
			<div class="main-container a-0">
				<div class="hatch-container"></div>
				<div class="info-container-block">
					<div class="somenaming"></div>
				</div>
			</div>
		</div>
		`;
	}
	
	static get style() {
		return `
		.state-displayer-elem {
			display: flex;
			box-sizing: border-box;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 100%;
			border-radius: 3px;
			background-color: var(--tit-name-cont-bg-color);
			overflow: hidden;
		}
		.state-displayer-elem .main-container {
			display: flex;
			position: relative;
			box-sizing: border-box;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			height: 100%;
			cursor: pointer;
		}
		.state-displayer-elem .hatch-container {
			display: block;
			position: absolute;
			box-sizing: border-box;
			z-index: 4;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 999;
		}
		.state-displayer-elem .main-container .info-container-block {
			display: flex;
			position: absolute;
			box-sizing: border-box;
			z-index: 3;
			top: 10%;
			left: 0;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 80%;
		}
		.state-displayer-elem .main-container .info-container-block .somenaming {
			display: block;
			position: relative;
			box-sizing: border-box;
			width: 90%;
			height: var(--state-disp-fontsize);
			margin: 0 auto;
			font-family: 'Ubuntu Condensed', sans-serif;
			font-weight: 400;
			font-size: var(--state-disp-fontsize);
			line-height: var(--state-disp-lineheight);
			text-transform: uppercase;
			text-align: center;
			overflow: hidden;
		}
		.state-displayer-elem .main-container.a-0 .info-container-block .somenaming {
			color: var(--main-txt-color-inversed-a0);
		}
		.state-displayer-elem .main-container.a-1 .info-container-block .somenaming {
			color: var(--main-txt-color-inversed-a1);
		}
		.state-displayer-elem .main-container.a-2 .info-container-block .somenaming {
			color: var(--main-txt-color-inversed-a2);
		}
		.state-displayer-elem .main-container.a-3 .info-container-block .somenaming {
			color: var(--main-txt-color-inversed-a3);
		}
		.state-displayer-elem .main-container.a-4 .info-container-block .somenaming {
			color: var(--main-txt-color-inversed-a4);
		}
		.state-displayer-elem .main-container.a-5 .info-container-block .somenaming {
			color: var(--main-txt-color-inversed-a5);
		}
		.state-displayer-elem .main-container.a-0 .hatch-container {
			background: repeating-linear-gradient(
							-45deg,
							rgba(var(--num-value-hatch-class-unreachable-color)) 0px,
							rgba(var(--num-value-hatch-class-unreachable-color)) 1px,
							rgba(0, 0, 0, 0) 1px,
							rgba(0, 0, 0, 0) 6px,
							rgba(var(--num-value-hatch-class-unreachable-color)) 6px,
							rgba(var(--num-value-hatch-class-unreachable-color)) 7px,
							rgba(0, 0, 0, 0) 7px,
							rgba(0, 0, 0, 0) 12px
						);
			opacity: var(--num-value-hatch-opacity);
			z-index: 999;
		}
		.state-displayer-elem .main-container.a-1 .hatch-container {
			background: none;
			opacity: 0;
		}
		.state-displayer-elem .main-container.a-2 .hatch-container {
			background: none;
			opacity: 0;
		}
		.state-displayer-elem .main-container.a-3 .hatch-container {
			background: none;
			opacity: 0;
		}
		.state-displayer-elem .main-container.a-4 .hatch-container {
			background: none;
			opacity: 0;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_sfontsize','_dcurrentval'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		let theElemCont = this.shadowRoot.querySelector('.state-displayer-elem');
		let displayedValue = theElemCont.querySelector('.main-container .info-container-block .somenaming');

		let fs = this._sfontsize.value;

		if ((fs !== undefined) || (fs !== '')) {
			displayedValue.style.height = parseInt(fs) + 'px';
			displayedValue.style.fontSize = parseInt(fs) + 'px';
			displayedValue.style.lineHeight = (parseInt(fs) + 2) + 'px';
		} else {
			displayedValue.style.fontSize = '';
			displayedValue.style.lineHeight = '';
			displayedValue.style.height = '';
		}
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.state-displayer-elem');
		let displayedValue = theElemCont.querySelector('.main-container .info-container-block .somenaming');
		let mainContainer = theElemCont.querySelector('.main-container');
		let returnInfo = this._dcurrentval.toString();
		let smth, appearanceNum, classStr;

		if ((returnInfo == undefined) || (returnInfo == 'undefined') || (returnInfo == '')) {
			returnInfo = 'Неизв.';
			assignDynamicClass(mainContainer, 'a-0');
		} else {
			appearanceNum = parseInt(this._dcurrentval.appearance);

			if ((appearanceNum == 0) || (isNaN(appearanceNum)))
				classStr = 'a-0';
			else
				classStr = 'a-' + appearanceNum;

			assignDynamicClass(mainContainer, classStr);
		}

		displayedValue.innerHTML = returnInfo;

		function assignDynamicClass(elem, c) {
			killAllClasses(elem);
			elem.classList.add('main-container')

			if (c)
				elem.classList.add(c);


			function killAllClasses(targ)
			{
				let existingClasses = targ.classList;
				let classStorage = [];

				for (let i = 0; i < existingClasses.length; i++)
				{
					classStorage[i] = existingClasses[i];
				}

				for (let j = 0; j < classStorage.length; j++)
				{
					targ.classList.remove(classStorage[j]);
				}
			}
		}

	}

	Init = function() {
		let theElemCont = this.shadowRoot.querySelector('.state-displayer-elem');

		this.AddTooltip(theElemCont, {});
	}
})