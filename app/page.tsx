import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import { getMessages } from '@/utils/fetchData';

const Home = async () => {
  const messages = await getMessages();

  return (
    <main>
      <MessageList initialMessages={messages} />

      <ChatInput />
    </main>
  )
};

export default Home;