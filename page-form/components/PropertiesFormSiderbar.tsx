import React from 'react'
import useDesigner from './hooks/useDesigner'
import { FormElements } from './FormElement';
import { Button } from './ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import { Separator } from './ui/separator';


function PropertiesFormSiderbar() {
   const { selectedElement , setSelectedElement } = useDesigner();
    if(!selectedElement) return null;
    const  PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className='flex flex-col -p-2'>
        <div className='flex justify-between items-center'>
            <p className="text-sm text-foreground/70">
                Element properties
                <Button size={"icon"} variant={"ghost"} onClick={() => {
                    setSelectedElement(null);
                }}>
                    <AiOutlineClose/>
                </Button>
            </p>
        </div>
        <Separator className='mb-4'/>
        <PropertiesForm elementInstance={selectedElement}/>
    </div>
  )
}

export default PropertiesFormSiderbar