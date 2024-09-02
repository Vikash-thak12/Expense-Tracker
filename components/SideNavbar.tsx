'use client'
import React from 'react'
import { navItems } from '../lib/data'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideNavbar = () => {
    const path = usePathname();
    const { user } = useUser()
    const formattedName = `${user?.firstName
        ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
        : ''} 
    ${user?.lastName
            ? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()
            : ''}`;


    return (
        <div className='h-screen w-64 px-5'>
            <Link href="/">
                <div className='flex items-center text-white mt-5 shadow-md shadow-gray-400 rounded-md'>
                    <Image
                        src="/assets/logo.svg"
                        alt='logo'
                        width={150}
                        height={100}
                        className='p-3 mt-2 mx-auto'
                    />
                    <span>Expense Tracker</span>
                </div>
            </Link>
            <div className='mt-10'>
                {
                    navItems.map((item, index) => (
                        <Link href={item.path} key={index}>
                            <h2 className={`w-full flex gap-3 items-center justify-start text-xl px-5 py-3 mb-10 rounded-md cursor-pointer hover:text-blue-200 hover-gradient-bg ${path === item.path && "bg-blue-500 text-white"}`}>
                                {<item.icon />}
                                {item.name}
                            </h2>
                        </Link>
                    ))
                }
            </div>
            <div className='fixed bottom-20 left-10 flex items-center justify-center gap-3 scale-125 cursor-pointer'>
                <UserButton />
                <span>{formattedName}</span>

            </div>
        </div>
    )
}

export default SideNavbar