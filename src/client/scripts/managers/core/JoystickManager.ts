import nipplejs from "nipplejs"
import $ from "jquery"
import * as THREE from "three"

class JoystickManager {
    manager?: nipplejs.JoystickManager
    containerElement: JQuery

    velocity: THREE.Vector2

    constructor() {
        this.containerElement = $("#nipple-container");

        this.velocity = new THREE.Vector2();
    }

    init() {
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

export type JoystickManagerType = InstanceType<typeof JoystickManager>;

export const joystickManager = new JoystickManager();