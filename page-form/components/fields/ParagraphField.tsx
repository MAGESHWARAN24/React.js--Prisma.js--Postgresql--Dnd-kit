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
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "../ui/textarea";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
    text: "Text here",
}

const propertiesSchema = z.object({
    text: z.string().min(2).max(500),
})

export const ParagraphFieldFormElement: FormElements = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: BsTextParagraph,
        label: "Paragraph Field",
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
    const { text } = element.extraAttributes;
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className="text-muted-foreground ">
               Paragraph field
               <p className="text-lg">{text}</p>
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
           text: element.extraAttributes.text,
        }
    });
    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { text } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
              text
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
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Textarea rows={5} {...field} onKeyDown={(e) => {
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

    const { text } = element.extraAttributes;
    return (
       <p>{text}</p>
    )
}

