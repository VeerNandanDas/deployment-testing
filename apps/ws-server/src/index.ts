import { WebSocketServer } from 'ws';
import { prismaClient } from '@repo/database';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket server');
  
  ws.on('message', async (message) => {
    console.log('received: %s', message);
    try {
      const users = await prismaClient.user.findMany();
      ws.send(JSON.stringify(users));
    } catch (error) {
      console.error(error);
      ws.send('Error fetching users');
    }
  });

  ws.send('Connected to WebSocket Server');
});

console.log('WebSocket Server running on port 8080');
