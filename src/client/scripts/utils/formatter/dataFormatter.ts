import * as THREE from "three"
import { int16arrayEncoder } from "../common/encoder";
import { decodeVector3, encodeVector3 } from "../common/mapper/vec3";
import { decodeEuler, encodeEuler } from "../common/mapper/euler";

export function encodePacket(pos: THREE.Vector3, rot: THREE.Euler) {
    const vec = encodeVector3(pos);
    const eul = encodeEuler(rot);

    return int16arrayEncoder(vec.x, vec.y, vec.z, eul.x, eul.y, eul.z);
}

export function decodePacket(packet: Int16Array) {
    if(packet.length !== 6) {
        throw new Error("Packet is corrupted.");
    }

    const [ vx, vy, vz, ex, ey, ez ] = packet;

    const pos = decodeVector3(vx, vy, vz);
    const rot = decodeEuler(ex, ey, ez);

    return {
        pos,
        rot,
    }
}