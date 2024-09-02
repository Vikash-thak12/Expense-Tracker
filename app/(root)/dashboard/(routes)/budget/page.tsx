import BudgetList from '@/components/BudgetList'
import React from 'react'

const BudgetPage = () => {
  return (
    <div className='mt-8 px-10 lg:px-32 py-5 h-full overflow-hidden'>
      <h1 className='font-bold text-2xl'>My Budgets</h1>
      <BudgetList />
    </div>
  )
}

export default BudgetPage