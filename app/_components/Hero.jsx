'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {

    const { isSignedIn } = useUser()
    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center flex-col">

                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Manage your expence
                        <strong className="font-extrabold text-primary sm:block"> Control your money</strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Start Creating Your Budget and save ton of money
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                            {
                                isSignedIn ?
                                    <Link href={'/dashboard'}>
                                        <Button>Dashboard</Button>
                                    </Link>
                                    :
                                    <Link href="/sign-in">
                                        <Button>Get Started</Button>
                                    </Link>
                            }
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-8">
                    <Image
                        src={'/dashboard.webp'}
                        height={1000}
                        width={1000}
                        alt='dashboard image'
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero