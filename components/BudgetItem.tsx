import React from 'react'
interface BudgetItem {
    id: number;
    name: string;
    amount: number;
    createdBy: string;
    icon: string | null;
    totalSpend: number;
    totalItem: number;
}

const BudgetItem = ({ budget }: { budget: BudgetItem }) => {
    return (
        <div className='border p-3 rounded-lg cursor-pointer bg-gray-50'>
            <div className='flex gap-4 items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <h1 className='border text-3xl p-3 rounded-full'>{budget.icon}</h1>
                    <div>
                        <h2 className='line-clamp-1'>{budget.name}</h2>
                        <h2>{budget.totalItem} {budget.totalItem > 1 ? "Items" : "Item"}</h2>
                    </div>
                </div>
                <h2>${budget.amount}</h2>
            </div>
            <div className='mt-5'>
                <div className='flex justify-between items-center py-3'>
                    <h1>$ {budget.totalSpend?budget.totalSpend:0} Spent</h1>
                    <h1>$ {budget.amount-budget.totalItem} Remaining</h1>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div className='w-[60%] bg-blue-600 h-2 rounded-full'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetItem