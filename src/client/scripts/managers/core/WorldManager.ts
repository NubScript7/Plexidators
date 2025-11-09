import * as THREE from "three"
import { collisionManager } from "../collision/CollisionManager";
import type { CoreContext } from "../../core/CoreContext";
import { loaderManager } from "../loader/LoaderManager";

class WorldManager {

    async loadMap(core: CoreContext) {
        const map = loaderManager.models.get("mapModel");
        map?.scene.traverse((object) => {
            if(object instanceof THREE.Mesh) {
                console.log(object);
            }
        })
        
        map!.scene.scale.setScalar(4);
        map?.scene.updateMatrixWorld(true);
        
        core.scene.add(map!.scene);
        collisionManager.init(core, map!.scene);
    }

    async initWorld(core: CoreContext) {
        await this.loadMap(core);

        const ambientLight = new THREE.AmbientLight(0xFFFCFA, 1.5);
        core.scene.add(ambientLight);
    }
}

export const worldManager = new WorldManager();