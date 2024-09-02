import SideNavbar from '@/components/SideNavbar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='flex'>
                <SideNavbar />
                {children}
            </div>
        </>
    )
}

export default layout