import React from 'react'
import { Button } from './ui/button'
import { MdPreview } from 'react-icons/md';
import useDesigner from './hooks/useDesigner';
import { Dialog , DialogContent, DialogTrigger} from './ui/dialog';
import { FormElements } from './FormElement';

function PreviewDialogBtn() {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant={"outline"} className='gap-2'>
        <MdPreview className='h-6 w-6'/>
            Preview
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0 '>
        <div className='px-4 py-2 border-b'>
            <p className='text-lg font-bold text-muted-foreground'>Form Preview</p>
            <p className='text-s, text-muted-foreground'>
              This is how your from will look like to your users.
            </p>
        </div>
        <div className='bg-accent flex flex-col  flex-grow items-center justify-center p-4 bg-[url(/paper.svg)]  dark:bg-[url(/paper.svg)] over-flow-auto'>
          <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full  rounded-2xl p-8 overflow-y-auto'>
              {
                elements.map(element => {
                  const FormComponent = FormElements[element.type].formComponent;
                  return <FormComponent key={element.id} elementInstance={element}/>
                })
              }
          </div>
        </div>
      </DialogContent>
    </Dialog>
    
  )
}

export default PreviewDialogBtn