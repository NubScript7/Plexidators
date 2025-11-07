import { debugConfig } from "../../config/debug";
import { toggleCameraHelper } from "../../debug/helpers/cameraHelper";
import { toggleWireframeAll } from "../../debug/helpers/wireFrameAll";
import { masterRenderer } from "../../debug/renderers/masterRender";
import * as THREE from "three"
import { initGUI } from "../../debug/ui/gui";

export class DebugManager {
    static initialize(scene: THREE.Scene, mainRenderer: THREE.WebGLRenderer) {
        //helpers
        toggleCameraHelper(scene, debugConfig.showCameraHelpers);
        toggleWireframeAll(scene, debugConfig.wireFrameEnabled);
        
        //renderers
        masterRenderer.init(scene, mainRenderer);

        masterRenderer.fullScreenMainRenderer(!debugConfig.showDebugRenderer);

        //ui
        initGUI(scene);

    }
}