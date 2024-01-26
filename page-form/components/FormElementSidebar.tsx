import React from 'react'
import SideBarBtnElement from './SideBarBtnElement'
import { FormElements } from './FormElement'

function FormElementSidebar() {
  return (
    <div> 
    Element
      <SideBarBtnElement formElement={FormElements.TextField}/>
    </div>
  )
}
export default FormElementSidebar