'use client'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import React, { useState, useEffect } from 'react'

interface BudgetItemProps {
    id: number;
    name: string;
    amount: number;
    createdBy: string;
    icon: string | null;
    totalSpend: number;
    totalItem: number;
}

const BarChartDashboard = ({ budgetList }: { budgetList: BudgetItemProps[] }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640); // 'sm' breakpoint in Tailwind CSS
        };

        handleResize(); // Check screen size on initial load
        window.addEventListener('resize', handleResize); // Add event listener for resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup on unmount
        };
    }, []);

    return (
        <div className='border border-black rounded-lg p-2 bg-white'>
            <h1 className='font-bold text-center mb-3 text-2xl'>Budget Visualization</h1>
            <div className="w-full">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={budgetList}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        {!isSmallScreen && (
                            <XAxis 
                                dataKey="name"
                                tick={{ fontSize: 12 }} // Adjust font size for better fitting
                                interval={0} // Show all labels
                                className='text-green'
                            />
                        )}
                        <YAxis />
                        {/* <Tooltip /> */}
                        <Legend />
                        <Bar dataKey="totalSpend" name='Total Spent' stackId="a" fill="green" />
                        <Bar dataKey="amount" name='Total Amount' stackId="a" fill="gray" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarChartDashboard
