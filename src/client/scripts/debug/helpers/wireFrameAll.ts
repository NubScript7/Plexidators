import * as THREE from "three"

export function toggleWireframeAll(scene: THREE.Scene, enable: boolean) {
    scene.traverse((object) => {
        if((object && object instanceof THREE.Mesh) && object.material) {

            object.material.wireframe = enable;
        }
    })
}