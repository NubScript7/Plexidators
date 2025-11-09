import { RemotePlayer } from "../../components/player/RemotePlayer";
import type { CoreContext } from "../../core/CoreContext";
import { broadcastPlayer } from "../../services/socket/broadcastPlayer";
import { socketManager } from "./SocketManager";
import * as THREE from "three"

class MultiplayerManager {
    #is_init: boolean
    #m_players: Map<string, RemotePlayer>
    #availablePlayers: RemotePlayer[]

    scene?: THREE.Scene

    constructor() {
        this.#is_init = false;
        this.#m_players = new Map();
        this.#availablePlayers = [];
    }

    get players() {
        return this.#m_players;
    }

    get initialized() {
        return this.#is_init;
    }

    async init(core: CoreContext) {
        this.scene = core.scene;
        await socketManager.init(this);
        
        if(socketManager.online) {
            broadcastPlayer(core.playerManager.player);
        }

        this._initUpdater(core);
    }

    _initializedOrError() {
        if(!this.scene) {
            throw new Error("Mutiplayermanager is not yet initialized.")
        }
    }

    _findOrCreateRemotePlayer(userId: string) {
        this._initializedOrError();

        const player = this.#availablePlayers.pop();
        
        if(!player) {
            return new RemotePlayer(userId, this.scene!);
        }

        return player;
    }

    createRemotePlayer(userId: string) {
        this._initializedOrError();

        const player = this._findOrCreateRemotePlayer(userId);
        
        this.#m_players.set(userId, player);
        
        return player;
    }

    disconnectPlayer(userId: string) {
        this._initializedOrError();
        
        const player = this.#m_players.get(userId);

        if(player) {
            player.userId = '';
            player.reset();
            
            this.#m_players.delete(userId);
            this.#availablePlayers.push(player);

        }
                
    }

    _initUpdater(core: CoreContext) {
        core.animateManager.add(() => {
            for(const player of this.players.values()) {
                player.update();
            }
        })
    }
}

export type MultiplayerManagerType = InstanceType<typeof MultiplayerManager>;
export const multiplayerManager = new MultiplayerManager();