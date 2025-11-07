import { initRenderer, onresize, renderer } from "../../core/Renderer";
import { Storage } from "../../core/Storage";
import { multiplayerManager } from "../multiplayer/MultiplayerManager";
import { worldManager } from "./WorldManager";
import { initScene, scene } from "../../core/Scene";
import { DebugManager } from "../debug/DebugManager";
import { AnimateManager } from "./AnimateManager";
import { playerManager } from "./PlayerManager";

export class InitManager {
    static async initialize() {
        initRenderer();
        window.onresize = onresize;

        initScene();
        await multiplayerManager.init(scene);
        
        worldManager.initWorld(scene);
        playerManager.initialize(scene, renderer);
        DebugManager.initialize(scene, renderer);

        renderer.setAnimationLoop(AnimateManager.animate)

        Storage.init = true;
    }
}