import { Player } from "../../components/player/Player";
import { PlayerController } from "../../controllers/PlayerController";
import { socketManager } from "../multiplayer/SocketManager";
import { broadcastPlayer } from "../../services/socket/broadcastPlayer";
import type { CoreContext } from "../../core/CoreContext";

export class PlayerManager {
    player!: Player
    controller!: PlayerController
    #initialized = false;
    
    get initialized() {
        return this.#initialized;
    }

    constructor(core: CoreContext) {
        this._initialize(core);
    }


    private _initialize(core: CoreContext) {
        const player = new Player(core.scene);
        const controller = new PlayerController(player, core);

        this.controller = controller;
        this.player = player;

        if(socketManager.online) {
            broadcastPlayer(player);
        }

        core.animateManager.add((delta) => {
            controller.update(delta);
            core.renderer.render(core.scene, this.player!.camera);
        })
    }
}