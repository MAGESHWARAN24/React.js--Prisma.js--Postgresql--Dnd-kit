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
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "../ui/slider";

const type: ElementsType = "SpacerField";

const extraAttributes = {
    height: 20,//px
}

const propertiesSchema = z.object({
    height: z.number().min(2).max(50),
})

export const SpacerFieldFormElement: FormElements = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuSeparatorHorizontal,
        label: "Spacer Field",
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
    const { height } = element.extraAttributes;
    return (
        <div className="flex flex-col w-full gap-2 items-center">
            <Label className="text-muted-foreground">
               Spacer field {height} px
            </Label>
               <LuSeparatorHorizontal className="h-8 w-8"/>
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
           height: element.extraAttributes.height,
        }
    });
    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { height } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
               height
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
                    name="height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Height (px) : {form.watch("height")}</FormLabel>
                            <FormControl className="pt-2">
                                <Slider defaultValue={[field.value]} min={5} max={100} step={1} onValueChange={(value)=>{
                                    field.onChange(value[0]);
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

    const { height } = element.extraAttributes;
    return (
       <div style={{height , width:"100%"}}></div>
    )
}

