import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashBoardHeader = () => {
  return (
    <div className="p-5 shadow-sm border flex justify-between">
        <div className="">
            Search Bar
        </div>
        <div className="">
            <UserButton/>
        </div>
    </div>
  )
}

export default DashBoardHeader