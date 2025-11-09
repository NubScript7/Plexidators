import nipplejs from "nipplejs"
import $ from "jquery"
import * as THREE from "three"
import type { InputControllerPlugin } from "./InputController"

export class JoystickController implements InputControllerPlugin {
    manager?: nipplejs.JoystickManager
    containerElement = $("#nipple-container");

    velocity = new THREE.Vector2()
    designatedDevice = "mobile"

    getMovementVelocity(): THREE.Vector2 {
        return this.velocity;
    }

    onActivated?() {
        this.manager = nipplejs.create({
            zone: this.containerElement.get(0),
            mode: "static",
            position: {
                left: "50%",
                top: "50%"
            },
            size: 150,
            dynamicPage: true,
        })

        this.manager.on("move", (_ev, data) => {
            this.velocity.copy(data.vector);
        })

        this.manager.on("end", () => {
            this.velocity.set(0, 0);
        })
    }
}