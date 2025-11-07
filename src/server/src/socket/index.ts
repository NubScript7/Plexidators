import { PlexidatorsSocketServer } from "..";
import * as THREE from "three"

const players: Set<string> = new Set();

export function socketIO(io: PlexidatorsSocketServer) {
    
    io.on("connection", (socket) => {
        players.add(socket.id);
        
        console.log(`new user: ${socket.id}`);

        io.to(socket.id).emit("players", Array.from(players.values()))
        socket.broadcast.emit("user-connected", socket.id);

        socket.on("player-position", (packet: Int16Array) => {
            socket.broadcast.volatile.emit("player-move", socket.id, packet);
        })

        socket.on("p2pfast", (packet: Int8Array) => {
            socket.broadcast.volatile.emit("player-move", socket.id, packet);
        })

        socket.on("disconnect", () => {
            socket.broadcast.emit("user-disconnected", socket.id);
            players.delete(socket.id);
        })
    })
}