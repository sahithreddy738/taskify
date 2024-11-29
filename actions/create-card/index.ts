"use server";

import { CreateSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, listId, boardId } = data;
  let card;

  try {
    const listDetails = await db.list.findUnique({
      where: {
        id: listId,
        boardId,
        board: { orgId },
      },
    });
    if (!listDetails)
      return {
        error: "List Not Found",
      };
    const cardItem = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        order: "desc",
      },
    });
    const newOrder = cardItem?.order ? cardItem.order + 1 : 1;
    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });
    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to Create",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = CreateSafeAction(CreateCard, handler);
