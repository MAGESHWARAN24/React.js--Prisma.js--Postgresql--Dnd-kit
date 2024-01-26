import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";
export type FormElements = {
    type : ElementsType;

    construct: (id:string) => FormElementInstance;

    designerBtnElement:{
        icon: React.ElementType,
        label: string,
    }


    designerComponent: React.FC<{
        elementInstance : FormElementInstance;
    }>;
    formComponent: React.FC <{
        elementInstance: FormElementInstance;
    }>;
    propertiesComponent: React.FC<{
        elementInstance : FormElementInstance;
    }>;
};
export type FormElementInstance ={
    id:string;
    type:ElementsType;
    extraAttributes?:Record<string,any>;
}

type FormElementsType = {
    [key in ElementsType]: FormElements;
}
export const FormElements: FormElementsType ={
    TextField: TextFieldFormElement,
};
