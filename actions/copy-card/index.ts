"use server";

import { CreateSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CopyCard } from "./schema";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;
  let card;

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: { board: { orgId } },
      },
    });
    const cardItem = await db.card.findFirst({
      where: {
        listId: cardToCopy?.listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const newOrder = cardItem?.order ? cardItem.order + 1 : 1;
    card = await db.card.create({
      data: {
        title: `${cardToCopy?.title} - copy`,
        order: newOrder,
        description: "",
        listId: cardToCopy?.listId as string,
      },
    });
  } catch (error) {
    return {
      error: "Failed to Delete",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = CreateSafeAction(CopyCard, handler);
