window.customCards = window.customCards || [];
window.customCards.push({
  type: "toggle-control-button-row",
  name: "toggle control button row",
  description: "A plugin to display your binary entity in a button row with a single button.",
  preview: false,
});

const LitElement = customElements.get("ha-panel-lovelace") ? Object.getPrototypeOf(customElements.get("ha-panel-lovelace")) : Object.getPrototypeOf(customElements.get("hc-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class CustomToggleRow extends LitElement {

	constructor() {
		super();
		this._config = {
			customTheme: false,
			width: '30px',
			height: '30px',
			isOnColor: '#43A047',
			isOffColor: '#f44c09',
			customOffText: 'OFF',
			customOnText: 'ON',
		};
	}
	
	static get properties() {
		return {
			hass: Object,
			_config: Object,
			_stateObj: Object,
			_width: String,
			_height: String,
			_buttonColor: String,
			_buttonText: String,
			_buttonName: String,
			_buttonState: Boolean,
		};
	}
	
	static get styles() {
		return css`
			:host {
				line-height: inherit;
			}
			.box {
				display: flex;
				flex-direction: row;
			}
			.switch {
				margin-left: 2px;
				margin-right: 2px;
				background-color: #759aaa;
				border: 1px solid lightgrey; 
				border-radius: 4px;
				font-size: 10px !important;
				color: inherit;
				text-align: center;
				float: right !important;
				padding: 1px;
				cursor: pointer;
			}
		`;
	}
	
	render() {
		return html`
			<hui-generic-entity-row .hass="${this.hass}" .config="${this._config}">
				<div id='button-container' class='box'>
					<button
						class='switch'
						style='${this._buttonColor};min-width:${this._width};max-width:${this._width};height:${this._height}'
						toggles name="${this._buttonName}"
						@click=${this.setState}>${this._buttonText}</button>
				</div>
			</hui-generic-entity-row>
		`;
	}
	
	firstUpdated() {
		super.firstUpdated();
		this.shadowRoot.getElementById('button-container').addEventListener('click', (ev) => ev.stopPropagation());
	}

	setConfig(config) {
		this._config = { ...this._config, ...config };
	}

	updated(changedProperties) {
		if (changedProperties.has("hass")) {
			this.hassChanged();
		}
	}
	
	hassChanged() {
		const config = this._config;
		const stateObj = this.hass.states[config.entity];
		const custTheme = config.customTheme;
		const buttonWidth = config.width;
		const buttonHeight = config.height;
		const custOnClr = config.isOnColor;
		const custOffClr = config.isOffColor;
		const custOffTxt = config.customOffText;
		const custOnTxt = config.customOnText;
		
		let state;
			if (stateObj) {
				state = stateObj.state;
			}
	
		let color;
			
		if (state == 'on' || state == 'off') {
			if (custTheme) {
				if (state == 'on') {
					color = 'background-color:' + custOnClr;
				} else {
					color = 'background-color:' + custOffClr;
				}
			} else {
				if (state == 'on') {
					color = 'background-color: var(--primary-color)';
				} else {
					color = 'background-color: var(--disabled-text-color)';
				}
			}
		} else {
			color = '#cfccc6';
		}
	
		let offtext = custOffTxt;
		let ontext = custOnTxt;
		let unavailtext = 'N/A';
		
		let buttonwidth = buttonWidth;
		let buttonheight = buttonHeight;
	
		let offname = 'off';
		let onname = 'on';
		let unavailname = 'unavailable';
	
		if (state == 'off') {
			this._stateObj = stateObj;
			this._buttonState = state;
			this._buttonName = onname;
			this._width = buttonwidth;
			this._height = buttonheight;
			this._buttonColor = color;
			this._buttonText = offtext;
		} else if (state == 'on') {
			this._stateObj = stateObj;
			this._buttonState = state;
			this._width = buttonwidth;
			this._height = buttonheight;
			this._buttonName = offname;
			this._buttonColor = color;
			this._buttonText = ontext;
		} else {
			this._stateObj = stateObj;
			this._buttonState = state;
			this._buttonName = unavailname;
			this._width = buttonwidth;
			this._height = buttonheight;
			this._buttonColor = color;
			this._buttonText = unavailtext;
		}
	}
		
	setState(e) {
		const state = e.currentTarget.getAttribute('name');
		if( state == 'on' ){
			this.hass.callService('homeassistant', 'turn_on', {entity_id: this._config.entity});
		} else if (state == 'off' ) {
			this.hass.callService('homeassistant', 'turn_off', {entity_id: this._config.entity});
		}
	}
}
	
customElements.define('toggle-control-button-row', CustomToggleRow);
