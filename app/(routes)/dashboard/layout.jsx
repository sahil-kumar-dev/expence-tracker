'use client'

import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashBoardHeader from './_components/DashBoardHeader'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const DashBoardLayout = ({ children }) => {

    const { user } = useUser()

    const router = useRouter()

    useEffect(() => {
        user && checkUserBudget()
    }, [user])


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
            <div className="fixed md:w-64 hidden md:block border">
                <SideNav />
            </div>
            <div className="md:ml-64 relative">
                <DashBoardHeader />
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashBoardLayout