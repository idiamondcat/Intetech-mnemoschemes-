/*  libs:
/data/mnemo/libs/echarts.min.js;
*/
register("customtwo-multi-tit-elem", class extends SimpleElement {
		_sitemSize = new Parameter(Type.Numeric, "ширина Grid");
		_sitemSizeHeight = new Parameter(Type.Numeric, "Высота Grid");
		_scaptionfontsizes = new Parameter(Type.String, "Массив размеров подписей");
		_sfontSizeLegend = new Parameter(Type.Numeric, "Размер шрифта легенды");
		_svaluefontsizes = new Parameter(Type.String, "Массив размеров значений");
		_sgrafcount = new Parameter(Type.Numeric, "Количество элементов");
		_sdisplaystate = new Parameter(Type.Numeric, "Показываются ли криты: не задано — показываются; задано (1) — не показываются");

		_dlowestval1 = new Parameter(Type.Numeric, "Нижнее аварийное значение");
		_dhighestval1 = new Parameter(Type.Numeric, "Верхнее аварийное значение");
		_dlowcrit1 = new Parameter(Type.Numeric, "Нижняя предупредительная граница");
		_dhighcrit1 = new Parameter(Type.Numeric, "Верхняя предупредительная граница");
		_douterstate1 = new Parameter(Type.Numeric, "Внешнее состояние");

		_dlowestval2 = new Parameter(Type.Numeric, "Нижнее аварийное значение");
		_dhighestval2 = new Parameter(Type.Numeric, "Верхнее аварийное значение");
		_dlowcrit2 = new Parameter(Type.Numeric, "Нижняя предупредительная граница");
		_dhighcrit2 = new Parameter(Type.Numeric, "Верхняя предупредительная граница");
		_douterstate2 = new Parameter(Type.Numeric, "Внешнее состояние");

		_dlowestval3 = new Parameter(Type.Numeric, "Нижнее аварийное значение");
		_dhighestval3 = new Parameter(Type.Numeric, "Верхнее аварийное значение");
		_dlowcrit3 = new Parameter(Type.Numeric, "Нижняя предупредительная граница");
		_dhighcrit3 = new Parameter(Type.Numeric, "Верхняя предупредительная граница");
		_douterstate3 = new Parameter(Type.Numeric, "Внешнее состояние");

		_dlowestval4 = new Parameter(Type.Numeric, "Нижнее аварийное значение");
		_dhighestval4 = new Parameter(Type.Numeric, "Верхнее аварийное значение");
		_dlowcrit4= new Parameter(Type.Numeric, "Нижняя предупредительная граница");
		_dhighcrit4 = new Parameter(Type.Numeric, "Верхняя предупредительная граница");
		_douterstate4= new Parameter(Type.Numeric, "Внешнее состояние");

		_scaption1 = new Parameter(Type.String, "Наименование линии");
		_dline1 = new Parameter(Type.String, "JSON строка {время|значение,} линии");
		_dcurrentval1 = new Parameter(Type.Numeric, "Текущее значение линии");

		_scaption2 = new Parameter(Type.String, "Наименование линии");
		_dline2 = new Parameter(Type.String, "JSON строка {время|значение,} линии");
		_dcurrentval2 = new Parameter(Type.Numeric, "Текущее значение линии");

		_scaption3 = new Parameter(Type.String, "Наименование линии");
		_dline3 = new Parameter(Type.String, "JSON строка {время|значение,} линии");
		_dcurrentval3 = new Parameter(Type.Numeric, "Текущее значение линии");

		_scaption4 = new Parameter(Type.String, "Наименование линии");
		_dline4 = new Parameter(Type.String, "JSON строка {время|значение,} линии");
		_dcurrentval4 = new Parameter(Type.Numeric, "Текущее значение линии");

		_hideLines = []
		_initedRowsCount = 0

		static get markup() {
			return `
		<div class="customtwo-multi-tit-elem">
			<div class="inside-wrapper">
				<div class="graph-simple-elem"></div>
				<div class="items-wrapper">
					<tit-elem></tit-elem>
				</div>
			</div>
		</div>
		`;
		}

		static get style() {
			return `
		.customtwo-multi-tit-elem{
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
			padding: 1% 0;
			background-color: white;
			border: 3px solid var(--main-object-fill-color);
			border-radius: 8px;
		}
		/*  
		.customtwo-multi-tit-elem.crit {
			border-color: var(--num-value-linecolor-bad);
		}
		.customtwo-multi-tit-elem1.danger {
			border-color: var(--num-value-linecolor-awful);
		}
		*/
		.customtwo-multi-tit-elem .inside-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			overflow: hidden;
		}
		.customtwo-multi-tit-elem .inside-wrapper .graph-simple-elem {
			width: 100%;
			height: 66.5%;
			display: flex;
			box-sizing: border-box;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.customtwo-multi-tit-elem .items-wrapper {
			width: 50%;
			height: 30%;
			padding: 0 3%;
			display: grid;
			grid-template-columns:  1fr;
			grid-auto-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			grid-auto-flow: column;
			grid-column-gap:10px;
			grid-row-gap: 4px;
			overflow: hidden;
			box-sizing: border-box;
		}

		`;
		}

		onConnected() {
		}

		onDisconnected() {
		}

		static get observedAttributes() {
			return ['_scaptionfontsizes', '_sfontSizeLegend', '_sitemSizeHeight', '_svaluefontsizes', '_sitemSize', '_sgrafcount', '_scaption1', '_scaption2', '_scaption3', '_scaption4', '_douterstate', '_dlowestval', '_dhighestval', '_dlowcrit', '_dhighcrit', '_sdisplaystate', '_dline1', '_dline2', '_dline3', '_dline4', '_dcurrentval1', '_dcurrentval2', '_dcurrentval3', '_dcurrentval4'];
		}

		onAttributeChanged(name, oldValue, newValue) {
			if (typeof this[name] !== 'undefined'){
				if (name.includes('_s'))
				{
					this[name].value = newValue;
					this.onUpdateStatic();
				}

				if (name.includes('_d')){
					this[name].value = newValue;
					this.onUpdateDynamic();
				}
			}
		}

		onUpdateStatic = function () {
			this.initTit()
			let theElemConts = this.shadowRoot.querySelector('.customtwo-multi-tit-elem');
			let grid = theElemConts.querySelector('.inside-wrapper .items-wrapper');
			let elemChildren = theElemConts.querySelector('.inside-wrapper .items-wrapper').children
			let graphElem = theElemConts.querySelector('.inside-wrapper .graph-simple-elem');
			let captionFontSizesArray = []
			let valueFontSizesArray = []
			let myChart = echarts.init(graphElem);

			if (this._sitemSize.value !== undefined && this._sitemSize.value !== null && this._sitemSize.value !== '') {
				grid.style.width = this._sitemSize.value + "%"
			}
			if (this._sitemSizeHeight.value !== undefined && this._sitemSizeHeight.value !== null && this._sitemSizeHeight.value !== '') {
				graphElem.style.height = 100 - parseInt(this._sitemSizeHeight.value) + '%'
				grid.style.height = this._sitemSizeHeight.value + "%"
				myChart.resize();
			}

			if (this._sitemSize.value !== undefined && this._sitemSize.value !== null && this._sitemSize.value.value !== '') {
				grid.style.width = this._sitemSize.value + "%"
			}
			if (this._scaptionfontsizes.value) {
				captionFontSizesArray = JSON.parse(this._scaptionfontsizes.value);
			}
			if (this._svaluefontsizes.value) {
				valueFontSizesArray = JSON.parse(this._svaluefontsizes.value);
			}

			//theElemConts = this.shadowRoot.querySelector('.customtwo-multi-tit-elem');
			//graphElem = theElemConts.querySelector('.inside-wrapper .graph-simple-elem');

			window.onresize = function () {
				myChart.resize();
			};
			let option;

			option = {
				color: ['#363535', '#f5bf36', '#1E90FF', '#ADFF2F'],
				grid: {
					top: '5%',
					bottom: '1%',
					left: '3%',
					right: '3%',
					containLabel: false
				},
				legend: {
					show: this._sgrafcount.value === '1' ? false : true,
					orient: 'horizontal',
					y: 'top',
					x: 'center',
					textStyle: {
						fontSize: this._sfontSizeLegend.value,
					},
				},

				xAxis: {
					type: 'time',
					boundaryGap: false,
					show: false,
				},
				yAxis: {
					type: 'value',
					show: false,
					scale: true,
				},

			};
			option && myChart.setOption(option);
			let index = 0
			for (let i = 1; i <= this._sgrafcount.value; i++) {
				if (elemChildren[index] !== undefined) {
					if (this["_scaption" + i].value !== null && this["_scaption" + i].value !== "" && this["_scaption" + i].value !== undefined) {
						elemChildren[index]._scaption.value = this["_scaption" + i].value
						elemChildren[index]._sdisplaystate.value = this._sdisplaystate;
					}
					if (captionFontSizesArray !== undefined) {
						elemChildren[index]._scaptionfontsize.value = captionFontSizesArray[index];
					} else {
						elemChildren[index]._scaptionfontsize.value = 20;
					}
					if (valueFontSizesArray !== undefined) {
						elemChildren[index]._svaluefontsize.value = valueFontSizesArray[index];
					}
					elemChildren[index].UpdateStatic();
				}
				index++
			}
			// this.UpdateDynamic();
		}

		onUpdateDynamic = function () {
			let theElemConts = this.shadowRoot.querySelector('.customtwo-multi-tit-elem')
			let elemChildren = theElemConts.querySelector('.inside-wrapper .items-wrapper').children;
			let graphElem = theElemConts.querySelector('.inside-wrapper .graph-simple-elem')
			let myChart = echarts.init(graphElem)
			myChart.on('legendselectchanged', (params) => {
				let indx = 0
				for (let i = 1; i <= this._sgrafcount.value; i++) {
					indx++
					if (params.name == this["_scaption" + i].value) {
						break;
					}
				}
				if (!params.selected[params.name]) {
					if (this._hideLines.indexOf(indx) == -1) {
						this._hideLines.push(indx)
					}
					this.updateChart(myChart, this._hideLines)
				} else {
					if (this._hideLines.indexOf(indx) != -1) {
						this._hideLines.splice(this._hideLines.indexOf(indx), 1)
					}
					if (this._hideLines.length == 0) {
						myChart.clear()
						let option = {
							color: ['#363535', '#f5bf36', '#1E90FF', '#ADFF2F'],
							grid: {
								top: '5%',
								bottom: '1%',
								left: '3%',
								right: '3%',
								containLabel: false
							},
							legend: {
								show: this._sgrafcount.value === '1' ? false : true,
								orient: 'horizontal',
								y: 'top',
								x: 'center',
								textStyle: {
									fontSize: this._sfontSizeLegend.value,
								},
							},

							xAxis: {
								type: 'time',
								boundaryGap: false,
								show: false,
							},
							yAxis: {
								type: 'value',
								show: false,
								scale: true,
							},
						};

						myChart.setOption(option);
					}
					this.updateChart(myChart, this._hideLines)
				}
			})
			this.updateChart(myChart, this._hideLines)
			let index = 0
			for (let i = 1; i <= this._sgrafcount.value; i++) {
				elemChildren[index]._douterstate = this['_douterstate' + i];
				elemChildren[index]._dlowestval = this['_dlowestval' + i];
				elemChildren[index]._dhighestval = this['_dhighestval' + i];
				elemChildren[index]._dlowcrit = this['_dlowcrit' + i];
				elemChildren[index]._dhighcrit = this['_dhighcrit' + i];
				elemChildren[index]._dcurrentval = this['_dcurrentval' + i]
				elemChildren[index].UpdateDynamic();
				index++
			}
		}

		createTimeAndY = function (arr) {
			let timeArr = [];
			if (arr.length !== 0) {
				for (let i = 0; i < arr.length; i++) {
					let elem = arr[i].split(';');
					timeArr.push([parseFloat(elem[0]), parseFloat(elem[1])]);
				}
			}
			return timeArr;
		}

		markLine = function (arr, lineId) {
			let obj = {}
			obj.colorHighestVal = GetCurrentThemeStyle("--num-value-linecolor-ok")
			obj.colorHighcrit = GetCurrentThemeStyle("--num-value-linecolor-ok")
			obj.colorLowcrit = GetCurrentThemeStyle("--num-value-linecolor-ok")
			obj.colorLowestVal = GetCurrentThemeStyle("--num-value-linecolor-ok")
			let highCrit = parseFloat(this['_dhighcrit' + lineId].value);
			let highVal = parseFloat(this['_dhighestval' + lineId].value);
			let lowCrit = parseFloat(this['_dlowcrit' + lineId].value);
			let lowVal = parseFloat(this['_dlowestval' + lineId].value);

			if (arr) {
				if (!isNaN(highCrit)) {
					obj.max = this['_dhighcrit' + lineId].value
					if (arr.some(elem => parseFloat(elem) >= highCrit)) {
						obj.max = highCrit;
						obj.colorHighcrit = GetCurrentThemeStyle("--num-value-linecolor-bad")
					}
				}
				if (!isNaN(highVal)) {
					if (!obj.max) {
						obj.max = highVal;
					}
					if (arr.some(elem => parseFloat(elem) >= highVal)) {
						obj.max = null
						obj.colorHighestVal = GetCurrentThemeStyle("--num-value-linecolor-awful")
					}
				}
				if (!isNaN(lowCrit)) {
					obj.min = this['_dlowcrit' + lineId].value
					if (arr.some(elem => parseFloat(elem) <= lowCrit)) {
						obj.min = lowCrit;
						obj.colorLowcrit = GetCurrentThemeStyle("--num-value-linecolor-bad")
					}
				}
				if (!isNaN(lowVal)) {
					if (!obj.min) {
						obj.min = lowVal;
					}
					if (arr.some(elem => parseFloat(elem) <= lowVal)) {
						obj.min = null
						obj.colorLowestVal = GetCurrentThemeStyle("--num-value-linecolor-awful")
					}
				}
				// if (obj.max == null) {
				// 	obj.colorHighestVal = GetCurrentThemeStyle("--num-value-linecolor-awful")
				// } else if (obj.max - 10 == parseFloat(this['_dhighestval' + lineId].value) && this['_dhighcrit' + lineId].value !== null) {
				// 	obj.colorHighcrit = GetCurrentThemeStyle("--num-value-linecolor-bad")
				// }
				// if (obj.min == null) {
				// 	obj.colorLowestVal = GetCurrentThemeStyle("--num-value-linecolor-awful")
				// } else if (obj.min + 10 == parseFloat(this['_dlowestval' + lineId].value) && this['_dlowcrit' + lineId].value !== null) {
				// 	obj.colorLowcrit = GetCurrentThemeStyle("--num-value-linecolor-bad")
				// }
			}
			return obj;
		}

		symbolColorChange = function (val, lineId) {
			let color = GetCurrentThemeStyle("--num-value-linecolor-ok")

			let highCrit = parseFloat(this['_dhighcrit' + lineId].value);
			let highVal = parseFloat(this['_dhighestval' + lineId].value);
			let lowCrit = parseFloat(this['_dlowcrit' + lineId].value);
			let lowVal = parseFloat(this['_dlowestval' + lineId].value);

			if (!isNaN(highCrit)) {
				if (parseFloat(val) >= highCrit) {
					color = GetCurrentThemeStyle("--num-value-linecolor-bad")
				}
			}
			if (!isNaN(highVal)) {
				if (parseFloat(val) >= highVal) {
					color = GetCurrentThemeStyle("--num-value-linecolor-awful")
				}
			}
			if (!isNaN(lowCrit)) {
				if (parseFloat(val) <= lowCrit) {
					color = GetCurrentThemeStyle("--num-value-linecolor-bad")
				}
			}
			if (!isNaN(lowVal)) {
				if (parseFloat(val) <= lowVal) {
					color = GetCurrentThemeStyle("--num-value-linecolor-awful")
				}
			}
			return color
		}


		borderColorChange = function (arr) {
			let borderColor = GetCurrentThemeStyle("--tit-name-cont-bg-color")
			if (this._dhighcrit1.value !== null) {
				if (arr.some(elem => parseFloat(elem) >= parseFloat(this._dhighcrit1.value))) {
					borderColor = GetCurrentThemeStyle("--num-value-linecolor-bad")
				}
			}
			if (this._dlowcrit1.value !== null) {
				if (arr.some(elem => parseFloat(elem) <= parseFloat(this._dlowcrit1.value))) {
					borderColor = GetCurrentThemeStyle("--num-value-linecolor-bad")
				}
			}
			if (this._dhighestva1l.value !== null) {
				if (arr.some(elem => parseFloat(elem) >= parseFloat(this._dhighestval1.value))) {
					borderColor = GetCurrentThemeStyle("--num-value-linecolor-awful")
				}
			}

			if (this._dlowestval1.value !== null) {
				if (arr.some(elem => parseFloat(elem) <= parseFloat(this._dlowestval1.value))) {
					borderColor = GetCurrentThemeStyle("--num-value-linecolor-awful")
				}
			}
			return borderColor;
		}


		updateChart = function (myChart, indx) {
			let linechange = []
			let seriesData = {}
			let time = [[]]
			for (let i = 1; i <= this._sgrafcount; i++) {
				time.push(this["_dcurrentval" + i].time)
				if (this["_dline" + i].value && this["_dline" + i].value !== '') {
					let tempArr = JSON.stringify(this["_dline" + i].value).replace(/["{}"]/g, '').split('|')
					seriesData["value" + i] = this.createTimeAndY(tempArr)
					if (this["_dcurrentval" + i].value  && this["_dcurrentval" + i].value !== '') {
						if (!this["_dcurrentval" + i].time) {
							seriesData["value" + i].push([new Date().valueOf(), this["_dcurrentval" + i].value])
							time[time.length - 1] = new Date().valueOf()
						} else
							seriesData["value" + i].push([this["_dcurrentval" + i].time, this["_dcurrentval" + i].value])
					}
				}
			}
			let allValues = []
			let showMarkLines = false;


			let lineId = 1;
			for (let i = 1; i <= this._sgrafcount; i++) {
				if (indx.indexOf(i) == -1) {
					if (seriesData["value" + i]){
						allValues = allValues.concat(seriesData["value" + i].map((elem)=>{return elem[1]}));
						lineId = i;
					}
				}
			}

			if (allValues.length && this._sgrafcount.value === '1') {
				showMarkLines = true;
				linechange = this.markLine(allValues, lineId)
			}



			let seriess = []
			let maxY = null;
			let minY = null;
			for (let i = 1; i <= this._sgrafcount; i++) {
				if (indx.indexOf(i) == -1) {
					let showHighCrit = 1;
					if (!showMarkLines){
						showHighCrit = 0;
					}
					else{
						if (parseFloat(this['_dhighcrit' + i].value) === parseFloat(this['_dhighestval' + i].value)){
							showHighCrit = 0;
						}
					}
					let showLowCrit = 1;
					if (!showMarkLines){
						showLowCrit = 0;
					}
					else{
						if (parseFloat(this['_dhighcrit' + i].value) === parseFloat(this['_dhighestval' + i].value)){
							showLowCrit = 0;
						}
					}
					seriess.push({
							name: this["_scaption" + i].value,
							type: 'line',
							showSymbol: false,
							labelLayout: {
								moveOverlap: 'shiftX'
							},
							data: seriesData["value" + i],
							markPoint: {
								symbolSize: 10,
								itemStyle: {
									color: this.symbolColorChange(this["_dcurrentval" + i].value, i),
								},
								data: [{
									symbol: 'circle',
									type: 'max',
									name: this['_scaption' + i].value,
									coord: seriesData["value" + i] ? seriesData["value" + i][seriesData["value" + i].length-1] : undefined,
								}]
							},
							markLine: {
								lineStyle:{
									opacity: showMarkLines ? 1 : 0
								},
								silent: true,
								symbol: ['none', 'none', 'none', 'none'],
								label: {
									show: false
								},
								data: [
									{
										type: "max",
										name: "Highcrit",
										yAxis: this['_dhighcrit' + i].value,
										lineStyle: {
											width: 2,
											opacity: showHighCrit,
											color: linechange.colorHighcrit
										},
									},
									{
										type: "min",
										name: "Lowcrit",
										yAxis: this['_dlowcrit' + i].value,
										lineStyle: {
											width: 2,
											opacity: showLowCrit,
											color: linechange.colorLowcrit
										},
									},

									{
										type: "max",
										name: "HighestVal",
										yAxis: this['_dhighestval' + i].value,
										lineStyle: {
											width: 2,
											color: linechange.colorHighestVal
										},
									},
									{
										type: "min",
										name: "LowestVal",
										yAxis: this['_dlowestval' + i].value,
										lineStyle: {
											width: 2,
											color: linechange.colorLowestVal
										},
									}
								]
							},
						}
					)
					if (maxY === null || isNaN(maxY)){
						maxY = Math.max(this['_dhighcrit' + i].value, this['_dhighestval' + i].value);
					}
					else{
						let tempMax = Math.max(this['_dhighcrit' + i].value, this['_dhighestval' + i].value);
						if (!isNaN(tempMax))
							maxY = Math.max(maxY,tempMax);
					}
					if (minY === null || isNaN(minY)){
						minY = Math.min(this['_dlowcrit' + i].value, this['_dlowestval' + i].value);
					}
					else{
						let tempMin = Math.min(this['_dlowcrit' + i].value, this['_dlowestval' + i].value);
						if (!isNaN(tempMin))
							minY = Math.min(maxY,tempMin);
					}
				}
			}

			myChart.setOption({
				yAxis: {
					max: Math.max(Math.max(...allValues), maxY),
					min: Math.min(Math.min(...allValues), minY)
				},
				series: seriess
			});

		}
		initTit = function () {
			let theElemConts = this.shadowRoot.querySelector('.customtwo-multi-tit-elem');
			let parentElem = theElemConts.querySelector('.inside-wrapper .items-wrapper')
			let elemChildren = parentElem.children;


			if (this._sgrafcount.value == null) {
				this._sgrafcount.value = '1';
			}

			while (this._initedRowsCount > parseFloat(this._sgrafcount.value)) {
				parentElem.removeChild(parentElem.lastChild);
				this._initedRowsCount--;
			}
			while (this._initedRowsCount < parseFloat(this._sgrafcount.value)) {
				if (this._initedRowsCount > 0) {
					let cloneElem = elemChildren[0].cloneNode(true);
					parentElem.appendChild(cloneElem);
				}
				this._initedRowsCount++;
			}
			elemChildren = parentElem.children;

			for (let i = 0; i< this._initedRowsCount; i++){
				let elem = elemChildren[i];
				if (typeof elem.listeners !== 'undefined'){
					let elemContainer = elem.shadowRoot.querySelector('.tit-elem');
					elemContainer.removeEventListener('mouseenter', elem.listeners.onMouseEnter.listener, elem.listeners.onMouseEnter.option);
					elemContainer.removeEventListener('mouseleave', elem.listeners.onMouseLeave.listener, elem.listeners.onMouseLeave.option);
					elemContainer.removeEventListener('mousemove', elem.listeners.onMouseMove.listener, elem.listeners.onMouseMove.option);
				}
			}
		}


		Init = function () {
			let theElemConts = this.shadowRoot.querySelector('.customtwo-multi-tit-elem')

			this.AddTooltip(theElemConts, {});
		}
	}
)

