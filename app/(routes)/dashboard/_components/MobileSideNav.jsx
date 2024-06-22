'use client'

import React from 'react'
import { menuList } from './SideNav'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'

const MobileSideNav = ({open,toggleOpen}) => {

    const params = usePathname()
    return (
        <div className={`fixed bg-white top-16 shadow-md z-50 h-screen p-5 flex flex-col justify-between pb-20 ${open ?'translate-x-0':'-translate-x-96'} transition-all duration-300`}>
            <div className="mt-5 grid gap-4">
            <Image src="/logo.svg" height={100} width={160} alt='logo' />
                {
                    menuList.map((item, idx) => (
                        <Link href={item.path} key={item.id}>
                            <button className={`flex gap-2 items-center text-gray-500 font-medium p-3 cursor-pointer rounded-md hover:bg-blue-100 hover:text-primary ${params == item.path && 'bg-blue-100 text-primary'} w-30 text-sm`} onClick={toggleOpen}>
                                <item.icon />
                                {item.name}
                            </button>
                        </Link>
                    ))
                }
            </div>
            <div className="">
                <UserButton/>
                <h2 className='font-semibold text-xl'>Profile</h2>
            </div>
        </div>
    )
}

export default MobileSideNav