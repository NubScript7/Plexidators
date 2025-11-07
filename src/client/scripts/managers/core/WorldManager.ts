import * as THREE from "three"
import { worldConfig } from "../../config/world";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { collisionManager } from "../collision/CollisionManager";

class WorldManager {
    initialized: boolean

    constructor() {
        this.initialized = false;
    }

    async loadMap(scene: THREE.Scene) {
        const gltfLoader = new GLTFLoader();
        const map = await gltfLoader.loadAsync(
            new URL(worldConfig.mapUrl, import.meta.url).href
        );
        map.scene.scale.setScalar(8);
        scene.add(map.scene);
        collisionManager.init(scene, map.scene);
    }

    async initWorld(scene: THREE.Scene) {
        await this.loadMap(scene);

        const ambientLight = new THREE.AmbientLight(0xFFFCFA, 1.5);
        scene.add(ambientLight);

        this.initialized = true;
    }
}

export type WorldManagerType = InstanceType<typeof WorldManager>;

export const worldManager = new WorldManager();