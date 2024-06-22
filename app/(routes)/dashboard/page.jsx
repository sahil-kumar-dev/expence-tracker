'use client'

import { db } from '@/utils/dbConfig'
import { UserButton, useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CardsInfo from './_components/CardsInfo'
import { Budgets, Expenses } from '@/utils/schema'
import BarChartDashboard from './_components/BarChartDashboard'
import { BudgetItem } from './budget/_components/BudgetItem'
import ExpenseListTable from './expenses/_components/ExpenseListTable'


const page = () => {

	const { user } = useUser()

	const [budgetList, setBudgetList] = useState(null)
	const [expensesList, setExpensesList] = useState([])

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
		getAllExpense()
	}

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

	return (
		<div className='space-y-5'>
			<h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
			<p className='text-gray-500 '>Here'w what happening with your money, Let's manage your Expense</p>
			<CardsInfo budgetList={budgetList} />
			<div className="grid md:grid-cols-3 gap-5">
				<div className="md:col-span-2 ">
					<div className="border flex items-center justify-center rounded-lg p-5 flex-col">
						<BarChartDashboard budgetList={budgetList} />
					</div>
					<h2 className='font-bold text-2xl mt-4'>Recent Expences</h2>
					<ExpenseListTable expenceList={expensesList} />
				</div>
				<div className="grid gap-4">
					<h2 className='text-2xl font-bold'>Latest Budgets</h2>
					{
						budgetList && budgetList.map((budget, idx) => {
							return <BudgetItem key={idx}  {...budget} />
						})
					}
				</div>
			</div>
		</div>
	)
}

export default page