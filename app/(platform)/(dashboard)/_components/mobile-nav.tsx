"use client"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSideBar } from "@/hooks/nav-open";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "./sidebar";



const MobileNavBar = () => {
 const pathName=usePathname();
  const [mounted,setMounted]=useState(false);
  const isOpen=useMobileSideBar((state)=>state.isOpen);
  const onOpen=useMobileSideBar((state)=>state.onOpen);
  const onClose=useMobileSideBar((state)=>state.onClose);
  

  useEffect(()=>{
     setMounted(true)
  },[])
  useEffect(()=>{
     onClose()
  },[pathName,onClose])
  
  if(!mounted) return null;

  return (
    <>
      <Button className="" variant={"ghost"} size={"sm"} onClick={onOpen}>
         <Menu className="h-2 w-2 mr-2"/>
         <Sheet open={isOpen} onOpenChange={onClose}>
              <SheetContent side={"left"} className="pt-16 p-2"> 
                  <SideBar  storageKey="mobile-sidebar"/>
              </SheetContent>
         </Sheet>
      </Button>
    
    </>
  )
}

export default MobileNavBar