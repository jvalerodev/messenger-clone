'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 font-bold rounded transition duration-200"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;