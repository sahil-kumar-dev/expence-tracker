'use client'

import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import ExpensesSkeleton from './_components/ExpensesSkeleton'

const Page = () => {

    const [expensesList, setExpensesList] = useState([])

    const { user } = useUser()

    const getAllExpense = async () => {
        const result = await db.select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            createdAt: Expenses.createdAt
        })
            .from(Budgets)
            .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(Expenses.id))

        setExpensesList(result)
    }

    useEffect(()=>{
        user && getAllExpense()
    })

    return (
        <div>
            <h2 className='text-2xl font-bold'>All Expenses</h2>
            {
                expensesList.length > 0 ?
                <ExpenseListTable expenceList={expensesList} />
                :
                <ExpensesSkeleton/>
            }
        </div>
    )
}

export default Page