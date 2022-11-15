import axios from 'axios';
import { Message } from '@/types/typings';

export const getMessages = async (): Promise<Message[]> => {
  try {
    const { data } = await axios(`${process.env.VERCER_URL}/api/messages`);
    const messages: Message[] = data.messages;
    return messages;
  } catch (error) {
    throw (error);
  }
};