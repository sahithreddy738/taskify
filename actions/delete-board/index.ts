"use server";

import { CreateSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decrementAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id } = data;
  let board;
  const isPro=await checkSubscription();
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

  if(!isPro) {
    await decrementAvailableCount();
  }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to Delete",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = CreateSafeAction(DeleteBoard, handler);
