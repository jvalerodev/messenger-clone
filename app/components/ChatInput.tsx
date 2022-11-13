'use client';

import { useState, FormEvent } from 'react';
import { Message } from 'typigs';
import { v4 as uuid } from 'uuid';

const ChatInput = () => {
  const [input, setInput] = useState('');

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
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

    setInput('');
  };

  return (
    <form onSubmit={sendMessage} className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100">
      <input
        type="text"
        placeholder="Enter a message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;