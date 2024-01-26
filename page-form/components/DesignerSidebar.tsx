"use client";

import React from 'react'
import { FormElements } from './FormElement';
import SideBarBtnElement from './SideBarBtnElement';

function DesignerSidebar() {
  return (
    <aside className='w-[400px] max-w-[400px] h-full flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto'>
        Element
        <SideBarBtnElement formElement={FormElements.TextField}/>
    </aside>
  )
}

export default DesignerSidebar