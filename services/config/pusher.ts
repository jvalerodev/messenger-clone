import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
  appId: process.env.SERVER_PUSHER_APP_ID!,
  key: process.env.SERVER_PUSHER_KEY!,
  secret: process.env.SERVER_PUSHER_SECRET!,
  cluster: process.env.SERVER_PUSHER_CLUSTER!,
  useTLS: true
});

export const clientPusher = new ClientPusher(process.env.NEXT_PUBLIC_CLIENT_PUSHER_ID!, {
  cluster: process.env.NEXT_PUBLIC_CLIENT_PUSHER_CLUSTER,
  forceTLS: true
});