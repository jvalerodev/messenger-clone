import { useState, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr';

import { Message } from '@/types/typings';
import { MessagesService } from '@/services/index';

const useMessages = () => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;
    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: 'Jesus Valero',
      profilePic: 'https://scontent.fmrd1-1.fna.fbcdn.net/v/t31.18172-1/21743434_497428813953717_2174851471748211531_o.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=HkIu5uyOTpkAX-Tr2zz&_nc_ht=scontent.fmrd1-1.fna&oh=00_AfC6V1IY2w0qo_zcLjvkVniSnl3Uyllt5vWoVMrH9azlhg&oe=6397D150',
      email: 'yisusvalerog.175@gmail.com'
    };

    const sendMessage = async () => {
      const messageData = await MessagesService.uploadMessageToUptash(message);
      return [messageData, ...messages!];
    }

    setInput('');

    await mutate(sendMessage, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true
    });
  };

  const getMessages = async () => {
    return await MessagesService.getMessages();
  };

  const { data: messages, error, mutate } = useSWR('/api/messages', getMessages);

  return { input, setInput, handleSubmit, getMessages };
};

export default useMessages;