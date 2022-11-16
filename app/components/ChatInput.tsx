'use client';

import { unstable_getServerSession } from 'next-auth/next';

import { useMessages } from '@/hooks/index';

interface Props {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

const ChatInput = ({ session }: Props) => {
  const { input, setInput, handleSubmit } = useMessages();

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-0 z-50 flex p-5 space-x-2 border-t border-gray-200 bg-white">
      <input
        type="text"
        placeholder="Enter a message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        value={input}
        disabled={!session}
        onChange={e => setInput(e.target.value)}
      />

      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
      >
        Send
      </button >
    </form >
  );
};

export default ChatInput;