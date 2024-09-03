'use client'
import SideNavbar from '@/components/SideNavbar'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation' // Note: Use next/navigation instead of next/router in the latest Next.js versions
import React, { useEffect } from 'react'

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {

    const { user } = useUser();
    const router = useRouter();

    const checkUserBudgets = async () => {
        if (user?.primaryEmailAddress?.emailAddress) {
            const result = await db.select()
                .from(Budgets)
                .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));

            if (result?.length === 0) {
                router.replace('/dashboard/budget');
            }

            // console.log(result);
        }
    };

    useEffect(() => {
        if (user) {
            checkUserBudgets();
        }
    }, [user]);

    return (
        <div className='h-screen overflow-auto'>
            <div className='fixed md:w-64 hidden md:block shadow-md shadow-black'>
                <SideNavbar />
            </div>
            <div className='md:ml-64'>
                {children}
            </div>
        </div>
    );
}

export default Dashboardlayout;
