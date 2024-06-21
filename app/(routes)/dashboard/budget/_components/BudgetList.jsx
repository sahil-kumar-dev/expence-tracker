'use client'

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'

const BudgetList = () => {

    const { user } = useUser()

    const [budgetList, setBudgetList] = useState(null)

    useEffect(() => {
        user && getBudgetList()
    })

    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            // totalSpend: Expenses.amount && sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItems: sql`count(${Expenses.id})`.mapWith(Number)
        })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgedId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)

        setBudgetList(result)
    }


    return (
        <div className='mt-7'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CreateBudget />
                {
                    budgetList && budgetList.map((item, idx) => (
                        <BudgetItem key={idx} {...item} />
                    ))
                }
            </div>
        </div>
    )
}

export default BudgetList


const BudgetItem = ({ icon, name, totalItems, amount, totalSpend }) => {
    return (
        <div className='p-5 border rounded-lg '>
            <div className="flex items-center gap-5 justify-between flex-col">
                <div className=" w-full flex justify-between items-center">
                    <div className="flex gap-4">
                        <h2 className='text-3xl p-2 bg-slate-100 rounded-full'>{icon}</h2>
                        <div>
                            <h2 className="">{name}</h2>
                            <h2 className="">{totalItems}&nbsp;Item</h2>
                        </div>
                    </div>
                    <h2 className='font-bold text-primary'>
                        {amount}
                    </h2>
                </div>
                <div className=" w-full">
                    <div className="flex justify-between">
                        <h2 className='text-xs text-slate-400'>{totalSpend ? totalSpend : 0} Spent</h2>
                        <h2 className='text-xs text-slate-400'>{totalSpend ? totalSpend : 0} Remaining</h2>
                    </div>
                    <div className="w-full bg-slate-300 h-4 mt-5 rounded-full relative">
                        <div className="w-2/5 bg-primary h-4 mt-5 rounded-full relative"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}