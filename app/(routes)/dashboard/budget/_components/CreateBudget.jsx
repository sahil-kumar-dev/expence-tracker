'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { db } from '@/utils/dbConfig'


const CreateBudget = () => {

    const [emojiIcon, setEmojiIcon] = useState('')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(true)

    const [Name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const { user } = useUser()

    // Used to create Budget

    async function onCreateBudget() {
        const result = await db.insert(Budgets)
            .values({
                name: Name,
                amount: amount,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                icon: emojiIcon
            }).returning({ insertedId: Budgets.id })

        console.log(result)

        if (result) {
            toast('New Budget Created ')
        }
    }

    return (
        <div>

            <Dialog>
                <DialogTrigger asChild>
                    <div className="bg-slate-100 p-10 rounded-md items-center flex border-2 border-dashed cursor-pointer flex-col hover:shadow-md">
                        <h2 className='text-3xl '>+</h2>
                        <h2>Create new budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new Budget</DialogTitle>
                        <DialogDescription>
                            <div className="pt-4">

                                <Button variant="outline" onclick={() => setOpenEmojiPicker(!openEmojiPicker)} size="lg" className="text-lg">
                                    {emojiIcon}
                                </Button>
                                <div className="absolute z-50">
                                    <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji)
                                        setOpenEmojiPicker(false)
                                    }} />
                                </div>
                                <div className="mt-2">
                                    <h2 className='text-black font-medium '>Budget Name</h2>
                                    <Input placeholder="eg. Food" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mt-2">
                                    <h2 className='text-black font-medium '>Budget Amount</h2>
                                    <Input placeholder="$5000" type="number" onChange={(e) => setAmount(e.target.value)} />
                                </div>

                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter >
                        <DialogClose asChild>
                            <Button className="w-full mt-5" disabled={!Name && !amount} onClick={onCreateBudget}>Create Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateBudget