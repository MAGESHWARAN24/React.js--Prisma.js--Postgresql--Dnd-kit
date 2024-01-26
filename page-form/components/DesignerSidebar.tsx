"use client";

import React from 'react'
import { FormElements } from './FormElement';
import SideBarBtnElement from './SideBarBtnElement';
import useDesigner from './hooks/useDesigner';
import FormElementSidebar from './FormElementSidebar';
import PropertiesFormSiderbar from './PropertiesFormSiderbar';

function DesignerSidebar() {
  const {selectedElement} = useDesigner();
  return (
    <aside className='w-[400px] max-w-[400px] h-full flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto'>
       {!selectedElement && <FormElementSidebar/> }
       {selectedElement && <PropertiesFormSiderbar/>}
    </aside>
  )
}

export default DesignerSidebar