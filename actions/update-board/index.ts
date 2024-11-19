"use server";

import { ActionState, CreateSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateBoard } from "./schema";



export const handler = async (data:InputType):Promise<ReturnType> => {
    const {orgId,userId}=await auth();
    if (!userId || !orgId) {
        return {
          error: "Unauthorized",
        };
      }
    const {title,id}=data;
    let board;

    try{
      
        board=await db.board.update({
            where:{
                id,
                orgId
            },
            data:{
                title
            }
        });
    }catch(error) {
        return {
            error: "Failed to update",
          };
    }

    revalidatePath(`/board/${id}`);
    return {data:board}
}

export const updateBoard=CreateSafeAction(UpdateBoard,handler);