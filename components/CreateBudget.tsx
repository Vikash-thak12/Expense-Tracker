'use client'
import React, { ReactNode, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import EmojiPicker from 'emoji-picker-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';


const CreateBudget = ({refreshData}: {refreshData: any}) => {
    const [emojiIcon, setEmojiIcon] = useState('😅')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)


    const [name, setName] = useState<string>(''); // Initialized as an empty string
    const [amount, setAmount] = useState<number>(0); // Initialized as 0

    const { user } = useUser()

    const onCreateBudget = async () => {
        // Ensure `amount` is converted to a number
        const amountNumber = Number(amount);

        // Ensure `createdBy` is defined
        const createdByEmail = user?.primaryEmailAddress?.emailAddress ?? '';

        // Handle possible missing `emojiIcon`
        const emojiIconValue = emojiIcon || '';

        try {
            // Insert into the database
            const result = await db.insert(Budgets).values({
                name: name ?? '', // Provide default empty string if `name` is undefined
                amount: amountNumber,
                createdBy: createdByEmail,
                icon: emojiIconValue
            }).returning({ insertedId: Budgets.id });

            // Check if result is returned
            if (result) {
                toast("Budget created Successfully");
                refreshData();
            } else {
                console.error("Insert failed: No result returned");
            }
        } catch (error) {
            console.error("Error inserting budget:", error);
        }
    };


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-500 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
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
                                <Input placeholder='Ex. Shopping' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-bold text-xl text-black py-2'>Enter Budget</h2>
                                <Input placeholder='Ex. 5000' type='number' onChange={(e) => setAmount(Number(e.target.value))} />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                            <Button disabled={!(name && amount)} onClick={() => onCreateBudget()} className='mt-5 w-full'>Create Budget</Button>
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateBudget
