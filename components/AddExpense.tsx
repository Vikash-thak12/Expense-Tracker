import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { toast } from 'sonner';

const AddExpense = ({ budgetId, refreshData }: {budgetId: number, refreshData: () => void}) => {

    const [name, setName] = useState<string>(''); // Initialized as an empty string
    const [amount, setAmount] = useState<number>(0); // Initialized as 0

    const createNewExpense = async () => {
        try {
            const result = await db.insert(Expenses).values({
                name: name,
                amount: amount,
                budgetId: budgetId,
                createdAt: new Date().toISOString(),
            }).returning({ insertedId: Budgets.id })

            if (result) {
                refreshData(); // Update the list of expenses after creating a new expense.
                toast("Expense created successfully")

                // Clear input fields after successful creation
                setName('');
                setAmount(0);
            }
        } catch (error) {
            console.error('Error creating expense:', error);
            toast.error("Failed to create expense");
        }
    }


    return (
        <div className='border rounded-lg p-5 bg-white'>
            <h2 className='font-bold text-2xl'>Add Expense</h2>
            <div>
                <div className='mt-1'>
                    <h2 className='font-bold text-xl text-black py-2'>Enter Budget Name</h2>
                    <Input placeholder='Ex. Shopping' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mt-5'>
                    <h2 className='font-bold text-xl text-black py-2'>Enter Budget</h2>
                    <Input placeholder='Ex. 5000' type='number' onChange={(e) => setAmount(Number(e.target.value))} />
                </div>
                <Button onClick={() => createNewExpense()} disabled={!(name&&amount)} className='mt-5 w-full'>Create Expense</Button>
            </div>
        </div>
    )
}

export default AddExpense