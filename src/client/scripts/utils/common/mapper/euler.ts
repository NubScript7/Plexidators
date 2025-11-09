import * as THREE from "three"
import { mapFloatToInt16, mapInt16ToFloat } from "../converter/floatMapper";

const ANGLE_MIN = -Math.PI;
const ANGLE_MAX = Math.PI;

export function encodeEuler(e: THREE.Euler) {
    return new THREE.Euler(
        mapFloatToInt16(e.x, ANGLE_MIN, ANGLE_MAX),
        mapFloatToInt16(e.y, ANGLE_MIN, ANGLE_MAX),
        mapFloatToInt16(e.z, ANGLE_MIN, ANGLE_MAX),
    )
}

export function decodeEuler(x: number, y: number, z: number) {
    return new THREE.Euler(
        mapInt16ToFloat(x, ANGLE_MIN, ANGLE_MAX),
        mapInt16ToFloat(y, ANGLE_MIN, ANGLE_MAX),
        mapInt16ToFloat(z, ANGLE_MIN, ANGLE_MAX),
    );
}