import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

interface ExpenseProps {
    id: number;
    name: string;
    amount: number;
    createdAt: string;
    budgetId: number;
}

const ExpenseList = ({ expenseList, refreshData }: { expenseList: ExpenseProps[], refreshData: () => void }) => {

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);

        // Extract year, month, day, hours, minutes, and seconds
        const year = date.getFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // Determine ordinal suffix for day
        const getOrdinalSuffix = (day: number) => {
            if (day > 3 && day < 21) return 'th'; // for 4th - 20th
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

        // Format the date and time
        return `${dayWithSuffix} ${month}, ${year} | ${hours}:${minutes}:${seconds}`;
    };

    const deleteExpense = async (expenseId: number) => {
        try {
            await db.delete(Expenses).where(eq(Expenses.id, expenseId));
            refreshData();
            toast("Expense deleted successfully");
            // Optionally, refresh the expense list or handle UI updates here
        } catch (error) {
            console.error('Error deleting expense:', error);
            toast.error("Error deleting expense");
        }
    }

    return (
        <div className='mt-4 lg:px-10'>
            <div className='grid grid-cols-4 bg-slate-200 p-2 border-b-2 border-black mb-2'>
                <h2 className='font-bold lg:text-xl text-sm'>Name</h2>
                <h2 className='font-bold lg:text-xl text-sm'>Amount</h2>
                <h2 className='font-bold lg:text-xl text-sm'>Created</h2>
                <h2 className='font-bold lg:text-xl text-sm'>Action</h2>
            </div>
            {
                expenseList.map((expense) => (
                    <div key={expense.id} className='grid grid-cols-4  bg-slate-200 p-2 border-2 border-gray-400 mb-2 rounded-md cursor-pointer hover:scale-105 transition-all'>
                        <h2 className='text-sm'>{expense.name}</h2>
                        <h2 className='text-sm'>Rs. {expense.amount}</h2>
                        <h2 className='text-sm line-clamp-1'>{formatDateTime(expense.createdAt)}</h2>
                        <Trash className='text-red-900' onClick={() => deleteExpense(expense.id)} />
                        <h2>
                        </h2>
                    </div>
                ))}
        </div>
    )
}

export default ExpenseList