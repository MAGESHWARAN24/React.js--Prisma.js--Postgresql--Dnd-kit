"use client";
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useTheme } from 'next-themes';
 import React, { useState } from 'react'
 
 function ThemeSwitcher() {
    const {theme,setTheme} = useTheme();
    const [mounted,setMounted] = useState(false);
    if(mounted) return null;
   return (
     <div><Tabs defaultValue={theme}>
     <TabsList  className='border gap-2'>
         <TabsTrigger value={'light'} onClick={()=> setTheme('light')}> 
             <SunIcon className='h-[1.2rem] w-[1.2rem] m-2'/>
         </TabsTrigger>
         <TabsTrigger value={'dark'} onClick={()=> setTheme('dark')}> 
             <MoonIcon className='h-[1.2rem] w-[1.2rem] m-2 rotate-90 transition-all dark:rotate-0'/>
         </TabsTrigger>
         <TabsTrigger value={'system'} onClick={()=> setTheme('system')}> 
             <DesktopIcon className='h-[1.2rem] w-[1.2rem] m-2'/>
         </TabsTrigger>
     </TabsList>
 </Tabs></div>
   )
 }
 
 export default ThemeSwitcher