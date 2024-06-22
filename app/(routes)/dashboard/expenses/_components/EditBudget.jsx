'use client'

import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
import { useUser } from '@clerk/nextjs'
import EmojiPicker from 'emoji-picker-react'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

const EditBudget = ({budgetInfo,refreshBudget}) => {

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [Name, setName] = useState(budgetInfo?.name)
    const [amount, setAmount] = useState(budgetInfo?.amount)

    const { user } = useUser()

    async function onUpdateBudget() {
        const result = await db.update(Budgets).set({
            name:Name,
            amount:amount,
            icon:emojiIcon
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning()

        console.log(result)

        if (result) {
            refreshBudget()
            toast('Budget Updated!')
        }
    }

    useEffect(()=>{
        budgetInfo && setEmojiIcon(budgetInfo.icon)
        budgetInfo && setName(budgetInfo.name)
        budgetInfo && setAmount(budgetInfo.amount)
    })

    return (
        <div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex gap-2">
                        <PenBox />
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            <div className="pt-4">

                                <Button variant="outline" onClick={() => setOpenEmojiPicker(prev => !prev)} size="lg" className="text-lg">
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
                                    <Input placeholder="eg. Food" onChange={(e) => setName(e.target.value)} defaultValue={budgetInfo?.name} />
                                </div>
                                <div className="mt-2">
                                    <h2 className='text-black font-medium '>Budget Amount</h2>
                                    <Input placeholder="$5000" type="number" onChange={(e) => setAmount(e.target.value)} defaultValue={budgetInfo?.amount} />
                                </div>

                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter >
                        <DialogClose asChild>
                            <Button className="w-full mt-5" disabled={!Name && !amount} onClick={onUpdateBudget}>Update Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget