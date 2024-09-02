import React from 'react'
import { navItems } from '../lib/data'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

const SideNavbar = () => {
    const {userId} = auth()
    console.log("The userId:", userId);

    return (
        <div className='h-screen w-64 shadow-md shadow-black px-5'>
            <Link href="/">
                <Image
                    src="/assets/logo.svg"
                    alt='logo'
                    width={150}
                    height={100}
                    className='p-5 mt-5 mx-auto'
                />
            </Link>
            <div className='mt-5'>
                {
                    navItems.map((item, index) => (
                        <h2 key={index} className='w-full flex gap-3 items-center justify-start text-2xl px-5 py-5 mb-2 rounded-md cursor-pointer hover:text-blue-200 hover:bg-blue-600'>
                            {<item.icon />}
                            {item.name}
                        </h2>
                    ))
                }
            </div>
            <div className='flex items-center justify-start gap-2 px-5 mt-48'>
               <div className='transform scale-150'>
                <UserButton showName />
               </div>
            </div>
        </div>
    )
}

export default SideNavbar