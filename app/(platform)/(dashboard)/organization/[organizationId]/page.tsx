import { Separator } from "@/components/ui/separator";
import Info from "../_components/Info";
import BoardList from "../_components/board-list";
import { Suspense } from "react";

const OrganizationIdPage = async () => {
  return (
    <div className="w-full mb-20 flex flex-col">
       <Info/>
       <Separator className="my-4"/>
       <div className="px-2 md:px-4">
         <Suspense fallback={<BoardList.Skelton/>}>
             <BoardList/>
         </Suspense>
       </div>
    </div>
  )
};

export default OrganizationIdPage;
