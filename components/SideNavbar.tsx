'use client'
import React from 'react'
import { navItems } from '../lib/data'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideNavbar = () => {
    const path = usePathname();

    return (
        <div className='h-screen w-64 px-5'>
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
                        <Link href={item.path} key={index}>
                            <h2 className={`w-full flex gap-3 items-center justify-start text-2xl px-5 py-5 mb-2 rounded-md cursor-pointer hover:text-blue-200 hover:bg-blue-600 ${path === item.path && "bg-blue-500 text-white"}`}>
                                {<item.icon />}
                                {item.name}
                            </h2>
                        </Link>
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