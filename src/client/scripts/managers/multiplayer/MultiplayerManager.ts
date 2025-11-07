import { RemotePlayer } from "../../components/player/RemotePlayer";
import { AnimateManager } from "../core/AnimateManager";
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

    async init(scene: THREE.Scene) {
        this.scene = scene;
        await socketManager.init(this);

        this._initUpdater();
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

    _initUpdater() {
        AnimateManager.add(() => {
            for(const player of this.players.values()) {
                player.update();
            }
        })
    }
}

export type MultiplayerManagerType = InstanceType<typeof MultiplayerManager>;
export const multiplayerManager = new MultiplayerManager();