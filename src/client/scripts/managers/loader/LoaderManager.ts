import { LoadingManager } from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/Addons.js";
import { loaderConfig } from "../../config/loader";


class LoaderManager {
    manager = new LoadingManager();
    gltfLoader = new GLTFLoader(this.manager);

    models: Map<string, GLTF> = new Map();

    async loadModels() {
        for await (const model of loaderConfig.models) {
            const url = new URL(model.url, import.meta.url).href;
            const gltf = await this.gltfLoader.loadAsync(url);

            this.models.set(model.name, gltf);
        }
    }
}

export type LoaderManagerType = InstanceType<typeof LoaderManager>;
export const loaderManager = new LoaderManager();