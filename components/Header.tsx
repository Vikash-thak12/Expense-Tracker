import Image from 'next/image';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  const { userId } = auth();

  return (
    <main className='px-4 py-2 lg:py-4   lg:w-[35%] w-[95%] mx-auto mt-10 rounded-full bg-gray-400'>
      <div className='flex items-center justify-between lg:px-10'>
        <Link href="/">
          <Image
            src='./assets/logo.svg'
            alt='logo'
            width={70}
            height={25}
            className='cursor-pointer'
          />
        </Link>
        <Link href="/dashboard" className='px-3 lg:px-5 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-700'>
          <span className='text-sm font-bold'>Dashboard</span>
        </Link>
        <Link href="/profile" className='py-3 px-3 lg:px-5 rounded-full bg-gray-900 text-white hover:bg-gray-700'>
          <span className='text-sm font-bold'>Profile</span>
        </Link>
        {
          userId !== null ? (
            <div className='flex items-center justify-center transform scale-150'>
              <UserButton />
            </div>
          ) : (
            <Link href="/sign-in" className='py-3 px-3 lg:px-5 rounded-full bg-gray-900 text-white hover:bg-gray-700'>
              <span className='text-sm font-bold'>Login</span>
            </Link>
          )
        }
      </div>
    </main>
  );
};

export default Header;
