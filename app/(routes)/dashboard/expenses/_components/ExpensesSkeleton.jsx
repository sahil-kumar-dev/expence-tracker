import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ExpensesSkeleton = () => {
  return (
    <div className='grid gap-2'>
        <Skeleton height={30}/>
        <Skeleton height={30}/>
        <Skeleton height={30}/>
        <Skeleton height={30}/>
        <Skeleton height={30}/>
        <Skeleton height={30}/>
        <Skeleton height={30}/>
        <Skeleton height={30}/>
    </div>
  )
}

export default ExpensesSkeleton