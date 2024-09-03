'use client'
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';
import { Skeleton } from "@/components/ui/skeleton"



interface BudgetItemProps {
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
    const [budgetList, setBudgetList] = useState<BudgetItemProps[]>([])

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
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id));

        // console.log("Well the budget: ", result);
        setBudgetList(result)
    };

    useEffect(() => {
        getBudgetList();
    }, [user]);

    return (
        <div className='mt-7 overflow-hidden'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <CreateBudget refreshData={() => getBudgetList()} />

                {
                    budgetList.length > 0 ?
                        budgetList.map((budget, index) => (
                            <BudgetItem budget={budget} key={index} />
                        ))
                        : 
                            [1, 2, 3, 4, 5].map((budget, index) => (
                                // <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>

                                // </div>
                                <Skeleton key={index} className="w-full bg-slate-200 h-[150px] rounded-lg" />

                            )
                            )
                }
            </div>
        </div>
    );
};

export default BudgetList;
