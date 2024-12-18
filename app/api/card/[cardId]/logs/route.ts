import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ cardId: string }> }
  ) {
    try {
      const { orgId, userId } = await auth();
      if (!userId || !orgId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
     const auditLogs=await db.auditLog.findMany({
        where:{
            orgId,
            entityId:(await params).cardId,
            entityType:ENTITY_TYPE.CARD,
        },
        orderBy:{
            createdAt:"desc"
        },
        take:3
     })
     return NextResponse.json(auditLogs);
    } catch{
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  