import type { MultiplayerManagerType } from "../../managers/multiplayer/MultiplayerManager";
import type { PlexidatorsSocketServer } from "../../managers/multiplayer/SocketManager";
import { decodePacket } from "../../utils/formatter/dataFormatter";

export function socketIO(socket: PlexidatorsSocketServer, multiplayerManager: MultiplayerManagerType) {
    socket.on("user-connected", (userId: string) => {
        console.log(`new user connected: ${userId}`)
        multiplayerManager.createRemotePlayer(userId);
    })

    socket.on("player-move", (userId: string, packet: ArrayBuffer) => {
        const player = multiplayerManager.players.get(userId);

        if(player) {
            const data = new Int16Array(packet);
            const { pos, rot } = decodePacket(data);

            // console.log(rot)

            player.moveToPosition(pos, rot);
        }
    })

    socket.on("players", (userIds: string[]) => {
        for(const id of userIds) {
            if(socket.id !== id) {
                multiplayerManager.createRemotePlayer(id);
            }
        }
    })

    socket.on("user-disconnected", (userId: string) => {
        multiplayerManager.disconnectPlayer(userId);
    })
}