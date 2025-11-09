import { multiplayerManager } from "./multiplayer/MultiplayerManager";
import { worldManager } from "./core/WorldManager";
import { DebugManager } from "./debug/DebugManager";
import { CoreContext } from "../core/CoreContext";
import { loaderManager } from "./loader/LoaderManager";

export class InitManager {
    static async initialize() {
        await loaderManager.loadModels();
        const core = new CoreContext();

        await multiplayerManager.init(core);
        
        worldManager.initWorld(core);
        DebugManager.initialize(core);
    }
}