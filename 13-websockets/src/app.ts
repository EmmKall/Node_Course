import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function connection(ws){

    console.log('Client connected');

    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary){
        console.log('Client:', data);
        //Everyone
        // wss.clients.forEach((client) => {
        //     if(client !== ws && client.readyState === WebSocket.OPEN){
        //         client.send(data.toString().toUpperCase(), { binary: isBinary });
        //     }
        // });
        //Everyone except sender
        wss.clients.forEach((client) => {
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data.toString(), { binary: isBinary });
            }
        });
        //Sender

        ws.send(data.toString().toUpperCase(), { binary: isBinary });
    });

    ws.send('Hello from server!!!');

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    //ws.close();
});
