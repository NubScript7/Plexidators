import * as THREE from "three"

const SCALE = 100;

export function encodeVector3(vec: THREE.Vector3) {
    const x = Math.round(vec.x * SCALE);
    const y = Math.round(vec.y * SCALE);
    const z = Math.round(vec.z * SCALE);

    return {x, y, z};
}

export function decodeVector3(x: number, y: number, z: number) {
    return new THREE.Vector3(
        x / SCALE,
        y / SCALE,
        z / SCALE,
    )
}