import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className="p-5 flex justify-between items-center shadow-md" >
        <Image
            src='./logo.svg'
            width={160}
            height={100}
        />
        <Button>Get Started</Button>
    </div>
  )
}

export default Header