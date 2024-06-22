'use client'

import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql, sum, sumDistinct } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import AddExpenses from '../_components/AddExpenses'
import ExpenseListTable from '../_components/ExpenseListTable'
import { BudgetItem } from '../../budget/_components/BudgetItem'
import { BudgetItemSkeleton } from '../../budget/_components/BudgetItemSkeleton'
import { Button } from '@/components/ui/button'
import { PenBox, Trash } from 'lucide-react'
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
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import EditBudget from '../_components/EditBudget'
import ExpensesSkeleton from '../_components/ExpensesSkeleton'


const Page = ({ params }) => {

    const { user } = useUser()

    const route = useRouter()

    const [budgetInfo, setbudgetInfo] = useState(null)
    const [expencesList, setexpencesList] = useState([])

    useEffect(() => {
        user && getBudgetInfo()
        user && getExpencesList()
    })

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(CAST(${Expenses.amount} AS numeric))`.mapWith(Number),
            totalItems: sql`count(${Expenses.id})`.mapWith(Number)
        })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id)

        setbudgetInfo(result[0])
    }

    const getExpencesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id))

        setexpencesList(result)
    }

    const deleteBudget = async () => {

        const deleteExpense = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, params.id))

        const result = await db.delete(Budgets)
            .where(eq(Budgets.id, params.id))
            .returning()

        toast('Budget Deleted!')
        route.replace('/dashboard/budget')
    }

    return (
        <div>
            <div className="flex justify-between py-6">
                <h2 className='text-2xl font-bold'>My Expenses</h2>
                <div className="flex gap-2">
                    <span>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant={'destructive'} className={'flex gap-2'}>
                                    <Trash /> Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your current budget
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </span>
                    <span>
                        <EditBudget budgetInfo={budgetInfo} refreshBudget={() => getBudgetInfo()} />
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {
                    budgetInfo ?
                        <BudgetItem {...budgetInfo} />
                        :
                        <BudgetItemSkeleton />
                }
                <AddExpenses refreshBudget={getBudgetInfo} budgetId={params.id} />
            </div>
            <div className="">
                <h2 className='font-bold text-lg'>Latest Expences</h2>
                {
                    expencesList.length > 0 ?
                        <ExpenseListTable expenceList={expencesList} />
                        :
                        <ExpensesSkeleton />
                }
            </div>
        </div>
    )
}

export default Page