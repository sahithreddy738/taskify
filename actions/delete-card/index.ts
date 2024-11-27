"use server";

import { CreateSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteCard } from "./schema";
import { redirect } from "next/navigation";

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
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to Delete",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {data:card}
};

export const deleteCard = CreateSafeAction(DeleteCard, handler);
