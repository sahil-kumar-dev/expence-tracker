import { UserButton } from '@clerk/nextjs'
import { IndianRupee } from 'lucide-react'
import React from 'react'

const DashBoardHeader = () => {
  return (
    <div className="p-5 shadow-sm border flex justify-between sticky top-0 z-50 bg-white">
        <div className="text-2xl text-green-700 font-bold">
            <IndianRupee/>
        </div>
        <div className="">
            <UserButton/>
        </div>
    </div>
  )
}

export default DashBoardHeader