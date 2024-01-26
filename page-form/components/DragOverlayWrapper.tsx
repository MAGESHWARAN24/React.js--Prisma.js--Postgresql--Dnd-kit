import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { ElementsType, FormElements } from './FormElement';
import { SideBarBtnElementDragOverlay } from './SideBarBtnElement';
import useDesigner from './hooks/useDesigner';

function DragOverlayWrapper() {
    const {elements} = useDesigner();
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);
    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        }
    });

    if (!draggedItem) return null;
    let node = <div>No drag overlay</div>
    let isSideBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;
    if (isSideBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType;
        node = <SideBarBtnElementDragOverlay formElement={FormElements[type]} />
    }
    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    if(isDesignerElement){
        const elementId = draggedItem.data?.current?.elementId;
        const element = elements.find((el) => el.id === elementId);
        if(!element)node = <div>Element not found!</div>;
        else{
            const DesignerElementComponent = FormElements[element.type].designerComponent;
            node = <DesignerElementComponent elementInstance={element}/>;
        }
    }
    return (
        <DragOverlay>
            {node}
        </DragOverlay>
    )
}

export default DragOverlayWrapper