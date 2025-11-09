import * as THREE from "three"
// import { loaderManager } from "../../managers/loader/LoaderManager";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";

export class Player {
    camera: THREE.Camera
    body = new THREE.Mesh(
            new RoundedBoxGeometry( 1.0, 2.0, 1.0, 10, 0.5 ),
            new THREE.MeshStandardMaterial()
        );
    
    // body = loaderManager.models.get("playerModel")!.scene;

    lastPos: THREE.Vector3
    lastRot: THREE.Quaternion

    capsuleInfo = {
        radius: 0.5,
        segment: new THREE.Line3( 
            new THREE.Vector3(),
            new THREE.Vector3( 0, - 1.0, 0.0 ) 
        )
    }

    constructor(scene: THREE.Scene) {
        this.body.geometry.translate( 0, - 0.5, 0 );

        // this.body.scale.setScalar(3);
        // this.body.updateMatrixWorld(true);

        const startPos = new THREE.Vector3(10,3,0);

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camera.position.copy(startPos);
        this.body.position.copy(startPos);

        this.lastRot = new THREE.Quaternion(...this.camera.quaternion);
        this.lastPos = new THREE.Vector3(...startPos);

        scene.add(this.body, this.camera);
    }

    reset() {
        const startVec3 = new THREE.Vector3(0, 0, 0);
        const startRotation = new THREE.Euler(0, 0, 0);

        this.lastPos.copy(startVec3);
        this.lastRot.set(0, 0, 0, 0);

        this.body.position.copy(startVec3);
        this.body.rotation.copy(startRotation);
        
        this.camera.position.copy(startVec3);
        this.camera.rotation.copy(startRotation);
    }
}