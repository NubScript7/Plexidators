import type { UUID } from "node:crypto"
import { v4 as uuidV4 } from "uuid"

export type pluginCB = () => void
export type pluginMap = Map<string, pluginCB>

export class AnimateManager {
    static _plugins: pluginMap = new Map()

    static add(cb: pluginCB) {

        const id = uuidV4()
        this._plugins.set(id, cb)

        return id
    }

    static remove(id: UUID) {
        if(this._plugins.has(id)) {
            this._plugins.delete(id)
        } else {
            return false
        }
        return true
    }

    static get plugins() {
        return this._plugins.values()
    }

    static animate() {
        for(const cb of AnimateManager._plugins.values()) {
            cb();
        }
    }
}