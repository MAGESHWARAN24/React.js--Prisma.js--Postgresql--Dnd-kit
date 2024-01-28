"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElementInstance, FormElements, SubmitFunction } from "../FormElement";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from '../ui/form';
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { LuHeading1 } from "react-icons/lu";

const type: ElementsType = "TitleField";

const extraAttributes = {
    title: "Title field",
}

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})

export const TitleFieldFormElement: FormElements = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuHeading1,
        label: "Title Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    vaildate:()=> true,
};

type customInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes,
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function DesignerComponent({ elementInstance }: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as customInstance;
    const { title } = element.extraAttributes;
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className="text-muted-foreground ">
               Title field
               <p className="text-xl">{title}</p>
            </Label>
        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as customInstance;

    const { updateElement } = useDesigner();

    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
           title: element.extraAttributes.title,
        }
    });
    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { title } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
               title
            }
        })
    }
    return (
        <Form {...form}>
            <form className="space-y-3" onBlur={form.handleSubmit(applyChanges)} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as customInstance;

    const { title } = element.extraAttributes;
    return (
       <p className="text-xl">{title}</p>
    )
}

