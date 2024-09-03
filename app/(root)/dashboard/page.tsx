"use client"
import CardInfo from '@/components/CardInfo';
import { db } from '@/utils/dbConfig';
import { formatUserName, getGreeting } from '@/utils/formatUserName';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
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


const Dashboard = () => {
  const { user } = useUser();
  const userName = formatUserName(user)

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

      console.log("The budget is:", result);
      setBudgetList(result)
  };

  useEffect(() => {
      user&&getBudgetList();
  }, [user]);


  getGreeting()
  return (
    <>
      <div className='p-10 lg:px-20'>
        <div className='shadow-md shadow-black p-5 mb-5'>
          <h1 className='font-bold text-3xl'>{getGreeting()}, {userName}</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad delectus aliquid iure quod esse impedit ratione perferendis possimus explicabo similique architecto, nobis sed error minus quisquam eaque in eveniet ea?</p>
        </div>
        <CardInfo budgetList={budgetList} />
      </div>
    </>
  )
}

export default Dashboard