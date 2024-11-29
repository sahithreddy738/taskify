"use client";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import ListItem from "./list-item";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { cardListOrder } from "@/actions/card-list-order";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function redorder<T>(lists: T[], startIndex: number, endIndex: number) {
  const result = Array.from(lists);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (message) => {
      toast.error(message);
    },
  });
  const { execute: executeCardListOrder } = useAction(cardListOrder, {
    onSuccess: () => {
      toast.success("Cards reordered");
    },
    onError: (message) => {
      toast.error(message);
    },
  });
  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (type === "list") {
      const redorderedData = redorder(
        orderedData,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index }));
      setOrderedData(redorderedData);
      executeUpdateListOrder({ lists: redorderedData, boardId });
    }
    if (type === "card") {
      const newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destinationList) return;
      if (!sourceList.cards) sourceList.cards = [];
      if (!destinationList.cards) destinationList.cards = [];
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = redorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, index) => (card.order = index));
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        executeCardListOrder({
          cards: reorderedCards,
          listId: sourceList.id,
          boardId,
        });
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;
        destinationList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, index) => (card.order = index));
        destinationList.cards.forEach((card, index) => (card.order = index));
        setOrderedData(newOrderedData);
        executeCardListOrder({
          cards: destinationList.cards,
          boardId,
          listId: destinationList.id,
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provider) => (
          <ol
            {...provider.droppableProps}
            ref={provider.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem data={list} index={index} key={list.id}></ListItem>
            ))}
            {provider.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
