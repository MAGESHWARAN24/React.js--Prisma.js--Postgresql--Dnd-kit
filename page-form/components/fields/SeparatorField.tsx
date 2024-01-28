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
import { RiSeparator } from "react-icons/ri";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElements = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    vaildate:()=> true,
};

function DesignerComponent({ elementInstance }: {
    elementInstance: FormElementInstance;
}) {
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className="text-muted-foreground ">
                Separator field
               <Separator/>
            </Label>
        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    return <p>No properties for this element</p>
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    return (
       <Separator/>
    )
}

