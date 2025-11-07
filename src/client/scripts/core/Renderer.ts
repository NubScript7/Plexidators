import * as THREE from "three";
import { Storage } from "./Storage";

export const renderer = new THREE.WebGLRenderer({
    antialias: true,
});

export function initRenderer() {
    onresize();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xbfc0cd);
    document.body.appendChild(renderer.domElement);
}

export function onresize() {
    if (!Storage.debug) {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}