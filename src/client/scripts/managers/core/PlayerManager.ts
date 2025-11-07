import { Player } from "../../components/player/Player";
import { PlayerController } from "../../controllers/PlayerController";
import * as THREE from "three"
import { socketManager } from "../multiplayer/SocketManager";
import { broadcastPlayer } from "../../services/socket/broadcastPlayer";
import { AnimateManager } from "./AnimateManager";

class PlayerManager {
    player?: Player
    controller?: PlayerController
    #initialized: boolean

    constructor() {
        this.#initialized = false;
    }

    get initialized() {
        return this.#initialized;
    }

    initialize(scene: THREE.Scene, renderer: THREE.Renderer) {
        const player = new Player(scene);
        const playerController = new PlayerController(player, renderer.domElement);

        this.controller = playerController;
        this.player = player;

        if(socketManager.online) {
            broadcastPlayer(player);
        }

        AnimateManager.add(() => {
            playerController.update();
            renderer.render(scene, this.player!.camera);
        })
    }
}

export type PlayerManagerType = InstanceType<typeof PlayerManager>;

export const playerManager = new PlayerManager();