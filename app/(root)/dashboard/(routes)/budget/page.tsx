import BudgetList from '@/components/BudgetList'
import React from 'react'

const BudgetPage = () => {
  return (
    <div className='border mt-32 px-10 py-5'>
      <h1 className='font-bold text-2xl'>My Budgets</h1>
      <BudgetList />
    </div>
  )
}

export default BudgetPage