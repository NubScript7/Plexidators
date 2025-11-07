import io, { Socket } from "socket.io-client"
import type { MultiplayerManagerType } from "./MultiplayerManager";
import type { ClientToServerEvents, ServerToClientEvents } from "../../types/socketServer";
import { socketIO } from "../../services/socket/socket";

const { hostname, protocol } = window.location;
export const serverPort = 3948
export const url = `${protocol}//${hostname}:${serverPort}`;

export type PlexidatorsSocketServer = Socket<ServerToClientEvents, ClientToServerEvents>;

export async function checkStatus() {
    
    try {
        const status = await fetch(`${url}/status`);
        const json = await status.json();
    
        if(json && json.online === true) {
            return true
        }
    } catch {};

    return false
}

export class SocketManager {
    #is_init: boolean
    #is_online: boolean
    socket?: PlexidatorsSocketServer

    constructor() {
        this.#is_init = false;
        this.#is_online = false;
    }
    
    get initialized() {
        return this.#is_init;
    }
    
    get online() {
        return this.#is_online;
    }

    async getStatus() {
        if(this.#is_online) {
            return this.#is_online;
        }

        const status = await checkStatus();

        this.#is_online = status;

        return status;
    }
    
    async init(multiplayerManager: MultiplayerManagerType) {
        const isOnline = await this.getStatus();
        
        if(isOnline) {
            this.socket = io(url);
            this.setupSocket(this.socket, multiplayerManager);
        } else {
            console.warn("multiplayer server is offline!");
        }
    }

    setupSocket(socket: PlexidatorsSocketServer, multiplayerManager: MultiplayerManagerType) {
        socketIO(socket, multiplayerManager);
    }
}

export const socketManager = new SocketManager();