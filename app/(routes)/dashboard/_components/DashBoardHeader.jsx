import { UserButton } from '@clerk/nextjs'
import { IndianRupee, Menu } from 'lucide-react'

const DashBoardHeader = ({toggleOpen}) => {
  return (
    <div className="p-5 shadow-sm border flex justify-between sticky top-0 z-50 bg-white">
      <div className="text-2xl text-green-700 font-bold">
        <div className="hidden lg:block">
          <IndianRupee />
        </div>
        <button onClick={toggleOpen} className='text-black lg:hidden'>
          <Menu/>
        </button>

      </div>
      <div className="">
        <UserButton />
      </div>
    </div>
  )
}

export default DashBoardHeader