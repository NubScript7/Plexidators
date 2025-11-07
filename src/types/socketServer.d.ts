import * as THREE from "three"

export type QuatObj = {
    x: number,
    y: number,
    z: number,
    w: number,
}

export interface ServerToClientEvents {
    "user-connected": (userId: string) => void;
    "user-disconnected": (userId: string) => void;
    "player-move": (userId: string, packet: ArrayBuffer) => void;
    "p2pfast": (userId: string, packet: ArrayBuffer) => void;
    "players": (userIds: string[]) => void;
}

export interface ClientToServerEvents {
    "player-position": (packet: Int16Array) => void;
    "p2pfast": (packet: Int8Array) => void;
}
