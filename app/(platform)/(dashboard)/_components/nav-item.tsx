"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Activity,CreditCard,Layout, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type OrganizationType = {
  id: string;
  imageUrl: string;
  name: string;
  slug: string | null;
};

interface NavItemProps {
  isActive: boolean;
  onExpand: (id: string) => void;
  organization: OrganizationType;
  isExpanded: boolean;
}


export const NavItem = ({
  isActive,
  onExpand,
  organization,
  isExpanded,
}: NavItemProps) => {
    const router=useRouter();
    const pathName=usePathname();
    const routes=[
        {
            label:"Boards",
            icon:<Layout className="h-4 w-4 mr-2"/>,
            href:"/organization/"+organization.id
        },
        {
            label:"Activity",
            icon:<Activity className="h-4 w-4 mr-2"/>,
            href:`/organization/${organization.id}/activity`
        },
        {
            label:"Settings",
            icon:<Settings className="h-4 w-4 mr-2"/>,
            href:`/organization/${organization.id}/settings`
        },
        {
            label:"Billing",
            icon:<CreditCard className="h-4 w-4 mr-2"/>,
            href:`/organization/${organization.id}/billing`
        }
    ]
  return (
    <AccordionItem value={organization?.id} className={"border-none"}>
      <AccordionTrigger
        onClick={() => onExpand(organization?.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md  text-start no-underline hover:bg-gray-100 hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image fill  src={organization.imageUrl} alt="org-image" className="rounded-sm"/>
          </div>
          {organization?.name}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1">
         {
             routes.map((route)=>(
                <Button
                key={route.href}
                 variant={"ghost"}
                 size={"sm"}
                 onClick={()=>{router.push(route.href)}}
                 className={cn("w-full font-normal justify-start pl-10 mb-1",
                    pathName===route.href && "bg-sky-500/10 text-sky-700"
                 )}
                >
                    {route.icon}
                    {route.label}
                </Button>
             ))
         }
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton=function NavSkelton() {
  return (
    <>
      <div className="flex items-center gap-x-2">
         <div className="w-10 h-10">
            <Skeleton className="w-full h-full"/>
         </div>
         <Skeleton className="w-full h-10"/>
      </div>
    </>
  )
}