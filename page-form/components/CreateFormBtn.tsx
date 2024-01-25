"use client";

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from  "./ui/form";
import { BsFileEarmarkPlus} from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from './ui/button';
import {Label } from "./ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from 'react-hook-form';

const formSchema = z.object({
    name: z.string().min(4),
    description: z.string().optional(),
});
 
type formSchemaType = z.infer<typeof formSchema>;
function CreateFormBtn() {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });
    function onSubmit(values: formSchemaType){
        console.log(values);
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Create new form</Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Create form
            </DialogTitle>
            <DialogDescription>
                Create a new form to start collecting reponses
            </DialogDescription>
        </DialogHeader>
        <Form {...form}></Form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateFormBtn