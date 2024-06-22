'use client'

import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'

export const menuList = [
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

const SideNav = () => {


    const params = usePathname()


    return (
        <div className="h-screen border shadow-sm p-5">
            <Image src="./logo.svg" height={100} width={160} alt='logo' />
            <div className="mt-5 grid gap-4">
                {
                    menuList.map((item, idx) => (
                        <Link href={item.path} key={item.id}>
                            <button className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:bg-blue-100 hover:text-primary ${params == item.path && 'bg-blue-100 text-primary'} w-40`}>
                                <item.icon />
                                {item.name}
                            </button>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default SideNav