'use client';

import { SessionProvider } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';

interface Props {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
  children: React.ReactNode;
};

const Providers = ({ session, children }: Props) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Providers;