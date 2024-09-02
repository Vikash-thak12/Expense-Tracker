import SideNavbar from '@/components/SideNavbar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div>
                <div className='fixed md:w-64 hidden md:block shadow-md shadow-black'>
                    <SideNavbar />
                </div>
                <div className='md:ml-64'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default layout