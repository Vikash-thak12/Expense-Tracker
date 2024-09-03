'use client'
import React, { useEffect, useState } from 'react';
import { PiggyBank, Receipt, Wallet } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { useUser } from '@clerk/nextjs';

interface BudgetItemProps {
  id: number;
  name: string;
  amount: number;
  createdBy: string;
  icon: string | null;
  totalSpend: number;
  totalItem: number;
}

const CardInfo = ({ budgetList }: { budgetList: BudgetItemProps[] }) => {

  const {user} = useUser();
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);


  // Calculate total budget and total spent from the budget list.
  const calculateCardInfo = () => {
    console.log("The budget list is", budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach((item) => {
      totalBudget_ += item.amount;
      totalSpend_ += item.totalSpend;
    });

    console.log(totalBudget_, totalSpend_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  }

  useEffect(() => {
    user&&calculateCardInfo();
  }, [user,budgetList]); // Re-run the effect when budgetList changes

  return (
    <>
      {
        budgetList?.length > 0 ? (
          <div className='mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              <div className='bg-gray-500 p-5 flex items-center justify-between cursor-pointer rounded-lg'>
                <div>
                  <h1 className='font-bold text-2xl'>Total Budget</h1>
                  <h1 className='font-bold text-2xl'>$ {totalBudget}</h1>
                </div>
                <PiggyBank className='h-16 w-16 p-2 bg-gray-400 rounded-full' />
              </div>
              <div className='bg-gray-500 p-5 flex items-center justify-between cursor-pointer rounded-lg'>
                <div>
                  <h1 className='font-bold text-2xl'>Total Spent</h1>
                  <h1 className='font-bold text-2xl'>$ {totalSpend}</h1>
                </div>
                <Receipt className='h-16 w-16 p-2 bg-gray-400 rounded-full' />
              </div>
              <div className='bg-gray-500 p-5 flex items-center justify-between cursor-pointer rounded-lg'>
                <div>
                  <h1 className='font-bold text-2xl'>No. of Budgets</h1>
                  <h1 className='font-bold text-2xl'>{budgetList.length}</h1>
                </div>
                <Wallet className='h-16 w-16 p-2 bg-gray-400 rounded-full' />
              </div>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            {
              [1, 2, 3, 4, 5].map((index) => (
                <Skeleton key={index} className='h-[100px] w-full animate-pulse bg-slate-200 rounded-md' />
              ))
            }
          </div>

        )
      }
    </>
  )
}

export default CardInfo;
