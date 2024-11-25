"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}

const CardItem = ({ data, index }: CardItemProps) => {
  return (
<Draggable index={index} draggableId={data.id}>
  {
    (provider)=>(
      <div ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps} role="button" className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
      {data.title}
    </div>
    )
  }
</Draggable>
  );
};

export default CardItem;
 