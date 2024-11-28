import ActivityItem from "@/components/modals/cardmodel/activity-item";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ActivityList = async () => {
  const { orgId } = await auth();
  if (!orgId) {
    redirect("/select-org");
  }
  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
  });

  return (
    <ol className="mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      <div className="flex flex-col gap-4">
        {auditLogs.map((log) => (
          <>
            <ActivityItem key={log.id} item={log} />
          </>
        ))}
      </div>
    </ol>
  );
};

ActivityList.skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
      <Skeleton className="w-[60%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};

export default ActivityList;
