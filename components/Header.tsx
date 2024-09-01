import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  const clerkUser = auth()
  const { userId } = clerkUser;
  console.log("The clerk user is :", userId);

  return (
    <main className='p-5 lg:w-[35%] w-[90%] mx-auto mt-10 rounded-full bg-gray-400'>
      <div className='flex items-center justify-between lg:px-10'>
        <Image
          src='./assets/logo.svg'
          alt='logo'
          width={70}
          height={25}
          className='cursor-pointer'
        />
        {/* <div className='flex items-center justify-center gap-3'>
        </div> */}
        <Link href="/dashboard" className='px-3 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-700'>
          <span className='text-sm font-bold'>Dashboard</span>
        </Link>
        <Link href="/profile" className='py-3 px-5 rounded-full bg-gray-900 text-white hover:bg-gray-700'>
          <span className='text-sm font-bold'>Profile</span>
        </Link>
        {
          userId !== null ? (
            <div className='flex items-center justify-center transform scale-150'>
              <UserButton />
              {/* <h1>hey</h1> */}
            </div>
          ) : (
            <Link href="/sign-in" className='py-3 px-5 rounded-full bg-gray-900 text-white hover:bg-gray-700'>
            <span className='text-sm font-bold'>Sign-In</span>
          </Link>
          )
        }
      </div>
    </main>
  );
};

export default Header;
