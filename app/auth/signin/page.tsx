import Image from 'next/image';
import { getProviders } from 'next-auth/react';
import SignIn from '@/components/SignIn';

const SignInPage = async () => {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div>
        <Image
          src="/messenger.png"
          alt="Profile pic"
          width={300}
          height={300}
          className="rounded-full mx-2 object-cover"
        />
      </div>

      <SignIn providers={providers} />
    </div>
  );
};

export default SignInPage;