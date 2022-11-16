import { useState, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr';
import { unstable_getServerSession } from 'next-auth/next';

import { Message } from '@/types/typings';
import { MessagesService } from '@/services/index';
import { clientPusher } from '@/services/config/pusher';

type Session = Awaited<ReturnType<typeof unstable_getServerSession>>;

const useMessages = () => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, session: Session) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;
    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!
    };

    const sendMessage = async () => {
      const messageData = await MessagesService.uploadMessageToUptash(message);
      return [...messages!, messageData];
    };

    setInput('');

    await mutate(sendMessage, {
      optimisticData: [...messages!, message],
      rollbackOnError: true
    });
  };

  const getMessages = async () => {
    return await MessagesService.getMessages();
  };

  const updateMessages = () => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', (data: Message) => {
      // If you sent the message, no need update cache
      if (messages?.find(message => message.id === data.id))
        return;

      if (messages) {
        mutate(getMessages, {
          optimisticData: [...messages!, data],
          rollbackOnError: true
        });
      }
      else {
        mutate(getMessages);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  };

  const { data: messages, error, mutate } = useSWR('/api/messages', getMessages);

  return { input, setInput, handleSubmit, getMessages, updateMessages };
};

export default useMessages;