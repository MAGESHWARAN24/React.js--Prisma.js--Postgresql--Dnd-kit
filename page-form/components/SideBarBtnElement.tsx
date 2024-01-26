import React from 'react'
import { FormElements } from './FormElement'
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

function SideBarBtnElement(
    {formElement}:{formElement:FormElements}
) 
{
    const {label ,icon : Icon} = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data:{
            type: formElement.type,
            isDesignerBtnElement: true,
        },
    });
  return (
    <Button 
        variant={"outline"}
        ref={draggable.setNodeRef}
        className={cn('flex flex-col gap-2 h-[120px] w-[120px] cursor-grap',
        draggable.isDragging && "ring-2 ring-primary"
        )}
        {...draggable.listeners}
        {...draggable.attributes}
        >
        <Icon className="h-8 w-8 text-primary cursor-grap"/>
        <p className='text-xs'>{label}</p>
    </Button>
  )
}

export function SideBarBtnElementDragOverlay(
    {formElement}:{formElement:FormElements}
) 
{
    const {label ,icon : Icon} = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data:{
            type: formElement.type,
            isDesignerBtnElement: true,
        },
    });
  return (
    <Button 
        variant={"outline"}
        className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grap'
        >
        <Icon className="h-8 w-8 text-primary cursor-grap"/>
        <p className='text-xs'>{label}</p>
    </Button>
  )
}

export default SideBarBtnElement