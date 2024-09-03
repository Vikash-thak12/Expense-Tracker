import Link from 'next/link';
import React from 'react'
interface BudgetItemProps {
    id: number;
    name: string;
    amount: number;
    createdBy: string;
    icon: string | null;
    totalSpend: number;
    totalItem: number;
}

const BudgetItem = ({ budget }: { budget: BudgetItemProps }) => {

    const calculateProgressPercentage = () => {
        const percent = (budget.totalSpend / budget.amount) * 100;
        return percent.toFixed(2);
    }


    return (
        <Link href={`/dashboard/expense/${budget?.id}`} >
            <div className='border p-3 rounded-lg cursor-pointer bg-gray-50 lg:h-[170px]'>

            <div className='flex gap-4 items-center justify-between rounded-md p-2 shadow-md shadow-black'>
                <div className='flex gap-4 items-center'>
                    <h1 className='border text-3xl p-3 rounded-full'>{budget.icon}</h1>
                    <div>
                        <h2 className='line-clamp-1'>{budget.name}</h2>
                        <h2>{budget.totalItem} {budget.totalItem > 1 ? "Items" : "Item"}</h2>
                    </div>
                </div>
                <h2>${budget.amount}</h2>
            </div>
            <div className='mt-2'>
                <div className='flex justify-between items-center py-3'>
                    <div className='flex flex-col lg:flex-row lg:gap-1'>
                        <h1 className='text-gray-500'>$ {budget.totalSpend ? budget.totalSpend : 0}</h1>
                        <span>Spent</span>
                    </div>
                    <div className='flex flex-col lg:flex-row lg:gap-1'>
                        <h1 className='text-gray-500'>$ {budget.amount - budget.totalSpend} </h1>
                        <span>Remaining</span>
                    </div>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div
                        className={`bg-blue-600 h-2 rounded-full`}
                        style={{
                            width: `${calculateProgressPercentage()}%`,
                            backgroundColor: 'blue',
                            transition: 'width 1s ease-in-out'
                        }}
                        >

                    </div>
                </div>
            </div>
                            
            </div>
        </Link>
    )
}

export default BudgetItem