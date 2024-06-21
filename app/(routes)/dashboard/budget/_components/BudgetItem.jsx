import Link from "next/link"

export const BudgetItem = ({ icon, name, totalItems, amount, totalSpend, id }) => {

    function spendPercentage() {
        return (totalSpend / amount) * 100
    }

    console.log('name', name, 'totalItem:', totalItems, 'totalSpend', totalSpend)

    return (
        <Link href={"/dashboard/expenses/" + id}>
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
                            <h2 className='text-xs text-slate-400'>{amount - totalSpend} Remaining</h2>
                        </div>
                        <div className="w-full bg-slate-300 h-4 mt-5 rounded-full relative">
                            <div className="bg-primary h-4 mt-5 rounded-full relative" style={{ width: `${spendPercentage()}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}