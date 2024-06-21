'use client'

import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'

const SideNav = () => {

    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: "Budget",
            icon: PiggyBank,
            path: '/dashboard/budget'
        },
        {
            id: 3,
            name: "Expense",
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: "Upgrade",
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        },
    ]

    const params = usePathname()

    useEffect(() => {

    })

    return (
        <div className="h-screen border shadow-sm">
            <Image src="./logo.svg" height={100} width={160} />
            <div className="mt-5 space-y-2">
                {
                    menuList.map((item, idx) => (
                        <Link href={item.path} key={item.id}>
                            <button className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:bg-blue-100 hover:text-primary ${params == item.path && 'bg-blue-100 text-primary'}`}>
                                <item.icon />
                                {item.name}
                            </button>
                        </Link>
                    ))
                }
            </div>
            <div className="fixed bottom-10 p-5 flex gap-2 items-center ">
                <UserButton />
                Profile
            </div>
        </div>
    )
}

export default SideNav