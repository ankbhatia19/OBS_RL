import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:4455');

ws.on('error', console.error);

ws.on('open', function open() {
    ws.send('something');
});

ws.on('listening', function listening() {
    console.log('listening');
});

ws.on('message', function message(data) {
    console.log('received: %s', data);
});
