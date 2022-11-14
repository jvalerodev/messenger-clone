import axios from 'axios';

import { Message } from '@/types/typings';

const MessagesService = {
  uploadMessageToUptash: async (message: Message): Promise<Message> => {
    try {
      const res = await axios.post('/api/messages', { message });
      const messageSent: Message = res.data;
      return messageSent;
    } catch (error) {
      throw (error);
    }
  },

  getMessages: async (): Promise<Message[]> => {
    try {
      const { data } = await axios('/api/messages');
      const messages: Message[] = data.messages;
      return messages;
    } catch (error) {
      throw (error);
    }
  }
};

export default MessagesService;