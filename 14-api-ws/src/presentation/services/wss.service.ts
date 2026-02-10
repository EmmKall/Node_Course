import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { TicketI } from '../../interfaces/ticketI';

interface OptionsI {
    server: Server;
    path?: string;
}

export class WssService {

    private static _instance: WssService;
    private wss: WebSocketServer;

    private constructor(options: OptionsI) {
        const { server, path = '/ws' } = options;
        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    static initWss(options: OptionsI) {
        WssService._instance = new WssService(options);
    }

    public static get instance(): WssService {
        if (!WssService._instance) {
            throw new Error('WssService is not initialized');
        }
        return WssService._instance;
    }

    public broadcastMessage(type: string, payload: Object) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type, payload }));
            }
        });
    }

    public start() {
        this.wss.on('connection', (ws: WebSocket) => {
            console.log('Client connected');

            ws.on('message', (message) => {
                console.log(`Received message => ${message}`);
            });

            ws.on('close', () => { console.log('Client disconnected'); });
        });
    }

}
