import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardsInfo = ({ budgetList }) => {

    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)

    const calcToatlBudget = () => {
        let total = 0
        budgetList?.forEach(element => {
            total += Number(element.amount)
        });
        setTotalBudget(total)
    }

    const calcTotalSpend = () => {
        let total = 0
        budgetList?.forEach(element => {
            total += Number(element.totalSpend)
        });
        setTotalSpend(total)
    }

    useEffect(()=>{
        calcToatlBudget()
        calcTotalSpend()
    },[budgetList])

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className="rounded-lg border p-7 flex items-center justify-between ">
                <div className="">
                    <h2 className='text-sm'>Total Budget</h2>
                    <h2 className='font-bold text-2xl'>
                        ${totalBudget}
                    </h2>
                </div>
                <PiggyBank className='bg-primary text-white h-10 w-10 p-2 rounded-full' />
            </div>
            <div className="rounded-lg border p-7 flex items-center justify-between ">
                <div className="">
                    <h2 className='text-sm'>Total Spend</h2>
                    <h2 className='font-bold text-2xl'>${totalSpend}</h2>
                </div>
                <ReceiptText className='bg-primary text-white h-10 w-10 p-2 rounded-full' />
            </div>
            <div className="rounded-lg border p-7 flex items-center justify-between ">
                <div className="">
                    <h2 className='text-sm'>No. of Budgets</h2>
                    <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
                </div>
                <Wallet className='bg-primary text-white h-10 w-10 p-2 rounded-full' />
            </div>
        </div>
    )
}

export default CardsInfo