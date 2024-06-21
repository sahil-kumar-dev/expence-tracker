import React from 'react'
import BudgetList from './_components/BudgetList'

const page = () => {
  return (
    <div>
      <h2 className='font-bold text-3xl'>My Budgets</h2>
      <BudgetList/>
    </div>
  )
}

export default page