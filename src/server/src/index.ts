import express from "express";
import type { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "../types/socketServer";
import { socketIO } from "./socket";
import cors from "cors"

export type PlexidatorsSocketServer = Server<ClientToServerEvents, ServerToClientEvents>;

const app = express();
const server = createServer(app);

const io: PlexidatorsSocketServer = new Server(server, {
    cors: {
        origin: "*"
    }
});

socketIO(io);

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/status", (req: Request, res: Response) => {
    res.json({
        online: true
    })
})

server.listen(3948, () => {
    console.log("plexidators multiplayer server online on port 3948");
})