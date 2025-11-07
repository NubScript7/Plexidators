import * as THREE from "three"
import { joystickManager } from "../managers/core/JoystickManager";
import { isDesktop, isMobile } from "../utils/deviceDetector";

type ControllerState = {
    [k: string]: boolean

    w: boolean
    a: boolean
    s: boolean
    d: boolean
}

type device = "desktop" | "mobile" | "unknown"

export class InputController {
    state: ControllerState
    deviceType: device

    
    constructor() {
        this.state = {
            // mouse: {
            //     left: false,
            //     middle: false,
            //     right: false
            // },
            
            w: false,
            a: false,
            s: false,
            d: false,
            
            space: false,
        }

        if(isDesktop()) {
            this.deviceType = "desktop";
        } else if(isMobile()) {
            this.deviceType = "mobile";
        } else {
            this.deviceType = "unknown";
        }

        this.initEventListeners()
        window.onblur = () => this._onWindowLostFocus();

    }

    _onWindowLostFocus() {
        this.resetKeys();
    }

    initEventListeners() {
        if(this.deviceType === "desktop") {
            console.log("we are desktop")
            document.addEventListener("keyup", (e) => this._keyUpEventListener(e))
            document.addEventListener("keydown", (e) => this._keyDownEventListener(e))
        } else {
            joystickManager.init();
        }

        // document.addEventListener("mousedown", (e) => this._mouseDownEventListener(e))
        // document.addEventListener("mouseup", (e) => this._mouseUpEventListener(e))
    }

    _keyUpEventListener(e: KeyboardEvent) {
        this.state[e.key.toLowerCase()] = false;
    }

    _keyDownEventListener(e: KeyboardEvent) {
        this.state[e.key.toLowerCase()] = true;
    }

    // _mouseUpEventListener(e: MouseEvent) {
    //     console.log(e)
    // }

    // _mouseDownEventListener(e: MouseEvent) {

    // }

    resetKeys() {
        for(const key of Object.keys(this.state)) {
            this.state[key] = false;
        }
    }

    getVelocity() {
        if(this.deviceType === "desktop") {
            return new THREE.Vector2(
                (this.state.d ? 1 : 0) - (this.state.a ? 1 : 0),
                (this.state.w ? 1 : 0) - (this.state.s ? 1 : 0)
            ).normalize();
        } else {
            return joystickManager.velocity;
        }
    }
}