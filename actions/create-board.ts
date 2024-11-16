"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const create=async (formData:FormData) => {
   await db.board.create({
    data:{
        title:formData.get("title") as string
    }
   })
   revalidatePath("/organization/org_2ojrJCytmWkKyFRN7ARXkFfWYZm")
}