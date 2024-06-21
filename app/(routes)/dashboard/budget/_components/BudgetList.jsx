'use client'

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Link from 'next/link'
import { BudgetItem } from './BudgetItem'
import { BudgetItemSkeleton } from './BudgetItemSkeleton'

const BudgetList = () => {

    const { user } = useUser()

    const [budgetList, setBudgetList] = useState(null)

    useEffect(() => {
        user && getBudgetList()
    })

    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(CAST(${Expenses.amount} AS numeric))`.mapWith(Number),
            totalItems: sql`count(${Expenses.id})`.mapWith(Number)
        })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)

        setBudgetList(result)
    }


    return (
        <div className='mt-7'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CreateBudget />
                {
                    budgetList ? budgetList.map((item, idx) => (
                        <BudgetItem key={idx} {...item} />
                    ))
                        :
                        [1, 2, 3, 4, 5, 6,7,8].map((item) => (
                            <BudgetItemSkeleton key={item} />
                        ))
                }
            </div>
        </div>
    )
}

export default BudgetList



