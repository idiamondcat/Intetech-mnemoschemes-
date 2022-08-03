/*  libs:
/data/mnemo/libs/echarts.min.js;
*/

register("custom-multi-tit-elem", class extends SimpleElement {
	_scaption = new Parameter(Type.String, "Подпись");
	_sdisplaystate = new Parameter(Type.Numeric, "Показываются ли криты: не задано — показываются; задано (1) — не показываются");
	_scaptionsize = new Parameter(Type.Numeric, "Размер шрифта");
	_dlowestval = new Parameter(Type.Numeric, "Нижнее аварийное значение");
	_dhighestval = new Parameter(Type.Numeric, "Верхнее аварийное значение");
	_dlowcrit = new Parameter(Type.Numeric, "Нижняя предупредительная граница");
	_dhighcrit = new Parameter(Type.Numeric, "Верхняя предупредительная граница");
	_dline = new Parameter(Type.String, "JSON строка {время|значение,}");
	_dcurrentval = new Parameter(Type.Numeric, "Текущее значение");
	_douterstate = new Parameter(Type.Numeric, "Внешнее состояние");

	static get markup() {
		return `
		<div class="custom-multi-tit-elem">
			<div class="inside-wrapper">
				<div class="graph-simple-elem"></div>
				<div class="items-wrapper">
					<tit-elem class="multi-tit-tit"></tit-elem>
				</div>
			</div>
		</div>
		`;
	}
	static get style() {
		return `
		.custom-multi-tit-elem {
			display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
			padding: 2% 0;
			background-color: var(--tit-name-cont-bg-color);
			border: 2px solid var(--main-object-fill-color);
			border-radius: 8px;
		}
		/*  
		.custom-multi-tit-elem.crit {
			border-color: var(--num-value-linecolor-bad);
		}
		.custom-multi-tit-elem.danger {
			border-color: var(--num-value-linecolor-awful);
		}
		*/
		.custom-multi-tit-elem .inside-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			overflow: hidden;
		}
		.custom-multi-tit-elem .inside-wrapper .graph-simple-elem {
			width: 100%;
			height: 66.5%;
			display: flex;
			box-sizing: border-box;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}
		.custom-multi-tit-elem .items-wrapper {
			width: 100%;
			padding: 0 3.3%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			overflow: hidden;
			box-sizing: border-box;
		}
		.custom-multi-tit-elem .items-wrapper .multi-tit-tit {
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
		return ['_scaption','_scaptionsize', '_douterstate', '_dline','_dcurrentval', '_dlowestval', '_dhighestval', '_dlowcrit', '_dhighcrit', '_sdisplaystate'];
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();

		if (name.includes('_d'))
			this[name].value = newValue;
		this.onUpdateDynamic();
	}

	onUpdateStatic = function() {
		let theElemConts = this.shadowRoot.querySelector('.custom-multi-tit-elem');
		let wrapper = theElemConts.querySelector('.inside-wrapper');
		let titWrapper = theElemConts.querySelector('.inside-wrapper .items-wrapper');
		let titElem = theElemConts.querySelector('.inside-wrapper .items-wrapper .multi-tit-tit');
		let graphElem = theElemConts.querySelector('.inside-wrapper .graph-simple-elem');
		let myChart = echarts.init(graphElem);
		let mainHeight;

		window.addEventListener('resize', function() {
			mainHeight = wrapper.getBoundingClientRect().height;
			titWrapper.style.height = (24 / mainHeight * 100).toFixed(1) + '%';
			myChart.resize();
		});
		let option;

		option = {
			color: '#4474b9',
			grid: {
				top: '3%',
				bottom: '3%',
				left: '3%',
				right: '3%',
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
			series: {
				name: this._scaption.value,
				type: 'line',
				showSymbol: false,
				labelLayout: {
					moveOverlap: 'shiftX'
				  },
			}
		};
		option && myChart.setOption(option);

		if (this._scaption.value) {
			if (titElem !== undefined) {
				titElem._scaption.value = this._scaption.value;
			}
		}
		if (this._scaptionsize.value) {
			if (titElem !== undefined){
				titElem._scaptionfontsize.value = this._scaptionsize.value;
				titElem._svaluefontsize.value =  this._scaptionsize.value;
			}
		}

		if (this._sdisplaystate.value) {
			if (titElem !== undefined)
				titElem._sdisplaystate.value = this._sdisplaystate.value;
		}
        titElem.UpdateStatic();
		this.UpdateDynamic();
	}

	onUpdateDynamic = function() {
		let theElemConts = this.shadowRoot.querySelector('.custom-multi-tit-elem');
		let titElem = theElemConts.querySelector('.inside-wrapper .items-wrapper .multi-tit-tit');
		let graphElem = theElemConts.querySelector('.inside-wrapper .graph-simple-elem');
		let myChart = echarts.init(graphElem);
		let linechange = [];
		let myarr = [];
		let time = this._dcurrentval.time;
		if (this._dline.value !== undefined && this._dline.value !== null && this._dline.value !== '') {
			let tempArr = JSON.stringify(this._dline.value).replace(/["{}"]/g, '').split('|')
			myarr = this.createTimeAndY(tempArr)
			if (this._dcurrentval.value !== undefined && this._dcurrentval.value !== null && this._dcurrentval.value !=='') {
				if (this._dcurrentval.time == 0 || this._dcurrentval.time == null || this._dcurrentval.time == undefined) {
					myarr.push([new Date().valueOf(),this._dcurrentval.value]);
					time = new Date().valueOf();
				}
				else
					myarr.push([this._dcurrentval.time,this._dcurrentval.value]);
			}
		} 
		if (myarr.length){
			linechange = this.changeLine(myarr);
		}

		theElemConts.style.borderColor = linechange.borderColor;
			myChart.setOption({
				yAxis: {
					max : linechange.max,
					min : linechange.min
				},
				series: [{
					data: myarr,
					markPoint: {
						symbolSize: 10,
						itemStyle: {
					   color: linechange.color5,
					  },
					   data: [{
						 symbol: 'circle',
						 type : 'max',
						 name: 'Максимум' ,
						   coord:[time,this._dcurrentval.value],
					   }
					   ]
					   },
					markLine: {
						// show: false,
						silent: true,
						symbol: ['none', 'none','none','none'],
						label: {
							show: false
						},
						data: [
							{
								type: "max",//"average",
								name: "HighestVal",
								show: false,
								yAxis: this._dhighestval.value,
								lineStyle: {
									width: 2,
									color: linechange.colorHighestVal
								},
							},
							{
								type: "max",
								name: "Highcrit",
								show: false,
								yAxis: this._dhighcrit.value,
								lineStyle: {
									width: 2,
									color: linechange.colorHighcrit
								},
							},
							{
								type: "min",
								name: "LowestVal",
								show: false,
								yAxis: this._dlowestval.value,
								lineStyle: {
									width: 2,
									color: linechange.colorLowestVal
								},
							},
							{
								type: "min",
								name: "Lowcrit",
								show: false,
								yAxis:  this._dlowcrit.value,
								lineStyle: {
									width: 2,
									color: linechange.colorLowcrit
								},
							}
						]
					  },
				},
			]

			});
	
			if (titElem !== undefined) {
				titElem._douterstate = this._douterstate;
				titElem._dlowestval = this._dlowestval;
				titElem._dhighestval = this._dhighestval;
				titElem._dlowcrit = this._dlowcrit;
				titElem._dhighcrit = this._dhighcrit;
				titElem._dcurrentval = this._dcurrentval
				titElem.UpdateDynamic();
			}
		}

	createTimeAndY = function(arr) {
		let timeArr = [];
		if (arr.length !== 0) {
			for (let i = 0; i < arr.length; i++) {
				let elem = arr[i].split(';');
				timeArr.push([parseFloat(elem[0]),parseFloat(elem[1])]);
			}
		}
		return timeArr;
	}

	changeLine = function(arr){
	    let obj = {};
		obj.colorHighestVal = GetCurrentThemeStyle("--num-value-linecolor-ok");
		obj.colorHighcrit = GetCurrentThemeStyle("--num-value-linecolor-ok");
		obj.colorLowcrit = GetCurrentThemeStyle("--num-value-linecolor-ok");
		obj.colorLowestVal = GetCurrentThemeStyle("--num-value-linecolor-ok");
		obj.color5 = GetCurrentThemeStyle("--num-value-linecolor-ok");
		obj.borderColor = GetCurrentThemeStyle("--tit-name-cont-bg-color");

		if (arr) {
			if (this._dhighcrit.value !== null && this._dhighcrit.value !== undefined) {
				obj.max = this._dhighcrit.value;
				if (arr.some(elem => parseFloat(elem[1]) >= parseFloat(this._dhighcrit.value))) {
					obj.max = this._dhighestval.value;
				}
			}
			if (this._dhighestval.value !== null&& this._dhighestval.value!==undefined) {
				if (!obj.max) {
					obj.max = this._dhighestval.value;	
				}
				if (arr.some(elem => parseFloat(elem[1]) >= parseFloat(this._dhighestval.value))) {
					obj.max = null;
				}
			}
			if (this._dlowcrit.value !== null&&this._dlowcrit.value !==undefined) {
				obj.min = this._dlowcrit.value;
				if (arr.some(elem => parseFloat(elem[1]) <= parseFloat(this._dlowcrit.value))) {
					obj.min = this._dlowestval.value;
				}
			}
			if (this._dlowestval.value !== null && this._dlowestval.value !== undefined) {
				if (!obj.min) {
					obj.min = this._dlowestval.value;
				}
				if (arr.some(elem => parseFloat(elem[1]) <=  parseFloat(this._dlowestval.value))) {
					obj.min = null;
				}	
			}
			if (obj.max == null) {
				obj.colorHighestVal = GetCurrentThemeStyle("--num-value-linecolor-awful");
			} else if (obj.max == this._dhighestval.value && this._dhighcrit.value !== null) {
				obj.colorHighcrit = GetCurrentThemeStyle("--num-value-linecolor-bad");
			}
			if (obj.min == null){
				obj.colorLowestVal = GetCurrentThemeStyle("--num-value-linecolor-awful");
			} else if (obj.min == this._dlowestval.value && this._dlowcrit.value !== null) {
				obj.colorLowcrit = GetCurrentThemeStyle("--num-value-linecolor-bad");
			}
			if (this._dhighcrit.value !== null) {
				if (parseFloat(arr[arr.length-1][1])>=parseFloat(this._dhighcrit.value)){
					obj.color5 = GetCurrentThemeStyle("--num-value-linecolor-bad");
					obj.borderColor = obj.color5;
				}
			}

		if (this._dhighestval.value !== null) {
			if (parseFloat(arr[arr.length-1][1]) >= parseFloat(this._dhighestval.value)) {
				obj.color5 = GetCurrentThemeStyle("--num-value-linecolor-awful");
				obj.borderColor = obj.color5;
		}
	}
		if (this._dlowcrit.value !== null) {
			if (parseFloat(arr[arr.length-1][1]) <= parseFloat(this._dlowcrit.value)) {
				obj.color5 = GetCurrentThemeStyle("--num-value-linecolor-bad");
				obj.borderColor = obj.color5;
			}
		}
		if (this._dlowestval.value !== null) {
			if (parseFloat(arr[arr.length-1][1]) <= parseFloat(this._dlowestval.value)) {
				obj.color5 = GetCurrentThemeStyle("--num-value-linecolor-awful");
				obj.borderColor = obj.color5;
			}
		}
	}
		return obj;
}
	Init = function() {
		let theElemConts = this.shadowRoot.querySelector('.custom-multi-tit-elem');
		let wrapper = theElemConts.querySelector('.inside-wrapper');
		let titWrapper = wrapper.querySelector('.items-wrapper');

		let mainHeight = wrapper.getBoundingClientRect().height;
		titWrapper.style.height = (24 / mainHeight * 100).toFixed(1) + '%';

		this.AddTooltip(theElemConts, {});
	}
})
