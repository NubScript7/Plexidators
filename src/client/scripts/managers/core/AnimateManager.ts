import type { UUID } from "node:crypto"
import { v4 as uuidV4 } from "uuid"

export type pluginCB = (delta: number) => void
export type pluginMap = Map<string, pluginCB>

export class AnimateManager {
    private _plugins: pluginMap = new Map()

    add(cb: pluginCB) {

        const id = uuidV4();
        this._plugins.set(id, cb);

        return id;
    }

    remove(id: UUID) {
        if(this._plugins.has(id)) {
            this._plugins.delete(id);
        } else {
            return false;
        }
        return true;
    }

    get plugins() {
        return this._plugins.values();
    }

    animate(delta: number) {
        for(const cb of this._plugins.values()) {
            cb(delta);
        }
    }
}