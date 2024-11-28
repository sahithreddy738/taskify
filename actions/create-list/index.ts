"use server";

import { CreateSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";



export const handler = async (data:InputType):Promise<ReturnType> => {
    const {orgId,userId}=await auth();
    if (!userId || !orgId) {
        return {
          error: "Unauthorized",
        };
      }
    const {title,boardId}=data;
    let list;
    
    try{
        const boardDetails=await db.board.findUnique({
            where:{
                id:boardId,
                orgId
            }
        });
        if(!boardDetails) return {
            error:"Board Not Found"
        };
        const listItem=await db.list.findFirst({
            where:{
                boardId
            },
            orderBy:{
                order:"desc"
            }
        })
        const newOrder=(listItem?.order)? listItem.order+1:1;
        list=await db.list.create({
            data:{
                title,
                boardId,
                order:newOrder
            }
        });
        await createAuditLog({
            entityId: list.id,
            entityTitle: list.title,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE,
          });
    }catch(error) {
        return {
            error: "Failed to Create",
          };
    }

    revalidatePath(`/board/${boardId}`);
    return {data:list}
}

export const createList=CreateSafeAction(CreateList,handler);