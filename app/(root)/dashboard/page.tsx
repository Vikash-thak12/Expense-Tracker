"use client"
import BarChartDashboard from '@/components/BarChartDashboard';
import BudgetItem from '@/components/BudgetItem';
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
    user && getBudgetList();
  }, [user]);


  const {message, icon} = getGreeting()
  return (
    <>
      <div className='p-5 lg:px-20'>
        <div className='rounded-lg shadow-md shadow-black p-5 mb-5'>
          <h1 className='font-bold py-2 text-4xl lg:text-3xl text-center text-white'>{message}, {userName}</h1>
          <p className='text-center text-white'>Welcome to dashboard! Track budgets, visualize spending, and manage your finances effortlessly. Stay on top of your goals and make informed decisions with ease.</p>
        </div>
        <CardInfo budgetList={budgetList} />
        <div className='grid grid-cols-1 md:grid-cols-3 mt-5 gap-5 rounded-md'>
          <div className='col-span-1 md:col-span-2'>
            <BarChartDashboard budgetList={budgetList} />
          </div>
          <div className='border border-black rounded-md grid grid-cols-1 gap-2 lg:gap-5 p-3 h-[460px] overflow-auto'>
            <h1 className='font-bold text-center mb-2 mt-2 text-2xl text-white'>Your Budgets</h1>
            {
              budgetList.map((budget,index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard