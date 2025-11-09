import * as THREE from "three"

const SCALE = 100;

export function encodeVector3(vec: THREE.Vector3) {

    return new THREE.Vector3(
        Math.round(vec.x * SCALE),
        Math.round(vec.y * SCALE),
        Math.round(vec.z * SCALE),
    )
}

export function decodeVector3(x: number, y: number, z: number) {
    return new THREE.Vector3(
        x / SCALE,
        y / SCALE,
        z / SCALE,
    )
}