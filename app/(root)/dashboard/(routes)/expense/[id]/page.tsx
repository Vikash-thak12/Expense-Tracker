'use client'
import AddExpense from '@/components/AddExpense';
import BudgetItem from '@/components/BudgetItem';
import ExpenseList from '@/components/ExpenseList';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { PenBox, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import UpdateBudget from '@/components/UpdateBudget';




interface BudgetItemProps {
    id: number;
    name: string;
    amount: number;
    createdBy: string;
    icon: string | null;
    totalSpend: number;
    totalItem: number;
}

interface ExpenseProps {
    id: number;
    name: string;
    amount: number;
    createdAt: string;
    budgetId: number;
}

interface Params {
    id: number; // assuming `id` is a number
}

const ExpenseComponent = ({ params }: { params: Params }) => {

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState<BudgetItemProps | null>(null); // Start with null
    const [expenseList, setExpenseList] = useState<ExpenseProps[]>([])   // Start with null
    const router = useRouter()

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
        getExpensesList(); // Fetch expenses data as well when component mounts or when params change
    };

    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id))
        console.log(result);
        setExpenseList(result as ExpenseProps[]);
    }

    const deleteBudget = async () => {
        const deleteExpense = await db.delete(Expenses).where(eq(Expenses.budgetId, params.id)).returning();

        if (deleteExpense) {
            const result = await db.delete(Budgets).where(eq(Budgets.id, params.id))
        }

        toast("Budget deleted successfully")
        router.push(`/dashboard/budget`)
    }

    useEffect(() => {
        if (user) {
            getBudgetInfo();
        }
    }, [params, user]);

    return (
        <div className='p-4 lg:px-20 lg:py-10'>
            <h1 className='font-bold flex items-center justify-between text-xl lg:text-3xl'>My Expenses
                <div className='flex items-center gap-2'>
                    {/* <Button className='flex items-center gap-1 text-lg' variant={"secondary"}> <PenBox /> Edit</Button> */}
                    <UpdateBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className='text-lg gap-1' variant={"destructive"} >
                                <Trash />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete your Budget
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>

            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5 mb-3 gap-5'>
                {budgetInfo ? <BudgetItem budget={budgetInfo} /> :
                    <Skeleton className="w-full bg-slate-200 h-[150px] rounded-lg" />
                }
                <AddExpense budgetId={params.id} refreshData={() => getBudgetInfo()} />
            </div>
            <span className='font-bold text-black text-2xl lg:text-3xl'>List of Expenses</span>
            <div className='border rounded-lg mt-3 bg-white p-2'>
                <ExpenseList expenseList={expenseList} refreshData={() => getBudgetInfo()} />
            </div>
        </div>
    )
}

export default ExpenseComponent;
