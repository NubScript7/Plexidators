import * as THREE from "three"
import { getDeviceType } from "../../utils/deviceDetector";
import { DesktopController } from "./DesktopController";
import { JoystickController } from "./JoystickController";

export type ControllerState = {
    [k: string]: boolean

    w: boolean
    a: boolean
    s: boolean
    d: boolean
}

export interface InputControllerPlugin {
    designatedDevice: string;
    update?(delta: number): void;
    getMovementVelocity(): THREE.Vector2;
    onActivated?(): void;
}

class InputController implements Partial<InputControllerPlugin> {
    private _controllers: Set<InputControllerPlugin> = new Set();
    private _activeController!: InputControllerPlugin;
    deviceType = getDeviceType();
    
    constructor() {
        this._createControllers();
        
        for(const controller of this._controllers.values()) {
            if(controller.designatedDevice === this.deviceType) {
                controller.onActivated?.();
                this._activeController = controller;
            }
        }
    }

    private _createControllers() {
        this._controllers.add(new DesktopController());
        this._controllers.add(new JoystickController());
    }

    get active() {
        return this._activeController
    }

    addController(controller: InputControllerPlugin) {
        this._controllers.add(controller);
    }

    update(delta: number): void {
        this._activeController.update?.(delta);
    }

    getMovementVelocity() {
        return this._activeController.getMovementVelocity();
    }
}

export type InputControllerType = InstanceType<typeof InputController>;

export const inputController = new InputController();

console.log({
    date: Date.now(),
    active: inputController.active,
    type: inputController.deviceType
})