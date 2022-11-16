import Image from 'next/image';
import Link from 'next/link';
import { unstable_getServerSession } from 'next-auth/next';

import LogoutButton from './LogoutButton';

interface Props {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

const Header = ({ session }: Props) => {
  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center py-10 shadow-sm px-5">
        <div className="flex space-x-2">
          <Image
            src={session.user?.image!}
            alt="Profile picture"
            height={10}
            width={50}
            className="rounded-full object-contain w-auto"
            priority
          />

          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>

        <LogoutButton />
      </header>
    );
  }

  return (
    <header className="bg-white flex justify-center items-center py-10 shadow-sm mt-48 w-3/4 md:w-1/2 mx-auto rounded">
      <div>
        <div className="flex flex-col items-center space-y-5">
          <div className="flex space-x-2 items-center">
            <Image
              src="/meta.png"
              alt="Logo"
              height={20}
              width={70}
            />

            <p className="text-blue-400">Welcome to Meta Messenger</p>
          </div>

          <Link href="/auth/signin" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 font-bold rounded transition duration-200">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;