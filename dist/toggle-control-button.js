window.customCards = window.customCards || [];
window.customCards.push({
  type: "toggle-control-button",
  name: "Toggle Control Button",
  description: "A plugin to display your binary entity in a button row with a single button.",
  preview: false,
});

class CustomToggleButton extends Polymer.Element {

    static get template() {
        return Polymer.html`
        <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
        <style>
            :host {
                line-height: inherit;
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
        </style>
        <hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
            <div class='horizontal justified layout' on-click="stopPropagation">
                <button
                    class='switch'
                    style='[[_buttonColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]]'
                    toggles name='[[_buttonName]]'
                    on-click='setState'>
                        [[_buttonText]]
                </button>
            </div>
        </hui-generic-entity-row>
        `;
    }

    static get properties() {
        return {
            hass: {
                type: Object,
                observer: 'hassChanged'
            },
            _config: Object,
            _stateObj: Object,
            _width: String,
            _height: String,
            _buttonColor: String,
            _buttonText: String,
            _buttonName: String,
            _buttonState: Boolean,
            }
        }

    setConfig(config) {
        this._config = config;

        this._config = {
            customTheme: false,
            width: '30px',
            height: '30px',
            isOnColor: '#43A047',
            isOffColor: '#f44c09',
            isOnTextColor: '#FFFFFF',
            isOffTextColor: '#FFFFFF',
            customOffText: 'OFF',
            customOnText: 'ON',
            unlockedColor: '#43A047',
            lockedColor: '#f44c09',
            unlockedTextColor: '#FFFFFF',
            lockedTextColor: '#FFFFFF',
            unlockingColor: '#f44c09',
            lockingColor: '#f44c09',
            unlockingTextColor: '#FFFFFF',
            lockingTextColor: '#FFFFFF',
            customUnlockedText: 'LOCK',
            customLockedText: 'UNLOCK',
            customUnlockingText: 'UNLOCKING',
            customLockingText: 'LOCKING',

            ...config
        };
    }

    hassChanged(hass) {

        const config = this._config;
        const stateObj = hass.states[config.entity];
        const custTheme = config.customTheme;
        const buttonWidth = config.width;
        const buttonHeight = config.height;
        const custOnClr = config.isOnColor;
        const custOffClr = config.isOffColor;
        const custOnTxtClr = config.isOnTextColor;
        const custOffTxtClr = config.isOffTextColor;
        const custOffTxt = config.customOffText;
        const custOnTxt = config.customOnText;
        const unlockedClr = config.unlockedColor
        const lockedClr = config.lockedColor
        const unlockedTxtClr = config.unlockedTextColor
        const lockedTxtClr = config.lockedTextColor
        const unlockingClr = config.unlockingColor
        const lockingClr = config.lockingColor
        const unlockingTxtClr = config.unlockingTextColor
        const lockingTxtClr = config.lockingTextColor
        const custUnlockedTxt = config.customUnlockedText
        const custLockedTxt = config.customLockedText
        const custUnlockingTxt = config.customUnlockingText
        const custLockingTxt = config.customLockingText


        let state;
        if (stateObj) {
            state = stateObj.state;
        }

        let color;

        if (state == 'on' || state == 'off' ||
            state == 'locked' || state == 'unlocked' ||
            state == 'locking' || state == 'unlocking') {
            if (custTheme) {
                switch(state){
                    case 'on':
                        color = 'background-color:' + custOnClr + ';color:' + custOnTxtClr;
                        break;
                    case 'off':
                        color = 'background-color:' + custOffClr+ ';color:' + custOffTxtClr;
                        break;
                    case 'unlocked':
                        color = 'background-color:' + unlockedClr+ ';color:' + unlockedTxtClr;
                        break;
                    case 'locked':
                        color = 'background-color:' + lockedClr+ ';color:' + lockedTxtClr;
                        break;
                    case 'unlocking':
                        color = 'background-color:' + unlockingClr+ ';color:' + unlockingTxtClr;
                        break;
                    case 'locking':
                        color = 'background-color:' + lockingClr+ ';color:' + lockingTxtClr;
                        break;
                    default:
                        color = 'background-color: var(--disabled-text-color)';

                }
            } else {
                if (state == 'on' || state == 'unlocked') {
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
        let unlockedtext = custUnlockedTxt;
        let lockedtext = custLockedTxt;
        let unlockingtext = custUnlockingTxt;
        let lockingtext = custLockingTxt;
        let unavailtext = 'N/A';
        let buttonwidth = buttonWidth;
        let buttonheight = buttonHeight;

        let unavailname = 'unavailable';

        if (state == 'off') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _buttonName: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonColor: color,
            _buttonText: offtext,
            });
        } else if (state == 'on') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: ontext,
            });
        } else if (state == 'locked') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: lockedtext,
            });
        } else if (state == 'unlocked') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: unlockedtext,
            });
        } else if (state == 'locking') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: lockingtext,
            });
        } else if (state == 'unlocking') {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonName: state,
            _buttonColor: color,
            _buttonText: unlockingtext,
            });
        } else {
            this.setProperties({
            _stateObj: stateObj,
            _buttonState: state,
            _buttonName: unavailname,
            _width: buttonwidth,
            _height: buttonheight,
            _buttonColor: color,
            _buttonText: unavailtext,
            });
        }
    }


    stopPropagation(e) {
        e.stopPropagation();
    }

    setState(e) {
        const state = e.currentTarget.getAttribute('name');
        if( state == 'off' ){
            this.hass.callService('homeassistant', 'turn_on', {entity_id: this._config.entity});
        } else if (state == 'on' ) {
            this.hass.callService('homeassistant', 'turn_off', {entity_id: this._config.entity});
        } else if (state == 'locked'){
            this.hass.callService('lock', 'unlock', {entity_id: this._config.entity});
        } else if (state == 'unlocked'){
            this.hass.callService('lock', 'lock', {entity_id: this._config.entity});
        }
    }
}

customElements.define('toggle-control-button', CustomToggleButton);