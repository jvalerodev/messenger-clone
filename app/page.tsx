import { unstable_getServerSession } from 'next-auth/next';

import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import { getMessages } from '@/utils/fetchData';

import Providers from './providers';

const Home = async () => {
  const session = await unstable_getServerSession();

  if (!session) return null;

  const messages = await getMessages();

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />

        <ChatInput session={session} />
      </main>
    </Providers>
  );
};

export default Home;