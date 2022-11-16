import '../styles/globals.css';
import { unstable_getServerSession } from 'next-auth/next';

import Header from '@/components/Header';

interface Props {
  children: React.ReactNode
};

const RootLayout = async ({ children }: Props) => {
  const session = await unstable_getServerSession();

  return (
    <html>
      <head />

      <body className="bg-gray-100 scrollbar-hide">
        <div className="max-w-2xl xl:max-w-4xl mx-auto">
          <Header session={session} />

          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;