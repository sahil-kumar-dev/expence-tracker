import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpenseListTable = ({ expenceList }) => {

    const deleteExpence = async (id) => {
        const result = db.delete(Expenses)
                        .where(eq(Expenses.di,id))
                        .returning()

        if(result){
            toast('Expense Deleted!')
        }
    }

    return (
        <div className='mt-3'>
            <div className="grid grid-cols-4 bg-slate-400 p-2">
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>Date</h2>
                <h2 className='font-bold'>Action</h2>
            </div>
            {
                expenceList && expenceList.map(({name,amount,createdAt,id}) => (
                    <div className="grid grid-cols-4 bg-slate-50 p-2" key={id}>
                        <h2>{name}</h2>
                        <h2>{amount}</h2>
                        <h2>{createdAt}</h2>
                        <button onClick={()=>deleteExpence(id)}>
                            <Trash className='text-red-600'/>
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default ExpenseListTable