import { debugConfig } from "../../config/debug";
import { toggleCameraHelper } from "../../debug/helpers/cameraHelper";
import { toggleWireframeAll } from "../../debug/helpers/wireFrameAll";
import { masterRenderer } from "../../debug/renderers/masterRender";

import { initGUI } from "../../debug/ui/gui";
import type { CoreContext } from "../../core/CoreContext";

export class DebugManager {
    static initialize(core: CoreContext) {
        //helpers
        toggleCameraHelper(core.scene, debugConfig.showCameraHelpers);
        toggleWireframeAll(core.scene, debugConfig.wireFrameEnabled);
        
        //renderers
        masterRenderer.init(core);

        masterRenderer.fullScreenMainRenderer(!debugConfig.showDebugRenderer);

        //ui
        initGUI(core.scene);

    }
}