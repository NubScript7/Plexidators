import * as THREE from "three"
import { Player } from "../components/player/Player"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import { InputController } from "./InputController"

export class PlayerController {
    player: Player
    controls: OrbitControls

    forward: number
    backward: number

    velocity: THREE.Vector2
    temp_vector: THREE.Vector3
    up: THREE.Vector3
    momentum: number

    movementKeys: string[]
    isMoving: boolean
    input: InputController

    constructor(player: Player, domElement: HTMLCanvasElement) {
        this.player = player

        const control = new OrbitControls(player.camera, domElement);
        control.minDistance = 0;
        control.maxDistance = 0.01;

        control.minPolarAngle = 0;
        control.maxPolarAngle = Math.PI;

        control.rotateSpeed = 0.4;

        control.enableZoom = false;
        control.enablePan = false;
        control.update();

        this.controls = control;
        
        this.forward = 0;
        this.backward = 0;

        this.velocity = new THREE.Vector2();
        this.temp_vector = new THREE.Vector3();
        this.up = new THREE.Vector3(0,1,0);
        this.momentum = 0.5;

        this.movementKeys = ["w", "a", "s", "d"];
        this.isMoving = false;

        this.input = new InputController()
        this.input.initEventListeners()
    }

    updateJumpState() {

    }

    update() {
        this.velocity.copy(this.input.getVelocity()).multiplyScalar(0.5)

        const angle = this.controls.getAzimuthalAngle();

        this.temp_vector.set(this.velocity.x, 0, -this.velocity.y).applyAxisAngle(this.up, angle);
        this.player.mesh.position.addScaledVector(this.temp_vector, this.momentum);

        this.player.camera.position.sub(this.controls.target);

        this.controls.target.copy(this.player.mesh.position);
        this.player.camera.position.add(this.player.mesh.position);

        this.player.mesh.rotation.copy(this.player.camera.rotation);
    }
}