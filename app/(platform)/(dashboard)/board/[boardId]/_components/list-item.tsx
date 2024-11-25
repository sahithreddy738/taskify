"use client";

import { ListWithCards } from "@/types";
import ListHeader from "./list-header";
import { ElementRef, useRef, useState } from "react";
import CardForm from "./card-form";
import { cn } from "@/lib/utils";
import CardItem from "./card-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

const ListItem = ({ data, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textRef=useRef<ElementRef<"textarea">>(null);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(()=>{
      textRef.current?.focus();
    })
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  return (
<Draggable draggableId={data.id} index={index}>
    {
      (provider) =>(
        <li {...provider.draggableProps} ref={provider.innerRef}  className="shrink-0 h-full w-[272px] select-none">
        <div {...provider.dragHandleProps} className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
          <ListHeader   data={data} onAddCard={enableEditing} />
         <Droppable droppableId={data.id} type="card">
             {(provider)=>(
                 <ol {...provider.droppableProps} ref={provider.innerRef} className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                  data.cards.length>0?"mt-2":"mt-0"
                )}>
                   {
                     data.cards.map((card,index)=>(
                      <CardItem key={card.id} data={card} index={index}/>
                     ))
                   }
                   {provider.placeholder}
                </ol>
             )}
         </Droppable>
          <CardForm
          ref={textRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          listId={data.id}
        />
        </div>
      </li>
      )}
    
</Draggable>
  );
};

export default ListItem;
