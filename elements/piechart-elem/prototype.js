/*  libs:
/data/mnemo/libs/echarts.min.js;
*/

register("piechart-elem", class extends SimpleElement {
	_sseriesnames = new Parameter(Type.String, "Название сектора");
	finalData = new Array();
	valCount = 0;

	static get markup() {
		return `
		<div class="piechart-elem">
			<div class="chart-container">
				<div class="piechart"></div>
			</div>
		</div>
		`;
	}
	static get style() {
		return `
		.piechart-elem {
			display: flex;
			box-sizing: border-box;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
		}
		.piechart-elem .chart-container {
			display: block;
			position: absolute;
			box-sizing: border-box;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
		}
		.piechart-elem .chart-container .piechart {
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
		return ['_sseriesnames'];
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
		let theElemCont = this.shadowRoot.querySelector('.piechart-elem');
		let renderArea = theElemCont.querySelector('.chart-container .piechart');
		let seriesArr;
		let myChart = echarts.init(renderArea);
		window.onresize = function() {
			myChart.resize();
		};
		let option;

		if (typeof this._sseriesnames.value == "string") {
			this.createValues();
			seriesArr = JSON.parse(this._sseriesnames.value);

			if (seriesArr.length !== 0) {
				for (let i = 0; i < seriesArr.length; i++) {
					if (this.finalData.length !== 0) {
						if (this.finalData.some(elem => elem.name === seriesArr[i])) {
						} else {
							let newObj = {};
							newObj.name = seriesArr[i];
							this.finalData.push(newObj);
						}
						let missingElem = this.finalData.findIndex(elem => seriesArr.indexOf(elem.name) === -1);
						if (missingElem !== -1)
							this.finalData.splice(missingElem, 1);
					} else {
						let newObj = {};
						newObj.name = seriesArr[i];
						this.finalData.push(newObj);
					}
				}
			}

			option = {
				tooltip: {
					trigger: 'item'
				},
				series: [
					{
					type: 'pie',
					radius: [83, '100%'],
					center: ['50%', '50%'],
					startAngle: 90,
					roseType: 'radius',
					stillShowZeroSum: true,
					label: {
							show: true,
							position: 'inside',
							fontFamily: '"Ubuntu Condensed", sans-serif',
							fontSize: 22,
							color: GetCurrentThemeStyle('--chart-sector-txt')
						},
						hoverAnimation: false,
						animation: false,
						colorBy: 'data',
						color: this.colorChange([252, 193, 10], [255, 255, 255], seriesArr.length),
					data: this.finalData,
					width: '100%',
					height: '100%'
					}]
			};

			option && myChart.setOption(option);

			this.UpdateDynamic();
		}
		
	}

	onUpdateDynamic = function() {
		let theElemCont = this.shadowRoot.querySelector('.piechart-elem');
		let renderArea = theElemCont.querySelector('.chart-container .piechart');
		let myChart = echarts.init(renderArea);

		if (typeof this._sseriesnames.value == "string") {
			if (JSON.parse(this._sseriesnames.value).length !== 0) {
				for (let i = 0; i < JSON.parse(this._sseriesnames.value).length; i++) {
					let idx = i + 1;
					let val = parseFloat(this['_dcurrentval' + idx].value);
					this.finalData[i].value = val;
				}
			}
			let newArr = this.finalData.filter(elem => !isNaN(elem.value)).sort((a,b) => a.value < b.value ? 1 : -1);
			// newArr.sort((a,b) => a.value < b.value ? 1 : -1);
			let sum = Math.round(newArr.reduce((prev, current) => prev + current.value, 0));
			let changeSlice = this.sliceWidth(newArr);
			for (let i = 0; i < changeSlice.length; i++) {
				[changeSlice[i]['value'], changeSlice[i]['value1']] = [changeSlice[i]['value1'], changeSlice[i]['value']];
			}
				myChart.setOption({
					tooltip: {
						formatter: function(params) {
							return 'Скв. №' + params.data.name + ': ' + Math.round(params.data.value1) + ' ,м³/ч';
						},
						textStyle: {
							fontSize: 18
						},
					},
					series: [{
						data: changeSlice
					}],
					title: {
						subtext: 'Fr сумм, м³/ч',
						text: sum,
						x: 'center',
						y: 'center',
						padding: 0,
						itemGap: 0,
						textStyle:{
							fontFamily: '"Ubuntu Condensed", sans-serif',
							fontSize: 36,
							color: GetCurrentThemeStyle('--chart-center-txt')
						},
						subtextStyle:{
							fontFamily: '"Ubuntu Condensed", sans-serif',
							fontSize: 21,
							color: GetCurrentThemeStyle('--chart-center-txt')
						},
					},
				});
		}
	}

	colorChange = function(from, to, num) {
		let arr = [];
		num--;
		for (let i = 0; i <= num; i++) {
			let color = [];
			let l = from.length;
			for (let k = 0; k < l; k++) {
				color[k] = (to[k] - from[k]) * (i / num) + from[k];
				k < 3 && (color[k] = Math.round(color[k]));
			}
			arr[i] = 'rgb' + (l == 4 ? 'a(' : '(') + color + ')';
		}
	   return arr;
	   }

	sliceWidth = function(arr) {
		if (arr.length !== 0) {
			let maxWidth = arr[0].value;
			arr[0].value1 = maxWidth;
			let a = maxWidth / 100 * 10;
			let i = 1;
			while (i < arr.length) {
				maxWidth = maxWidth - a;
				arr[i].value1 = maxWidth;
				i++;
			}
		}
		return arr;
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
})