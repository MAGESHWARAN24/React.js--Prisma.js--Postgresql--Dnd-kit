"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElementInstance, FormElements } from "../FormElement";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type:ElementsType = "TextField";

const extraAttributes ={
    label:"Text field",
    helperText:"Helper text",
    required: false,
    placeHolder:"value here...",
}
export const TextFieldFormElement:FormElements={
    type,
    construct: (id:string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement :{
        icon: MdTextFields,
        label:"Text Field",
    },
    designerComponent: DesignerComponent,
    formComponent:()=><div>Form component</div>,
    propertiesComponent:()=><div>Properties component</div>,
};

type customInstance = FormElementInstance & {
    extraAttributes: typeof  extraAttributes, 
}


function DesignerComponent({elementInstance}:{
    elementInstance:FormElementInstance;
}){
    const element = elementInstance as customInstance;
    const { label, required, placeHolder, helperText} = element.extraAttributes;
    return (
        <div className="flex flex-col w-full gap-2">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeHolder}/>
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
        </div>
    )
}