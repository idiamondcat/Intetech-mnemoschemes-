register("range-universal-line-elem", class extends SimpleElement {
	
	static get markup() {
		return `
		<div class="range-universal-line-elem">
			<div class="main-container">
				<div class="edgeline"></div>
				<div class="rangeline"></div>
				<div class="edgeline"></div>
			</div>
		</div>	
		`;
	}
	static get style() {
		return `
		.range-universal-line-elem {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.range-universal-line-elem .main-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			width: 12px;
			height: 100%;
		}
		.range-universal-line-elem .main-container .edgeline {
			display: block;
			box-sizing: border-box;
			width: 100%;
			height: 2px;
			background-color: var(--small-object-fill-color);
		}
		.range-universal-line-elem .main-container .rangeline {
			display: block;
			box-sizing: border-box;
			width: 2px;
			height: 100%;
			background-color: var(--small-object-fill-color);
		}
		`;
	}

	onConnected() {
	}

	onDisconnected() {
	}

	static get observedAttributes() {
	}

	onAttributeChanged(name, oldValue, newValue) {
		if (name.includes('_s'))
			this[name].value = newValue;
		this.UpdateStatic();
	}
})