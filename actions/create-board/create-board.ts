"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler=async (data:InputType):Promise<ReturnType> => {
    const {userId}=await auth();
    if(!userId) {
        return {
            error:"Unauthorized"
        }
    }
    const {title}=data;
     let board;
     try {
        board=await db.board.create({
            data:{
              title
            }
        })
     } catch (error) {
        return {
            error:"Failed to create"
        }
     }
 
    revalidatePath(`/board/${board.id}`);
    return {data:board}
}

export const createBoard=CreateSafeAction(CreateBoard,handler);