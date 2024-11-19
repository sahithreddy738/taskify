"use server";

import {  CreateSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteBoard} from "./schema";
import { redirect } from "next/navigation";



export const handler = async (data:InputType):Promise<ReturnType> => {
    const {orgId,userId}=await auth();
    if (!userId || !orgId) {
        return {
          error: "Unauthorized",
        };
      }
    const {id}=data;
    let board;

    try{
      
        board=await db.board.delete({
            where:{
                id,
                orgId
            }
        });
    }catch(error) {
        return {
            error: "Failed to Delete",
          };
    }

    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);
}

export const deleteBoard=CreateSafeAction(DeleteBoard,handler);