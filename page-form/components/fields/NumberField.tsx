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
import { Bs123 } from "react-icons/bs";

const type: ElementsType = "NumberField";

const extraAttributes = {
    label: "Number field",
    helperText: "Helper text",
    required: false,
    placeHolder: "0",
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
})

export const NumberFieldFormElement: FormElements = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: Bs123,
        label: "Number Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    vaildate: (formElement: FormElementInstance, currentValue:string):boolean =>{
        const element = formElement as customInstance;
        if(element.extraAttributes.required){
            return currentValue.length > 0;
        }
        return true;
    }
};

type customInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes,
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function DesignerComponent({ elementInstance }: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as customInstance;
    const { label, required, placeHolder, helperText } = element.extraAttributes;
    return (
        <div className="flex flex-col w-full gap-2">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Input type="number" readOnly disabled placeholder={placeHolder} />
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
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
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            placeHolder: element.extraAttributes.placeHolder,
            required: element.extraAttributes.required,
        }
    });
    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        const { label, placeHolder, helperText, required } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                placeHolder,
                helperText,
                required,
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
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }} />
                            </FormControl>
                            <FormDescription>
                                The label of the field.<br /> It will be displayed above the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="placeHolder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PlaceHolder</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }} />
                            </FormControl>
                            <FormDescription>
                                The placeholder of the field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="helperText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Helpertext</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }} />
                            </FormControl>
                            <FormDescription>
                                The Helpertext of the field.<br /> it will be displayed below the field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Required</FormLabel>
                                <FormDescription>
                                    The Helpertext of the field.<br /> it will be displayed below the field.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
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
    submitValue,
    isInVaild,
    defaultValue,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInVaild?:boolean;
    defaultValue?:string
}) {
    const element = elementInstance as customInstance;

    const [value, setValue] = useState(defaultValue || "");

    const [error,setError] = useState(false);

    useEffect(()=>{
        setError(isInVaild === true);
    },[isInVaild])
    const { label, required, placeHolder, helperText } = element.extraAttributes;
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className={cn(error && "text-red-500")}>
                {label}
                {required && "*"}
            </Label>
            <Input 
                type="number"
                className={cn(error && "border-red-500")} 
                placeholder={placeHolder} 
                onChange={e => setValue(e.target.value)} 
                onBlur={(e) => {

                    if (!submitValue) return;
                    const vaild = NumberFieldFormElement.vaildate(element,e.target.value);
                    setError(!vaild);
                    if(!vaild) return;
                    submitValue(element.id, e.target.value);
                }}
                value={value}
            />
            {helperText && <p className={cn("text-muted-foreground text-[0.8rem]",
                error && "text-red-500"
            )}>{helperText}</p>}
        </div>
    )
}

