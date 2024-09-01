import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <main className='px-5 py-5 max-w-[90%] sm:max-w-[60%] mx-auto mt-10 rounded-full bg-gray-400'>
      <div className='flex items-center justify-between px-5 sm:px-10'>
        <Image
          src='./assets/logo.svg'
          alt='logo'
          width={70}
          height={25}
          className='cursor-pointer'
        />
        <Button className='text-xl'>Sign In</Button>
      </div>
    </main>
  );
};

export default Header;
