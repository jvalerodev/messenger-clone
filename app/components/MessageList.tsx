'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import { Message } from '@/types/typings';
import MessageComponent from './Message';
import { useMessages } from '@/hooks/index';
import { clientPusher } from '@/services/config/pusher';

interface Props {
  initialMessages: Message[];
}

const MessageList = ({ initialMessages }: Props) => {
  const { getMessages, updateMessages } = useMessages();
  const { data: messages, error, mutate } = useSWR('/api/messages', getMessages);

  useEffect(() => {
    updateMessages();
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 pt-8 pb-10 mx-auto bg-white px-5">
      {(messages || initialMessages).map(message => (
        <MessageComponent key={message.id} msg={message} />
      ))}
    </div>
  );
};

export default MessageList;