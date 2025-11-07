import dat from "dat.gui"
import { toggleWireframeAll } from '../helpers/wireFrameAll.js';

import * as THREE from "three"
import { debugConfig } from "../../config/debug.js";
import { masterRenderer } from "../renderers/masterRender.js";
import { toggleCameraHelper } from "../helpers/cameraHelper.js";

export function initGUI(scene: THREE.Scene) {
    const gui = new dat.GUI();


    gui.add(debugConfig, "wireFrameEnabled")
    .onChange((enabled: boolean) => {
        toggleWireframeAll(scene, enabled);
    })

    gui.add(debugConfig, "showDebugRenderer")
    .onChange((enabled: boolean) => {
        
        masterRenderer.fullScreenMainRenderer(!enabled);

    })

    gui.add(debugConfig, "showCameraHelpers")
    .onChange((enabled: boolean) => {
        toggleCameraHelper(scene, enabled);
    })
    
}