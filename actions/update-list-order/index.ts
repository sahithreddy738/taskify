"use server";

import { CreateSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateListOrder } from "./schema";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { lists,boardId } = data;
  let reorderedLists;

  try {
   const transaction= lists.map((list)=>
       db.list.update({
        where:{
            id:list.id,
            boardId,
            board:{
                orgId
            }
        },
        data:{
            order:list.order
        }
      }) 
    )
   reorderedLists=await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to update",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {data:reorderedLists}
};

export const updateListOrder = CreateSafeAction(UpdateListOrder, handler);
