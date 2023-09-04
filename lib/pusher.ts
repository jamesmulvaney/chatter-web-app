import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_SERVER_APP_ID!,
  key: process.env.PUSHER_SERVER_KEY!,
  secret: process.env.PUSHER_SERVER_SECRET!,
  cluster: process.env.PUSHER_SERVER_CLUSTER!,
  useTLS: true,
});

export const pusherClient = new ClientPusher("a4255a96a75c64444234", {
  cluster: "eu",
  forceTLS: true,
});
