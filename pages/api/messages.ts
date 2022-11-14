import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '@/services/config/redis';

import { Message } from '@/types/typings';

type GETData = {
  messages: Message[]
};

type POSTData = {
  message: Message
};

type ErrorData = {
  body: string
};

const handler = async (req: NextApiRequest, res: NextApiResponse<GETData | POSTData | ErrorData>) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const messagesgRes = await redis.hvals('messages');
        const messages: Message[] = messagesgRes.map(message => JSON.parse(message));
        messages.sort((a, b) => b.created_at - a.created_at);


        res.status(200).json({ messages });
        return;
      } catch (error) {
        console.log(error);
      }

      return res.status(504).json({ body: 'The request could not be processed.' });

    case 'POST':
      const { message }: { message: Message } = req.body;
      message.created_at = Date.now();

      try {
        await redis.hset('messages', message.id, JSON.stringify(message));
        return res.status(200).json({ message });
      } catch (error) {
        console.log(error);
      }

      return res.status(504).json({ body: 'The request could not be processed.' });

    default:
      res.status(500).json({ body: 'Invalid request type.' });
  }
};

export default handler;