import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { toast } from 'sonner'

const AddExpenses = ({ budgetId, refreshBudget }) => {

    const { user } = useUser()

    const [Name, setName] = useState('')
    const [amount, setamount] = useState(0)

    const addNewExpense = async () => {
        const result = await db.insert(Expenses).values({
            name: Name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/YYYY')
        }).returning({ insertedId: Budgets.id })

        if (result) {
            refreshBudget()
            toast('Expense added succesfully')
        }
    }

    return (
        <div className='p-5 border rounded-lg grid gap-4'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className="mt-2">
                <h2 className='text-black font-medium '>Expense Name</h2>
                <Input placeholder="eg. Food" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mt-2">
                <h2 className='text-black font-medium '>Expense Amount</h2>
                <Input placeholder="eg. 2000" onChange={(e) => setamount(e.target.value)} />
            </div>
            <Button disabled={!Name || !amount} className={'w-full'} onClick={() => addNewExpense()}>Add New Expense</Button>
        </div>
    )
}

export default AddExpenses