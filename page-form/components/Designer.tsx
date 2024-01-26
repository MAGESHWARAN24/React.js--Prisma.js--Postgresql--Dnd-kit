"use client";
import React, { ElementType, useState } from 'react'
import DesignerSidebar from './DesignerSidebar';
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import useDesigner from './hooks/useDesigner';
import { ElementsType, FormElementInstance, FormElements } from './FormElement';
import { idGenerator } from '@/lib/idGenerator';
import { Button } from './ui/button';
import { BiSolidTrash } from 'react-icons/bi';

function Designer() {
    const { elements, addElements } = useDesigner();
    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;
            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
            if (isDesignerBtnElement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    idGenerator()
                );
                addElements(0, newElement);
            }
        },
    })
    return (
        <div className='flex w-full h-full'>
            <div className='p-4 w-full'>
                <div
                    ref={droppable.setNodeRef}
                    className={cn('bg-background max-w-[920px] h-full m-auto flex flex-col items-center justify-start flex-1 overflow-y-auto',
                        droppable.isOver && "ring-2 ring-primary"
                    )
                    }
                >
                    {!droppable.isOver && elements.length === 0 && <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold '>Drop here</p>}
                    {droppable.isOver && (
                        <div className='w-full p-4'>
                            <div className='h-[120px] rounded-md bg-primary/20 '>
                            </div>
                        </div>
                    )}
                    {elements.length > 0 && 
                        <div className='flex flex-col w-full gap-2 p-4'>
                            {elements.map(element => (
                                <DesignerElementWrapper key={element.id} element={element}/>
                            ))}
                        </div>
                    }
                </div>
            </div>
            <DesignerSidebar />
        </div>
    )
}

function DesignerElementWrapper ({element}:{element: FormElementInstance}){
    const [mouseIsOver,setMouseIsOver] = useState<boolean>(false);
    const {removeElement} = useDesigner();
    const topHalf = useDroppable({
        id: element.id+"-top", 
        data:{
            type: element.type,
            elementId: element.id,
            isTopDesignerElement: true,
        } 
    });
    const bottomHalf = useDroppable({
        id: element.id+"-bottom", 
        data:{
            type: element.type,
            elementId: element.id,
            isBottomDesignerElement: true,
        } 
    });

    const draggable = useDraggable({
        id:element.id+"-drag-handler",
        data:{
            type:element.type,
            elementId: element.id,
            isDesignerElement: true,
        }
    });
    const DesignerElement = FormElements[element.type].designerComponent;
    return (
       <div
        ref={draggable.setNodeRef}
        {...draggable.attributes} 
        {...draggable.listeners} 
        className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
         onMouseEnter={() => {
            setMouseIsOver(true);
         }}
         onMouseLeave={() => {
            setMouseIsOver(false);
         }}
        >
       <div 
            ref={topHalf.setNodeRef}
            className={cn('absolute w-full rounded-t-md h-1/2',topHalf.isOver && "bg-green-500")}/>
       <div 
            ref={bottomHalf.setNodeRef}
            className={cn('absolute w-full rounded-b-md bottom-0 h-1/2',bottomHalf.isOver && "bg-red-500")}/>
            {
                mouseIsOver && (
                    <>
                        <div className='absolute right-0 h-full'>
                            <Button
                                variant={"outline"} 
                                className='flex justify-center h-full border rounded-md rounded-l-none bg-red-500'
                                onClick={()=>{
                                    removeElement(element.id);
                                }}
                            >
                                <BiSolidTrash className='h-6 w-6'/>
                            </Button>
                        </div>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
                            <p className='text-muted-foreground text-sm'>
                                Click for properties or drag to move
                            </p>
                        </div>
                    </>
                )
            }
       <div className={cn('flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none',
        mouseIsOver && "opacity-30"
       )}>
            <DesignerElement elementInstance={element}/>
        </div>
       </div>
    )
}

export default Designer