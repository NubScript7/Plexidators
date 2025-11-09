import * as THREE from "three";
import type { InputControllerPlugin, ControllerState } from "./InputController";

export class DesktopController implements InputControllerPlugin {
    state: ControllerState = {
        w: false,
        a: false,
        s: false,
        d: false,

        space: false,
    };

    designatedDevice = "desktop";


    constructor() {
        this._initEventListeners();
        window.onblur = () => this._onWindowLostFocus();
    }

    private _onWindowLostFocus() {
        this.resetKeys();
    }

    private _initEventListeners() {
        document.addEventListener("keyup", (e) => this._keyUpEventListener(e));
        document.addEventListener("keydown", (e) => this._keyDownEventListener(e));
    }

    private _keyUpEventListener(e: KeyboardEvent) {
        this.state[e.key.toLowerCase()] = false;
    }

    private _keyDownEventListener(e: KeyboardEvent) {
        this.state[e.key.toLowerCase()] = true;
    }

    resetKeys() {
        for (const key of Object.keys(this.state)) {
            this.state[key] = false;
        }
    }

    getMovementVelocity() {
        return new THREE.Vector2(
            (this.state.d ? 1 : 0) - (this.state.a ? 1 : 0),
            (this.state.w ? 1 : 0) - (this.state.s ? 1 : 0)
        ).normalize();
    }
}
