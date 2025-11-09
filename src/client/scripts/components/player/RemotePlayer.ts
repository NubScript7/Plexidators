import * as THREE from "three"
import { Player } from "./Player"

export class RemotePlayer extends Player {
    userId: string

    pos: THREE.Vector3
    rot: THREE.Quaternion
    constructor(userId: string, scene: THREE.Scene) {
        super(scene);
        this.userId = userId;

        this.pos = new THREE.Vector3();
        this.rot = new THREE.Quaternion();
    }

    update() {
        this.body.position.lerp(this.pos, 0.2);
        this.camera.position.copy(this.body.position);
    
        this.camera.quaternion.slerp(this.rot, 0.2);
        this.body.rotation.copy(this.camera.rotation);
    }

    moveToPosition(pos: THREE.Vector3, rot: THREE.Euler) {
        this.pos.copy(pos);
        this.rot.setFromEuler(rot);
    }
}