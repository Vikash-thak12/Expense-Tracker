import Image from 'next/image';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  const { userId } = auth();

  return (
    <header className='lg:hidden sticky top-0 left-0 right-0 mx-auto border-2 border-black px-4 py-2 lg:py-4 lg:w-[35%] w-[90%] mt-4 mb-2 rounded-full bg-gray-400 z-50'>
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
        <nav className='flex items-center space-x-3 lg:space-x-5'>
          <Link href="/dashboard" className='py-3 px-3 lg:px-5 rounded-full bg-gray-900 text-white hover:bg-gray-700'>
            <span className='text-sm font-bold'>Dashboard</span>
          </Link>
          <Link href="/dashboard/budget" className='py-3 px-3 lg:px-5 rounded-full bg-gray-900 text-white hover:bg-gray-700'>
            <span className='text-sm font-bold'>Budget</span>
          </Link>
        </nav>
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
    </header>
  );
};

export default Header;
