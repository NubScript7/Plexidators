import * as THREE from "three"
import { Player } from "../components/player/Player"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import type { CoreContext } from "../core/CoreContext"
import { inputController } from "./input/InputController"

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
    input = inputController;

    constructor(player: Player, core: CoreContext) {
        this.player = player;

        const control = new OrbitControls(player.camera, core.domElement);
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
        this.momentum = 5;

        this.movementKeys = ["w", "a", "s", "d"];
        this.isMoving = false;
    }

    updateJumpState() {

    }

    update(delta: number) {
        this.velocity.copy(this.input.getMovementVelocity());

        const angle = this.controls.getAzimuthalAngle();

        this.temp_vector.set(this.velocity.x, 0, -this.velocity.y).applyAxisAngle(this.up, angle);


        this.player.body.position.addScaledVector(this.temp_vector, this.momentum * delta);

        this.player.body.updateMatrixWorld();

        //re-sync camera (collisionManager may have already moved the player body)
        // this.syncCameraToBody();

        // this.player.body.rotation.y = this.player.camera.rotation.y;
    }

    syncCameraToBody() {
        this.player.camera.position.sub(this.controls.target);
        
        this.controls.target.copy(this.player.body.position);
        this.player.camera.position.add(this.player.body.position);
    }
}