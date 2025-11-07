import * as THREE from "three"

export const scene = new THREE.Scene()

export function initScene() {
    const boxMesh = new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.1, 5),
        new THREE.MeshNormalMaterial()
    )

    scene.add(boxMesh)
}