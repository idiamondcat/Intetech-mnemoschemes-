/*  libs:
/data/mnemo/libs/echarts.min.js;
*/

register("graph-elem", class extends SimpleElement {
	_sseriesnames = new Parameter(Type.String, "Названия кривых");
	_scolor = new Parameter(Type.String, "Цвет, задается массивом цветов");
	finalData = new Array();
	valCount = 0;

	static get markup() {
		return `
		<div class="graph-elem">
			<div class="graph-container">
				<div class="graph"></div>
			</div>
		</div>
		`;
	}

	static get style() {
		return `
		.graph-elem {
			display: flex;
			padding: 7px 0;
			box-sizing: border-box;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			background-color: var(--tit-name-cont-bg-color);
			border: 2px solid rgba(170, 170, 170, 1);
			border-radius: 28px;
			width: 100%;
			height: 100%;
		}
		.graph-elem .graph-container {
			display: block;
			position: absolute;
			box-sizing: border-box;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
		}
		.graph-elem .graph-container .graph {
			display: block;
			position: absolute;
			box-sizing: border-box;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
		return ['_sseriesnames', '_scolor'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}

	onUpdateStatic = function() {
		this.createValues();
		let theElemCont = this.shadowRoot.querySelector('.graph-elem');
		let renderArea = theElemCont.querySelector('.graph-container .graph');
		let myChart = echarts.init(renderArea);
		window.onresize = function() {
			myChart.resize();
		};
		let option;
		let lineColors = JSON.parse(this._scolor.value);
		let colorsArr = lineColors;
		
		option = {
			tooltip: {
				trigger: 'axis'
			},
			color: this.createColorsArr(),
			legend: {
				bottom: 12,
				orient: 'vertical',
				width: "100%",
				height: "40%",
				icon: "emptyCircle",
				data: JSON.parse(this._sseriesnames.value)
			},
			grid: {
				top: '12%',
				bottom: '40%',
				left: '3%',
				right: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				show: false,
			  },
			  yAxis: {
				type: 'value',
				show: false
			  },
			series: this.createData(),
		};

		option && myChart.setOption(option);
		this.UpdateDynamic();
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.graph-elem');
		let renderArea = theElemCont.querySelector('.graph-container .graph');
		let myChart = echarts.init(renderArea);
		let myarr = [];
		let legendA = [];
		let timeArr = [];
		let maxValue = [];

		for (let i = 0; i < this.valCount; i++) {
			let idx = i + 1;
			if (this['_dcurrentval' + idx].value !== undefined) {
				let tempArr = JSON.stringify(this['_dcurrentval' + idx].value).replace(/["{}"]/g, '').split('|');
				myarr = this.createTimeAndY(tempArr);
				this.finalData[i].data = myarr.y;
				legendA.push(myarr.y[myarr.y.length-1]);
				timeArr = myarr.time;
			} else {
				let tempArr = [];
				myarr = this.createTimeAndY(tempArr);
				this.finalData[i].data = myarr.y;
				legendA.push(myarr.y);
				timeArr = myarr.time;
			}
		}
	
		const rich = {
			valstyle: {
				fontFamily: '"Ubuntu", sans-serif',
				fontSize: 46,
				fontWeight: 300,
				lineHeight: 55,
				color: 'rgb(28, 38, 43)'
			},
			namestyle: {
				fontFamily: '"Ubuntu", sans-serif',
				fontSize: 42,
				fontWeight: 300,
				lineHeight: 50,
				color: 'rgb(28, 38, 43)',
				padding: [0, 80, 0, 0]
			}
		}
			myChart.setOption({
				legend: {
					width: "100%",
					height: "40%",
					textStyle: {
						rich: rich
					},
					formatter: function(d) {
						return "{namestyle|" + d + "}{valstyle|" + legendA[d-1] + "}";
					},
				}, 
				tooltip: {
					formatter: function (params) {
						let a = [];
						for (let i = 0; i < params.length; i++) {
							a.push(params[i].seriesName + ': ' + params[i].data);
						}
						return a.join('');
					}
				},
				xAxis: {
					data: timeArr
				},
				series: this.finalData

			});
			let maxval = this.addMarklines(this.finalData);
			let avrSeries = {
				id: 'avrSeries',
				type: 'line',
				data: this.finalData,
				barWidth: 0.1,
				barGap: 0.1,
				barCategoryGap: 0.1,
				color: 'transparent',
				showInTooltip: false,
				tooltip: {
					show: false
				 },
				markLine: {
				  show: true,
				  silent: true,
				  symbol: ['none', 'none'],
				  data: [
					{
						name: 'max line',
						type: 'max',
						yAxis: maxval
				  	}
				],
				  lineStyle: {
					width: 2,
					color: '#AAAAAA'
				  },
				  label: {
					show: false
				},
				}
			  };
			myChart.setOption({
				series: avrSeries
			});

			let minSeries = {
				id: 'minSeries',
				type: 'line',
				data: this.finalData,
				barWidth: 0.1,
				barGap: 0.1,
				barCategoryGap: 0.1,
				color: 'transparent',
				showInTooltip: false,
				tooltip: {
					show: false
				 },
				markLine: {
				  show: true,
				  silent: true,
				  symbol: ['none', 'none'],
				  data: [
					  {
						name: 'min line',
						type: 'min',
						yAxis: 0
					}
				],
				  lineStyle: {
					width: 2,
					color: '#AAAAAA'
				  },
				  label: {
					show: false
				},
				}
			  };
			  myChart.setOption({
				series: minSeries
			});
	}


	createValues = function() {
		while (this.valCount > JSON.parse(this._sseriesnames.value).length) {
			let idx = this.valCount;
			delete this['_dcurrentval' + idx];
			this.valCount--;
		}
		while (this.valCount < JSON.parse(this._sseriesnames.value).length) {
			let idx = this.valCount + 1;
			this['_dcurrentval' + idx] = new Parameter(Type.Number, "Данные для построения графика");
			this.valCount++;
		}
	}

	createData = function() {
		if (JSON.parse(this._sseriesnames.value).length !== 0) {
			for (let i = 0; i < JSON.parse(this._sseriesnames.value).length; i++) {
				let obj = {};
				obj.name = JSON.parse(this._sseriesnames.value)[i];
				obj.type = 'line';
				obj.showSymbol = false;
				this.finalData.push(obj);
			}
		} else {
			let obj = {};
			obj.name = 'undefined';
			obj.type = 'line';
			obj.showSymbol = false;
			this.finalData.push(obj);
		}
		return this.finalData;
	}

	createTimeAndY = function(arr) {
		let newObj = {};
		let timeArr = [];
		let yArr = [];
		if (arr.length !== 0) {
			for (let i = 0; i < arr.length; i++) {
				let elem = arr[i].split(';');
				timeArr.push(parseInt(elem[0]));
				yArr.push(parseInt(elem[1]));
				newObj.time = timeArr;
				newObj.y = yArr;
			}
		} else {
			newObj.time = 0;
			newObj.y = 0;
		}
		return newObj;
	}

	
	createColorsArr = function() {
			let colorsValuesArr = [];
			for (let i = 0; i < JSON.parse(this._sseriesnames.value).length; i++) {
				colorsValuesArr.push(this.changeLineColor(JSON.parse(this._scolor.value), i));
			}
			return colorsValuesArr;
	}
	changeLineColor = function(arr, index) {
		let activePartColor;
		let valveType;

		for (let i = 0; i < arr.length; i++) {
			valveType = arr[i];
			if (index == i) {
				switch(valveType) {
					case 'gas':
						activePartColor = GetCurrentThemeStyle("--underlayer-gas-color");
						break;
					case 'vms':
						activePartColor = GetCurrentThemeStyle("--underlayer-vms-color");
						break;
					case 'glycol':
						activePartColor = GetCurrentThemeStyle("--underlayer-glycol-color");
						break;
					case 'crunoff':
						activePartColor = GetCurrentThemeStyle("--underlayer-crunoff-color");
						break;
					default:
						activePartColor = GetCurrentThemeStyle('--underlayer-default-color');
						break;
				}
			}
			
		}
		return activePartColor;
	}
	
	addMarklines = function(arr) {
		let maxValue = [];
		for (let elem of arr) {
			if (elem.data.length !== undefined) {
				maxValue.push(Math.max.apply(null, elem.data));
			}
		}
		if (maxValue.length !== 0) {
			maxValue.sort((a, b) => b - a);
			return maxValue[0];
		}
	}

})