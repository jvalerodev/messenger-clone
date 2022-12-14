import Image from 'next/image';
import { Message } from '@/types/typings';
import { useSession } from 'next-auth/react';
import TimeAgo from 'react-timeago';

interface Props {
  msg: Message;
};

const Message = ({ msg }: Props) => {
  const { username, email, message, profilePic, created_at } = msg;
  const { data: session } = useSession();
  const isUser = session?.user?.email === email;

  return (
    <div className={`flex w-fit items-center ${isUser && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          src={profilePic}
          alt="Profile pic"
          height={10}
          width={50}
          className="rounded-full mx-2"
        />
      </div>

      <div>
        <p className={`text-[0.65rem] px-[2px] pb-[2px] ${isUser ? 'text-blue-400 text-right' : 'text-red-400 text-left'}`}>
          {username}
        </p>

        <div className="flex items-end">
          <div className={`px-3 py-2 rounded-lg w-fit text-white ${isUser ? 'bg-blue-400 ml-auto order-2' : 'bg-red-400'}`}>
            <p>{message}</p>
          </div>

          <p className={`text-[0.65rem] italic px-2 text-gray-400 ${isUser && 'text-right'}`}>
            <TimeAgo date={new Date(created_at)} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;