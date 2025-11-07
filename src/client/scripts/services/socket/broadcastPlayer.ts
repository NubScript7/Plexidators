import type { Player } from "../../components/player/Player";
import { playerConfig } from "../../config/players";
import { socketConfig } from "../../config/socket";
import { socketManager } from "../../managers/multiplayer/SocketManager";
import { requestInterval } from "../../utils/requestInterval";
import { encodePacket } from "../../utils/formatter/dataFormatter";

export function broadcastPlayer(player: Player) {
    if(!socketManager.socket) {
        throw new Error("Socket is not initialized.");
    }

    const rotationThreshold = playerConfig.rotationChangeThreshold;
    const positionThreshold = playerConfig.positionChangeThreshold;

    requestInterval(() => {
        const pos = player.mesh.position;
        const quat = player.camera.quaternion;
        const rot = player.camera.rotation;

        if(pos.distanceTo(player.lastPos) > positionThreshold || 1 - quat.dot(player.lastRot) > rotationThreshold) {

            socketManager.socket?.volatile.emit("player-position", encodePacket(pos, rot));
            
            player.lastPos.copy(pos);
            player.lastRot.copy(quat);

        }
    }, socketConfig.multiplayerPacketUpdateMs);
}