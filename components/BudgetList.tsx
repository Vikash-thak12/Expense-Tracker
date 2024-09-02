'use client'
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from '@/utils/dbConfig';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';


interface BudgetItem {
    id: number;
    name: string;
    amount: number;
    createdBy: string;
    icon: string | null;
    totalSpend: number;
    totalItem: number;
}


const BudgetList = () => {
    const { user } = useUser();
    const [budgetList, setBudgetList] = useState<BudgetItem[]>([])

    const getBudgetList = async () => {
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
            .where(eq(Budgets.createdBy, email)) // Use the email here
            .groupBy(Budgets.id);

        console.log(result);
        setBudgetList(result)
    };

    useEffect(() => {
        getBudgetList();
    }, [user]);

    return (
        <div className='mt-7 overflow-hidden'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <CreateBudget />
                {
                    budgetList.map((budget, index) => (
                        <BudgetItem budget={budget} key={index} />
                    ))
                }
            </div>
        </div>
    );
};

export default BudgetList;
