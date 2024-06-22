'use client'

import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import DashBoardHeader from './_components/DashBoardHeader'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import MobileSideNav from './_components/MobileSideNav'

const DashBoardLayout = ({ children }) => {

    const { user } = useUser()

    const router = useRouter()

    useEffect(() => {
        user && checkUserBudget()
    }, [user])

    const [open, setOpen] = useState(false)


    const checkUserBudget = async () => {
        const result = await db.select()
            .from(Budgets)
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))

        if (result?.length == 0) {
            router.replace('/dashboard/budget')
        }
    }

    return (
        <div>
            <div className="fixed md:w-64 hidden lg:block border">
                <SideNav />
            </div>
            <MobileSideNav open={open} toggleOpen={()=>setOpen(prev=>!prev)} />
            <div className="lg:ml-64 relative">
                <DashBoardHeader toggleOpen={()=>setOpen(prev=>!prev)} />
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashBoardLayout