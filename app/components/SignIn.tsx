'use client';

import { getProviders, signIn } from 'next-auth/react';

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

const SignIn = ({ providers }: Props) => {
  return (
    <div className="flex justify-center">
      {Object.values(providers!).map(provider => (
        <div key={provider.name}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => signIn(provider.id, {
              callbackUrl: process.env.NEXT_PUBLIC_VERCER_URL
            })}>
            Sign in with: {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignIn;