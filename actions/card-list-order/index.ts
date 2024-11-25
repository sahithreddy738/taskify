"use server";

import { CreateSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CardListOrder } from "./schema";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { cards, boardId } = data;
  let reorderedCards;

  try {
    const transaction = cards.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list:{
            board:{
                orgId
            }
          }
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );
    reorderedCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to update",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: reorderedCards };
};

export const cardListOrder = CreateSafeAction(CardListOrder, handler);
