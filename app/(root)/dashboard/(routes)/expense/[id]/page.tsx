'use client'
import AddExpense from '@/components/AddExpense';
import BudgetItem from '@/components/BudgetItem';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'

interface BudgetItemProps {
    id: number;
    name: string;
    amount: number;
    createdBy: string;
    icon: string | null;
    totalSpend: number;
    totalItem: number;
}

interface Params {
    id: number; // assuming `id` is a number
}

const ExpenseComponent = ({ params }: { params: Params }) => {

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState<BudgetItemProps | null>(null); // Start with null

    const getBudgetInfo = async () => {
        const email = user?.primaryEmailAddress?.emailAddress;

        if (!email) {
            console.error('User email is undefined');
            return;
        }

        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(and(
                eq(Budgets.createdBy, email),
                eq(Budgets.id, params.id)
            ))
            .groupBy(Budgets.id)

        if (result.length > 0) {
            setBudgetInfo(result[0] as BudgetItemProps); // Ensure result[0] matches the type
        }
    };

    useEffect(() => {
        if (user) {
            getBudgetInfo();
        }
    }, [params, user]);

    return (
        <div className='border p-10'>
            <h1 className='font-bold text-3xl'>My Expenses</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>
                {budgetInfo ? <BudgetItem budget={budgetInfo} /> : 
                <Skeleton className="w-full bg-slate-200 h-[150px] rounded-lg" />
                }
                <AddExpense budgetId={params.id} refreshData={() => getBudgetInfo()} />
            </div>
        </div>
    )
}

export default ExpenseComponent;
