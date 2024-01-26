"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { FormElementInstance } from "../FormElement";

type DesignerContextType = {
    elements: FormElementInstance[];
    addElements: (index: number , element: FormElementInstance) => void;
    removeElement: (id:string) => void;
    selectedElement: FormElementInstance | null;
    setElements:Dispatch<SetStateAction<FormElementInstance[]>>;
    setSelectedElement:  Dispatch<SetStateAction<FormElementInstance | null>>;

    updateElement :(id:string, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({children}:{
    children:ReactNode;
}){
    const [elements , setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement,setSelectedElement] = useState<FormElementInstance | null>(null);

    const addElements = (index : number ,element :FormElementInstance) => {
        setElements(prev => {
            const newElement  = [...prev];
            newElement.splice(index,0,element);
            return newElement;
        })
    }
    const removeElement = (id:string) =>{
        setElements(prev => prev.filter(elements => elements.id !== id));
    }

    const updateElement = (id:string , element: FormElementInstance) =>{
        setElements(prev =>{
            const newElements = [...prev];
            const index = newElements.findIndex(el => el.id === id) 
            newElements[index] = element;
            return newElements;
        })
    }

    return <DesignerContext.Provider value={{
        elements,
        addElements,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
        setElements,
    }}>
        {children}
    </DesignerContext.Provider>
}