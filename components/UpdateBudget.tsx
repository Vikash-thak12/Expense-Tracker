import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useUser } from '@clerk/nextjs';
import EmojiPicker from 'emoji-picker-react';
import { Input } from './ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';


interface BudgetItemProps {
    id: number;
    name: string;
    amount: number;
    createdBy: string;
    icon: string | null;
    totalSpend: number;
    totalItem: number;
}

const UpdateBudget = ({ budgetInfo, refreshData }: { budgetInfo: BudgetItemProps | null, refreshData: () => void; }) => {

    const [emojiIcon, setEmojiIcon] = useState('😅')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)


    const [name, setName] = useState<string>(''); // Initialized as an empty string
    const [amount, setAmount] = useState<number>(0); // Initialized as 0

    const { user } = useUser()

    const onUpdateBudget = async () => {
        if (!budgetInfo?.id) return;
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon
        }).where(eq(Budgets.id,budgetInfo.id)).returning();

        if (result) {
            refreshData();
            toast("Budgets updated successfully")
        }
    }

    useEffect(() => {
        if (budgetInfo) {
            setName(budgetInfo.name)
            setAmount(budgetInfo.amount)
            setEmojiIcon(budgetInfo.icon || "😃")
        }
    }, [budgetInfo])


    return (
        <div className='z-20'>
            {/* <Button className='flex items-center gap-1 text-lg' variant={"secondary"}> <PenBox /> Edit</Button> */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='flex items-center gap-1 text-lg' variant={"secondary"}> <PenBox /> Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button variant={'outline'} onClick={() => setOpenEmojiPicker(!openEmojiPicker)} className='text-3xl p-3'>{emojiIcon}</Button>
                                <div className='absolute z-20'>
                                    <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji)
                                        setOpenEmojiPicker(false)
                                    }} />
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-bold text-xl text-black py-2'>Enter Budget Name</h2>
                                <Input defaultValue={budgetInfo?.name} placeholder='Ex. Shopping' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-bold text-xl text-black py-2'>Enter Budget</h2>
                                <Input defaultValue={budgetInfo?.amount} placeholder='Ex. 5000' type='number' onChange={(e) => setAmount(Number(e.target.value))} />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button disabled={!(name && amount)} onClick={() => onUpdateBudget()} variant={'destructive'} className='mt-5 w-full'>Update Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateBudget