import * as THREE from "three"

export class Player {
    camera: THREE.Camera
    mesh: THREE.Mesh

    lastPos: THREE.Vector3
    lastRot: THREE.Quaternion

    constructor(scene: THREE.Scene) {
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial()
        
        const startPos = new THREE.Vector3(0,3,0)

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.mesh = new THREE.Mesh(geometry, material);

        this.camera.position.copy(startPos);
        this.mesh.position.copy(startPos);

        this.lastRot = new THREE.Quaternion(...this.camera.quaternion);
        this.lastPos = new THREE.Vector3(...startPos);

        scene.add(this.mesh, this.camera);
    }

    reset() {
        const startVec3 = new THREE.Vector3(0, 0, 0);
        const startRotation = new THREE.Euler(0, 0, 0);

        this.lastPos.copy(startVec3);
        this.lastRot.set(0, 0, 0, 0);

        this.mesh.position.copy(startVec3);
        this.mesh.rotation.copy(startRotation);
        
        this.camera.position.copy(startVec3);
        this.camera.rotation.copy(startRotation);
    }
}